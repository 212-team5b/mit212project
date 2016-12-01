#!/usr/bin/python

# Task 1 Navigation node:
import rospy
import tf
import numpy as np
import threading
import serial
import pdb
import traceback
import sys
import tf.transformations as tfm
from rrt import *

from me212base.msg import WheelVelCmd
from apriltags.msg import AprilTagDetections
from geometry_msgs.msg import Pose

import std_msgs.msg
import helper
import time


global obstacle_list


def distance(point1,point2):
    return ((point1[0]-point2[0])**2 + (point1[1]-point2[1])**2)**0.5

def Goal_test(robot_pose2d,tag_pose2d):
    if distance(robot_pose2d,tag_pose2d) < .5:
        return True
    else: return False
    


def generateWheelVel(robot_pose3d,target_pose):
    v = 0.005 #const
    r = 0.01 #radius of wheel
    
    delta_x = target_pose[0]-robot_pose3d[0]
    delta_y = target_pose[1]-robot_pose3d[1]
    desired_theta = np.arctan2(delta_y,delta_x)
    theta_diff = helper.diffrad(robot_pose3d[2],desired_theta)
    
    if abs(theta_diff) < 0.3:
        return (v/(2*r), v/(2*r))
        
    elif (np.sign(theta_diff) == 1):
        return (v/(4*r), -v/(4*r))
        
    else:
        return (-v/(4*r), v/(4*r))


class ApriltagNavigator():
    def __init__(self, constant_vel = False):
        self.listener = tf.TransformListener()
        self.br = tf.TransformBroadcaster()
        self.apriltag_sub = rospy.Subscriber("/apriltags/detections", AprilTagDetections, self.apriltag_callback, queue_size = 1)
        self.obstacle_sub = rospy.Subscriber("/obstacle_coordinates", std_msgs.msg.String, self.obstacle_callback, queue_size = 1)
        self.odometry_sub = rospy.Subscriber("/odometry", Pose, self.odometry_callback, queue_size=1)
        self.velcmd_pub = rospy.Publisher("/cmdvel", WheelVelCmd, queue_size = 1)
        self.pose = [0,0,0]
        # calculate transforms to each obstacle (obstacles in world frame)
        # keep only unique transformed obstacles (with a measure of average) 
        
        if constant_vel:
            self.thread = threading.Thread(target = self.constant_vel_loop)
        else:
            self.thread = threading.Thread(target = self.navi_loop)

        self.thread.start()

        rospy.sleep(1)

    def apriltag_callback(self, data):
        # use apriltag pose detection to find where is the robot
        ##
        for detection in data.detections:
            if detection.id in range(11):
                pose_tag_base = helper.poseTransform(helper.pose2list(detection.pose),  homeFrame = '/camera', targetFrame = '/robot_base', listener = self.listener)
                pose_base_map = helper.poseTransform(helper.invPoseList(pose_tag_base), homeFrame = '/apriltag'+str(detection.id), targetFrame = '/map', listener = self.listener)
                helper.pubFrame(self.br, pose = pose_base_map, frame_id = '/robot_base', parent_frame_id = '/map', npub = 1)
    
    def obstacle_callback(self, data):
        po1 = [(.08,1.47,.12),(.23,1.47,.12),(.381,1.47,.12)]
        po2 = [(.74,1.21,.12),(.9,1.21,.12),(1.05,1.21,.12)]
        
        obstacle = eval(data.data)
        obstacle = np.average(obstacle,axis=0) + [0,0,0,1]
        
        obstacle_to_map = helper.poseTransform(helper.pose2list(obstacle),  homeFrame = '/camera', targetFrame = '/map', listener = self.listener)
        
        
        if distance(obstacle_to_map,po1[0]) < 0.1 or distance(obstacle_to_map,po1[1]) <0.1 or distance(obstacle_to_map,po1[2])<0.1:
            obstacle_list.append(po1)
        elif distance(obstacle_to_map,po2[0])<0.1 or distance(obstacle_to_map,po2[1])<0.1 or distance(obstacle_to_map,po2[2])<0.1:
            obstacle_list.append(po2)
        
    def odometry_callback(self,data):
        self.pose = [data.position.x,data.position.y,data.position.z]
    
    def onshutdown(self):
        wv = WheelVelCmd()
        wv.desiredWV_L, wv.desiredWV_R = 0,0
        self.velcmd_pub.publish(wv)
        
    def constant_vel_loop(self):
        while not rospy.is_shutdown() :
            wv = WheelVelCmd()
            self.velcmd_pub.publish(wv)
            rospy.sleep(0.01)

    def navi_loop(self):
        # This list will have the specific waypoints we want to track, so
        # all 10 tags dont need to be on this list.
        #tag_locations2d = [[.035,0.86],[0.035,1.78],[0.2,1.94],[0.41,2.19],[1.29,2.40],[2.44,2.40],[3.6225, 1.795],[3.6225,0.855],[3.04,0.46],[1.83,0.46],[1.60,0.26]]
        targets = [[.07,0.86],[1.29,2.40], [0.41,2.19],[2.44,2.40],[1.83,0.46],[2.44,2.40],[3.04,0.46],[2.44,2.40]] # 0 4 3 5 9 5 8 5 
        fixedObstacles = [(1.07,.508,.12),(.8128,.7112,.12)] # define fixed obstacles defines (x,y,radius) (radius is .12 meters for small boxes)
        obstacle_list = [fixedObstacles[0],fixedObstacles[1]]#[],[]] # First two obstacles 
        
        filter_pos = []
        
        
        wv = WheelVelCmd()

        arrived = False
        arrived_position = False
        is_plan = False
        robot_pose3d = [0.635,0.22]
        
        print "Zeroing Velocities"
        wv.desiredWV_R = 0 # Zero Velocities 
        wv.desiredWV_L = 0
        self.velcmd_pub.publish(wv)
        rospy.sleep(5)

        while not rospy.is_shutdown() :

            # 1. get robot pose
 #           print "Current Pose", robot_pose3d
            if robot_pose3d != None:
                robot_prev = robot_pose3d
                
            robot_pose3d = helper.lookupTransformList('/map', '/robot_base', self.listener)
            if robot_pose3d == None:
                robot_pose3d = robot_prev
            print "Target: ", targets[0]

            #if robot_pose3d is None: #rotate in place maybe??
            #    print 'Tag not in view, Searching'
            #    wv.desiredWV_R = 0.1  # rotate until you see a tag
            #    wv.desiredWV_L = -0.1
            #    self.velcmd_pub.publish(wv)
            #    continue

            robot_position2d = robot_pose3d[0:2]
            target_position2d = targets[0]

            robot_yaw = tfm.euler_from_quaternion(robot_pose3d[3:7]) [2]
            
            robot_pose2d = robot_position2d + [robot_yaw]
            
            
            filter_pos.append(robot_pose2d)
            
            #print "Odometry Pose: ", self.pose
            
            if len(filter_pos)>100:
                del filter_pos[0]
                
            robot_pose2d = np.average(filter_pos,axis=0)
            #print "April Tag Pose: ", robot_pose2d
            #robot_pose2d = np.average([robot_pose2d,self.pose],axis=0,weights=[0.3,0.7])
            print "Filtered 2D Pose: ", robot_pose2d

            # Call proper function to get obstacles (if there are any) and pose
            #  - will use kinect to check if obstacle (through distance sensor or rgb corner filter) and generate pose
            # obstacleList = checkObstacles()
            # 2. navigation policy



            # 2.4 Goal test, that is tag-dependent
            #       - if satisfied, knock off tag from list 
            #  	        - use inverse kinematics formulas, and velocity and curvature formula on splines
        
 
            if Goal_test(robot_pose2d, targets[0]):
                print "Reached Target"
                is_plan = False
                del targets[0]

			# 2.1 if not a plan: generate rrt plan
		    #		- path towards the current apriltag
		    # 		- need spline returned, not just waypoints
           


            xdis = robot_position2d[0]-target_position2d[0]
            randArea = [(robot_position2d[0]-2*xdis), (robot_position2d[0]+2*xdis)]
            
            if not is_plan or (len(obstacle_list) > 2):
                import matplotlib.pyplot as plt
                is_plan = True
                #print "Robot Position: ", robot_position2d
                #print "Target Position: ", target_position2d
                #print "Obstacle List: ", obstacleList
                #print "Random Area: ", randArea
                
                while(1):
                    try:
                        path = path_create(robot_position2d, target_position2d, obstacle_list, randArea)
                    except SystemError:
                        print "SystemError"
                    else:
                        break
 #               print "Path Planned"
                out = path[1]
                smoothedPath = path[2]
                curvature = path[0]
                #plt.plot(out[0], out[1],'-y')
                #plt.plot([x for (x,y) in smoothedPath], [y for (x,y) in smoothedPath],'-b')
                #plt.grid(True)
                #plt.pause(0.01)  # Need for Mac
                #plt.show()
                start = time.time()
                
#            print "En Route"
            #end = time.time()
            #delta_t = end - start
            #delta_v = path[2]
            
            ##print "delta_t: ", delta_t
            ##print "delta_v: ", delta_v

            #length_dv = distance(delta_v[1], delta_v[0])
            #delta_l = length_dv
            
            ##print "delta_l: ", delta_l
            
            #print "Distance Traveled: ", v*delta_t
            #print "Unit Length: ", delta_l
            #index = np.floor((v*delta_t)/delta_l)
            #print "Current Index: ", (v*delta_t)/delta_l
            #k = curvature[index]
            
            ##if k == None: 
            ##    wv.desiredWV_L = 0
            ##    wv.desiredWV_R = 0
            ##    self.velcmd_pub.publish(wv)
                
            ##else:
            #wv.desiredWV_L =(v/r)*(1-(k/b))/10 # just devided by a arbitrary constant (clipping to .75 gave to many extremes)
            #wv.desiredWV_R = (v/r)*(1+(k/b))/10           
            ##wv.desiredWV_L = max(-0.75,min(0.75,(v/r)*(1-(k/b))))
            ##wv.desiredWV_R = max(-0.75,min(0.75,(v/r)*(1+(k/b))))
            
            if distance(robot_pose2d,smoothedPath[0]) < 0.05:
                del smoothedPath[0]
                
            l, r = generateWheelVel(robot_pose2d,smoothedPath[0])
            
            
            print "Next Point: ", smoothedPath[0]
            wv.desiredWV_L, wv.desiredWV_R = l,r
            
            print "Left: ", wv.desiredWV_L, "Right: ", wv.desiredWV_R

            self.velcmd_pub.publish(wv)


            #print "Obstacles: ", obstacle_list
            rospy.sleep(0.03)

        
def main():

    rospy.init_node('me212_robot', anonymous=True)
    print "Start Navigation"
    april_navi = ApriltagNavigator()
    print "End Navigation"
    rospy.spin()
    rospy.on_shutdown(april_navi.onshutdown)

if __name__=='__main__':
    main()
