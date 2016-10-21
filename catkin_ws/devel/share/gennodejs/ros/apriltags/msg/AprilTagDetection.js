// Auto-generated. Do not edit!

// (in-package apriltags.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let std_msgs = _finder('std_msgs');
let geometry_msgs = _finder('geometry_msgs');

//-----------------------------------------------------------

class AprilTagDetection {
  constructor() {
    this.header = new std_msgs.msg.Header();
    this.id = 0;
    this.corners2d = new Array(4).fill(new geometry_msgs.msg.Point32());
    this.tag_size = 0.0;
    this.pose = new geometry_msgs.msg.Pose();
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type AprilTagDetection
    // Serialize message field [header]
    bufferInfo = std_msgs.msg.Header.serialize(obj.header, bufferInfo);
    // Serialize message field [id]
    bufferInfo = _serializer.uint32(obj.id, bufferInfo);
    // Serialize message field [corners2d]
    obj.corners2d.forEach((val) => {
      bufferInfo = geometry_msgs.msg.Point32.serialize(val, bufferInfo);
    });
    // Serialize message field [tag_size]
    bufferInfo = _serializer.float32(obj.tag_size, bufferInfo);
    // Serialize message field [pose]
    bufferInfo = geometry_msgs.msg.Pose.serialize(obj.pose, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type AprilTagDetection
    let tmp;
    let len;
    let data = new AprilTagDetection();
    // Deserialize message field [header]
    tmp = std_msgs.msg.Header.deserialize(buffer);
    data.header = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [id]
    tmp = _deserializer.uint32(buffer);
    data.id = tmp.data;
    buffer = tmp.buffer;
    len = 4;
    // Deserialize message field [corners2d]
    for (let i = 0; i < len; ++i) {
      tmp = geometry_msgs.msg.Point32.deserialize(buffer);
      data.corners2d[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize message field [tag_size]
    tmp = _deserializer.float32(buffer);
    data.tag_size = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [pose]
    tmp = geometry_msgs.msg.Pose.deserialize(buffer);
    data.pose = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'apriltags/AprilTagDetection';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'cbbc500741705b6142a546b4696bb7f5';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # Message storing raw 2D and 3D information about a single AprilTag detection.
    Header header
    uint32 id  # id of AprilTag (not necessarily unique)
    geometry_msgs/Point32[4] corners2d  # AprilTag corners in image
    float32 tag_size  # tag size in m
    geometry_msgs/Pose pose  # pose of the marker in the camera frame
    
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

module.exports = AprilTagDetection;
