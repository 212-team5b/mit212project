import roslib; roslib.load_manifest("interactive_markers")
import rospy
import tf
from visualization_msgs.msg import *
from geometry_msgs.msg import *
from tf.broadcaster import TransformBroadcaster
import math
from interactive_markers.interactive_marker_server import *
from std_msgs.msg import ColorRGBA

from geometry_msgs.msg import Pose
def poselist2pose(poselist):
    pose = Pose()
    pose.position.x = poselist[0]
    pose.position.y = poselist[1]
    pose.position.z = poselist[2]
    pose.orientation.x = poselist[3]
    pose.orientation.y = poselist[4]
    pose.orientation.z = poselist[5]
    pose.orientation.w = poselist[6]
    return pose

def createMeshMarker(resource, offset=(0,0,0), rgba=(1,0,0,1), orientation=(0,0,0,1), scale=1, scales=(1,1,1), frame_id="/map"):
    marker = Marker()
    marker.mesh_resource = resource;
    marker.header.frame_id = frame_id
    marker.type = marker.MESH_RESOURCE
    marker.scale.x = scale*scales[0]
    marker.scale.y = scale*scales[1]
    marker.scale.z = scale*scales[2]
    marker.color.a = rgba[3]
    marker.color.r = rgba[0]
    marker.color.g = rgba[1]
    marker.color.b = rgba[2]
    marker.pose.orientation.x = orientation[0]
    marker.pose.orientation.y = orientation[1]
    marker.pose.orientation.z = orientation[2]
    marker.pose.orientation.w = orientation[3]
    marker.pose.position.x = offset[0]
    marker.pose.position.y = offset[1]
    marker.pose.position.z = offset[2]
    
    obj_control = InteractiveMarkerControl()
    obj_control.always_visible = True
    obj_control.markers.append( marker )
        
    return obj_control
    
def createCubeMarker(offset=(0,0,0), marker_id = 0, rgba=(1,0,0,1), orientation=(0,0,0,1), scale=(0.1,0.1,0.1), frame_id="/map"):
    marker = Marker()
    marker.header.frame_id = frame_id
    marker.type = marker.CUBE
    marker.id = marker_id
    marker.scale.x = scale[0]
    marker.scale.y = scale[1]
    marker.scale.z = scale[2]
    marker.color.a = rgba[3]
    marker.color.r = rgba[0]
    marker.color.g = rgba[1]
    marker.color.b = rgba[2]
    marker.pose.orientation.x = orientation[0]
    marker.pose.orientation.y = orientation[1]
    marker.pose.orientation.z = orientation[2]
    marker.pose.orientation.w = orientation[3]
    marker.pose.position.x = offset[0]
    marker.pose.position.y = offset[1]
    marker.pose.position.z = offset[2]
    
    obj_control = InteractiveMarkerControl()
    obj_control.always_visible = True
    obj_control.markers.append( marker )
        
    return obj_control



def createSphereMarker(marker_id, namespace, rgba = None, pose=[0,0,0,0,0,0,1], frame_id = '/map'):
    marker = Marker()
    marker.header.frame_id = frame_id
    marker.type = marker.SPHERE
    marker.scale.x = 0.01
    marker.scale.y = 0.01
    marker.scale.z = 0.01
    marker.id = marker_id
    marker.ns = namespace
    
    if rgba is not None:
        marker.color.r, marker.color.g, marker.color.b, marker.color.a = tuple(rgba)
        
    marker.pose = poselist2pose(pose)
    
        
    return marker

def createPointMarker(points, marker_id, namespace, rgba = None, pose=[0,0,0,0,0,0,1], frame_id = '/map'):
    marker = Marker()
    marker.header.frame_id = frame_id
    marker.type = marker.POINTS
    marker.scale.x = 0.003
    marker.scale.y = 0.003
    marker.scale.z = 0.003
    marker.id = marker_id
    marker.ns = namespace
    
    n = len(points)
    
    if rgba is not None:
        marker.color.r, marker.color.g, marker.color.b, marker.color.a = tuple(rgba)
        
    for i in xrange(0,n):
        p = Point()
        p.x = points[i][0]
        p.y = points[i][1]
        p.z = points[i][2]
        marker.points.append(p)
        
    if rgba is None:
        for i in xrange(0,n):
            p = ColorRGBA()
            p.r = points[i][3]/255.0
            p.g = points[i][4]/255.0
            p.b = points[i][5]/255.0
            p.a = 1
            marker.colors.append(p)
        
    marker.pose = poselist2pose(pose)
    
        
    return marker
    

def createLineStripMarker(points, marker_id, rgba = None, pose=[0,0,0,0,0,0,1], frame_id = '/map'):
    marker = Marker()
    marker.header.frame_id = frame_id
    marker.type = marker.LINE_STRIP
    marker.scale.x = 0.003
    marker.id = marker_id
    
    n = len(points)
    
    if rgba is not None:
        marker.color.r, marker.color.g, marker.color.b, marker.color.a = tuple(rgba)
        
    for i in xrange(0,n):
        p = Point(*points[i])
        marker.points.append(p)
        
    marker.pose = poselist2pose(pose)
    
        
    return marker

from visualization_msgs.msg import Marker
from visualization_msgs.msg import InteractiveMarker
from visualization_msgs.msg import InteractiveMarkerControl


def createInteractiveMarker(name, x=0, y=0, z=0, ox=0, oy=0, oz=0, ow=1, frame_id = "/map"):
    int_marker = InteractiveMarker()
    int_marker.header.frame_id = frame_id
    int_marker.name = name
    int_marker.scale = 0.3
    int_marker.description = name
    int_marker.pose.position.x = x
    int_marker.pose.position.y = y
    int_marker.pose.position.z = z
    int_marker.pose.orientation.x = ox
    int_marker.pose.orientation.y = oy
    int_marker.pose.orientation.z = oz
    int_marker.pose.orientation.w = ow
    
    
    return int_marker

def createMoveControlsXZ():
    ## move control x
    controls = []
    control = InteractiveMarkerControl(name= "move_x", orientation=Quaternion(1,0,0,1), interaction_mode=InteractiveMarkerControl.MOVE_AXIS)
    controls.append(control)
    
    ## move control z
    control = InteractiveMarkerControl(name="move_z", orientation=Quaternion(0,1,0,1), interaction_mode=InteractiveMarkerControl.MOVE_AXIS)
    controls.append(control)
    return controls
    
def createMoveControls(fixed=False):
    controls = []
    ## rotate control x
    control = InteractiveMarkerControl()
    control.orientation.w = 1
    control.orientation.x = 1
    control.orientation.y = 0
    control.orientation.z = 0
    control.name = "rotate_x"
    control.interaction_mode = InteractiveMarkerControl.ROTATE_AXIS
    if fixed:
        control.orientation_mode = InteractiveMarkerControl.FIXED
    controls.append(control)

    ## rotate control y
    control = InteractiveMarkerControl()
    control.orientation.w = 1
    control.orientation.x = 0
    control.orientation.y = 1
    control.orientation.z = 0
    control.name = "rotate_y"
    control.interaction_mode = InteractiveMarkerControl.ROTATE_AXIS
    if fixed:
        control.orientation_mode = InteractiveMarkerControl.FIXED
    controls.append(control)
    
    ## rotate control z
    control = InteractiveMarkerControl()
    control.orientation.w = 1
    control.orientation.x = 0
    control.orientation.y = 0
    control.orientation.z = 1
    control.name = "rotate_z"
    control.interaction_mode = InteractiveMarkerControl.ROTATE_AXIS
    if fixed:
        control.orientation_mode = InteractiveMarkerControl.FIXED
    controls.append(control)
    
    ## move control x
    control = InteractiveMarkerControl()
    control.orientation.w = 1
    control.orientation.x = 1
    control.orientation.y = 0
    control.orientation.z = 0
    control.name = "move_x"
    control.interaction_mode = InteractiveMarkerControl.MOVE_AXIS
    if fixed:
        control.orientation_mode = InteractiveMarkerControl.FIXED
    controls.append(control)
    
    ## move control y
    control = InteractiveMarkerControl()
    control.orientation.w = 1
    control.orientation.x = 0
    control.orientation.y = 1
    control.orientation.z = 0
    control.name = "move_y"
    control.interaction_mode = InteractiveMarkerControl.MOVE_AXIS
    if fixed:
        control.orientation_mode = InteractiveMarkerControl.FIXED
    controls.append(control)
    
    ## move control z
    control = InteractiveMarkerControl()
    control.orientation.w = 1
    control.orientation.x = 0
    control.orientation.y = 0
    control.orientation.z = 1
    control.name = "move_z"
    control.interaction_mode = InteractiveMarkerControl.MOVE_AXIS
    if fixed:
        control.orientation_mode = InteractiveMarkerControl.FIXED
    controls.append(control)
    return controls

def vizCubeMarker(size, marker_id=0, frame_id='/map', rgba=(1,0,0,1)):
    # size is in meter
    vis_pub = rospy.Publisher('visualization_marker', Marker, queue_size=10)
    rospy.sleep(0.1)
    
    marker = Marker()
    marker.id = marker_id
    marker.header.frame_id = frame_id
    marker.type = marker.CUBE
    marker.scale.x = size[0]
    marker.scale.y = size[1]
    marker.scale.z = size[2]
    marker.color.a = rgba[3]
    marker.color.r = rgba[0]
    marker.color.g = rgba[1]
    marker.color.b = rgba[2]
    
    vis_pub.publish(marker)
    

def load_pcd(filename):
    points = []
    colors = []
    try:
        with open(filename) as f:
            i = 0
            for line in f:
                if i<10: 
                    # skip headers
                    pass
                else:
                    a = line.split()  # a is a list of strings
                    x = float(a[0])
                    y = float(a[1])
                    z = float(a[2])
                    r = float(a[3])/255
                    g = float(a[4])/255
                    b = float(a[5])/255
                    points.append([x,y,z])
                    colors.append([r,g,b])
                i += 1
    except IOError:
        print("Cannot open file "+filename)
        sys.exit(1)
    return (points, colors)
