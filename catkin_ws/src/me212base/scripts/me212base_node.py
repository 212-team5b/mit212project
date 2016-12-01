#!/usr/bin/python

# 2.12 Lab 2 me212bot: ROS driver running on the pc side to read and send messages to Arduino
# Peter Yu Sept 2016

import rospy
import tf
import numpy as np
import threading
import serial
import pdb
import traceback
import sys

from visualization_msgs.msg import Marker
from me212base.msg import WheelVelCmd
from geometry_msgs.msg import Point, Pose, Twist, Quaternion
import std_msgs.msg

port = '/dev/ttyACM0'


odm_pub = rospy.Publisher('odometry', Pose, queue_size=1) 


class Arduino():
    def __init__(self, port = '/dev/ttyACM0'):
        self.comm = serial.Serial(port, 115200, timeout = 5)
        self.sendbuff = []
        self.readbuff = ''
        
        self.thread = threading.Thread(target = self.loop)
        self.thread.start()
        
        self.prevtime = rospy.Time.now()
        
        self.velcmd_sub = rospy.Subscriber("cmdvel", WheelVelCmd, self.cmdvel)
        #self.hand_state_sub = rospyl.Subscriber("hand_state", std_msgs.msg., self.hand_state)

    def cmdvel(self, msg):  
        self.comm.write("%f,%f\n" % (msg.desiredWV_R, msg.desiredWV_L))
    
    #def hand_state(self,msg):
        
    # loop() is for reading odometry from Arduino and publish to rostopic.
    def loop(self):
        while not rospy.is_shutdown():
            # 1. get a line of string that represent current odometry from serial
            serialData = self.comm.readline()
            
            # 2. parse the string e.g. "0.1,0.2,0.1" to doubles
            splitData = serialData.split(',');
            
            try:
                x     = float(splitData[0]);
                y     = float(splitData[1]);
                theta = float(splitData[2]);
                hz    = 1.0 / (rospy.Time.now().to_sec() - self.prevtime.to_sec())
                
                print 'x=', x, ' y=', y, ' theta =', theta, ' hz =', hz; 
                    
                self.prevtime = rospy.Time.now()
                
                
                # publish odometry as Pose msg
                odom = Pose()
                odom.position.x = x + 0.635
                odom.position.y = y + 0.22
                odom.position.z = theta
                #qtuple = tf.quaternion_from_euler(0, 0, theta)
                #odom.orientation = Quaternion(qtuple[0], qtuple[1], qtuple[2], qtuple[3])
                odm_pub.publish(odom) 
                    
            except:
                # print out msg if there is an error parsing a serial msg
                print 'Cannot parse', splitData
                ex_type, ex, tb = sys.exc_info()
                traceback.print_tb(tb)

                
            

def main():
    rospy.init_node('me212base_node', anonymous=True)
    arduino = Arduino()
    rospy.spin()
    
if __name__=='__main__':
    main()
    
