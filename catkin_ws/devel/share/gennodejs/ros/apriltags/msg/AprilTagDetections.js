// Auto-generated. Do not edit!

// (in-package apriltags.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let AprilTagDetection = require('./AprilTagDetection.js');
let std_msgs = _finder('std_msgs');

//-----------------------------------------------------------

class AprilTagDetections {
  constructor() {
    this.header = new std_msgs.msg.Header();
    this.detections = [];
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type AprilTagDetections
    // Serialize message field [header]
    bufferInfo = std_msgs.msg.Header.serialize(obj.header, bufferInfo);
    // Serialize the length for message field [detections]
    bufferInfo = _serializer.uint32(obj.detections.length, bufferInfo);
    // Serialize message field [detections]
    obj.detections.forEach((val) => {
      bufferInfo = AprilTagDetection.serialize(val, bufferInfo);
    });
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type AprilTagDetections
    let tmp;
    let len;
    let data = new AprilTagDetections();
    // Deserialize message field [header]
    tmp = std_msgs.msg.Header.deserialize(buffer);
    data.header = tmp.data;
    buffer = tmp.buffer;
    // Deserialize array length for message field [detections]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [detections]
    data.detections = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = AprilTagDetection.deserialize(buffer);
      data.detections[i] = tmp.data;
      buffer = tmp.buffer;
    }
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'apriltags/AprilTagDetections';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '7f7dd9e733b444cdc111ec1690c66971';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # List of all AprilTag detections from a single camera frame.
    Header header
    AprilTagDetection[] detections
    
    ================================================================================
    MSG: std_msgs/Header
    # Standard metadata for higher-level stamped data types.
    # This is generally used to communicate timestamped data 
    # in a particular coordinate frame.
    # 
    # sequence ID: consecutively increasing ID 
    uint32 seq
    #Two-integer timestamp that is expressed as:
    # * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')
    # * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')
    # time-handling sugar is provided by the client library
    time stamp
    #Frame this data is associated with
    # 0: no frame
    # 1: global frame
    string frame_id
    
    ================================================================================
    MSG: apriltags/AprilTagDetection
    # Message storing raw 2D and 3D information about a single AprilTag detection.
    Header header
    uint32 id  # id of AprilTag (not necessarily unique)
    geometry_msgs/Point32[4] corners2d  # AprilTag corners in image
    float32 tag_size  # tag size in m
    geometry_msgs/Pose pose  # pose of the marker in the camera frame
    
    ================================================================================
    MSG: geometry_msgs/Point32
    # This contains the position of a point in free space(with 32 bits of precision).
    # It is recommeded to use Point wherever possible instead of Point32.  
    # 
    # This recommendation is to promote interoperability.  
    #
    # This message is designed to take up less space when sending
    # lots of points at once, as in the case of a PointCloud.  
    
    float32 x
    float32 y
    float32 z
    ================================================================================
    MSG: geometry_msgs/Pose
    # A representation of pose in free space, composed of position and orientation. 
    Point position
    Quaternion orientation
    
    ================================================================================
    MSG: geometry_msgs/Point
    # This contains the position of a point in free space
    float64 x
    float64 y
    float64 z
    
    ================================================================================
    MSG: geometry_msgs/Quaternion
    # This represents an orientation in free space in quaternion form.
    
    float64 x
    float64 y
    float64 z
    float64 w
    
    `;
  }

};

module.exports = AprilTagDetections;
