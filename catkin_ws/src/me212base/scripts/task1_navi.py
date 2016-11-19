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
import helper
import time

def distance(point1,point2):
    return ((point1[0]-point2[0])**2 + (point1[1]-point2[1])**2)**0.5

def Goal_test(robot_pose2d,tag_pose2d):
    if abs(distance(robot_pose2d,tag_pose2d)) < 0.1:
        return True
    else: return False

class ApriltagNavigator():
    def __init__(self, constant_vel = False):
        self.listener = tf.TransformListener()
        self.br = tf.TransformBroadcaster()
        self.apriltag_sub = rospy.Subscriber("/apriltags/detections", AprilTagDetections, self.apriltag_callback, queue_size = 1)

        self.velcmd_pub = rospy.Publisher("/cmdvel", WheelVelCmd, queue_size = 1)   ##

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
            if detection.id == 0:
                pose_tag_base = helper.poseTransform(helper.pose2list(detection.pose),  homeFrame = '/camera', targetFrame = '/base_link', listener = self.listener)
                pose_base_map = helper.poseTransform(helper.invPoseList(pose_tag_base), homeFrame = '/apriltag', targetFrame = '/map', listener = self.listener)
                helper.pubFrame(self.br, pose = pose_base_map, frame_id = '/base_link', parent_frame_id = '/map', npub = 1)
                # our problem should be this line here
                # we are failing to get a pose and it is trying to publish a nontype

    def constant_vel_loop(self):
        while not rospy.is_shutdown() :
            wv = WheelVelCmd()
            self.velcmd_pub.publish(wv)
            rospy.sleep(0.01)


    def navi_loop(self):
        # This list will have the specific waypoints we want to track, so
        # all 10 tags dont need to be on this list.
        tag_locations2d = [[.035,0.86],[0.035,1.78],[0.2,1.94],[0.41,2.19],[1.29,2.40],[2.44,2.40],[3.6225, 1.795],[3.6225,0.855],[3.04,0.46],[1.83,0.46],[1.60,0.26]]

        # Default Tag Parameters
        # "tag0" args="0.035 0.86 0.545 1.57079633 0 1.57079633 map apriltag0 100" />
        # "tag1" args="0.035 1.78 0.54 1.57079633 0 1.57079633 map apriltag1 100" />
        # "tag2" args="0.2 1.94 0.55 0 0 1.57079633 map apriltag2 100" />
        # "tag3" args="0.41 2.19 0.55 1.57079633 0 1.57079633 map apriltag3 100" />
        # "tag4" args="1.29 2.40 0.54 0 0 1.57079633 map apriltag4 100" />
        # "tag5" args="2.44 2.40 0.55 0 0 1.57079633 map apriltag5 100" />
        # "tag6" args="3.6225 1.795 0.54 -1.57079633 0 1.57079633 map apriltag6 100" />
        # "tag7" args="3.6225 0.855 0.545 -1.57079633 0 1.57079633 map apriltag7 100" />
        # "tag8" args="3.04 0.46 0.55 3.1415926 0 1.57079633 map apriltag8 100" />
        # "tag9" args="1.83 0.46 0.55 3.1415926 0 1.57079633 map apriltag9 100" />
        # "tag10"args="1.60 0.26 0.55 -1.57079633 0 1.57079633 map apriltag10 100" />

        ##
        wv = WheelVelCmd()

        ##
        arrived = False
        arrived_position = False
        is_plan = False


        while not rospy.is_shutdown() :

            ##
            # 1. get robot pose
            robot_pose3d = helper.lookupTransformList('/map', '/base_link', self.listener)
            print "Got Pose: ", robot_pose3d

            if robot_pose3d is None: #rotate in place maybe??
                print '1. Tag not in view, Stop'
                wv.desiredWV_R = 1  # rotate until you see a tag
                wv.desiredWV_L = -1
                self.velcmd_pub.publish(wv)
                continue

            robot_position2d = robot_pose3d[0:2]
            target_position2d = tag_locations2d[0]

            robot_yaw = tfm.euler_from_quaternion(robot_pose3d[3:7]) [2]
            robot_pose2d = robot_position2d + [robot_yaw]

            print "2D Poses: ", robot_position2d

            # Call proper function to get obstacles (if there are any) and pose
            #  - will use kinect to check if obstacle (through distance sensor or rgb corner filter) and generate pose
            # obstacleList = checkObstacles()
            obstacleList = []
            # 2. navigation policy

			# 2.1 if not a plan: generate rrt plan
		    #		- path towards the current apriltag
		    # 		- need spline returned, not just waypoints
            v = 0.1   #const
            r = 0.035 #radius of wheel
            b = 0.23  #distance between wheels


            xdis = robot_position2d[0]-target_position2d[0]
            print "Got Distance: ", xdis

            randArea = [(robot_position2d[0]-1.5*xdis)/100, (robot_position2d[0]+1.5*xdis)/100]
            if not is_plan:
                is_plan = True
                start = time.time()
                path = path_create(robot_position2d, target_position2d, obstacleList, randArea)
                # Need to implement dynamic range for plotting
                # Need to implement handling for straight line case
                curvature = path[0]
            end = time.time()
            delta_t = end - start
            delta_v = path[2]

            print "Delta V", delta_v

            length_dv = distance(delta_v[1], delta_v[0])
            delta_l = delta_t * length_dv
            index = np.floor(v*delta_t/delta_l)

            k = curvature[index]

            wv.desiredWV_L = (v/r)*(1-(k/b))
            wv.desiredWV_R = (v/r)*(1+(k/b))

			# 2.3 grab pose from kalman node and compare with plan

			#robot_pose2d = kalman_filter()
			#if not pose_plan_compare():
			#	spline = None

            # 2.4 Goal test, that is tag-dependent
            #		- if satisfied, knock off tag from list
            #  	        - use inverse kinematics formulas, and velocity and curvature formula on splines

            if Goal_test(robot_pose2d, tag_locations2d[0]):
                is_plan = False
                del tag_locations2d[0]
                k = None

            self.velcmd_pub.publish(wv)

            rospy.sleep(0.01)

def main():
    rospy.init_node('me212_robot', anonymous=True)
    print "Start Navigation"
    april_navi = ApriltagNavigator()
    print "End Navigation"
    rospy.spin()

if __name__=='__main__':
    main()
