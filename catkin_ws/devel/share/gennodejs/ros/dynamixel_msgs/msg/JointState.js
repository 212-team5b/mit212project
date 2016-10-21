// Auto-generated. Do not edit!

// (in-package dynamixel_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let std_msgs = _finder('std_msgs');

//-----------------------------------------------------------

class JointState {
  constructor() {
    this.header = new std_msgs.msg.Header();
    this.name = '';
    this.motor_ids = [];
    this.motor_temps = [];
    this.goal_pos = 0.0;
    this.current_pos = 0.0;
    this.error = 0.0;
    this.velocity = 0.0;
    this.load = 0.0;
    this.is_moving = false;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type JointState
    // Serialize message field [header]
    bufferInfo = std_msgs.msg.Header.serialize(obj.header, bufferInfo);
    // Serialize message field [name]
    bufferInfo = _serializer.string(obj.name, bufferInfo);
    // Serialize the length for message field [motor_ids]
    bufferInfo = _serializer.uint32(obj.motor_ids.length, bufferInfo);
    // Serialize message field [motor_ids]
    obj.motor_ids.forEach((val) => {
      bufferInfo = _serializer.int32(val, bufferInfo);
    });
    // Serialize the length for message field [motor_temps]
    bufferInfo = _serializer.uint32(obj.motor_temps.length, bufferInfo);
    // Serialize message field [motor_temps]
    obj.motor_temps.forEach((val) => {
      bufferInfo = _serializer.int32(val, bufferInfo);
    });
    // Serialize message field [goal_pos]
    bufferInfo = _serializer.float64(obj.goal_pos, bufferInfo);
    // Serialize message field [current_pos]
    bufferInfo = _serializer.float64(obj.current_pos, bufferInfo);
    // Serialize message field [error]
    bufferInfo = _serializer.float64(obj.error, bufferInfo);
    // Serialize message field [velocity]
    bufferInfo = _serializer.float64(obj.velocity, bufferInfo);
    // Serialize message field [load]
    bufferInfo = _serializer.float64(obj.load, bufferInfo);
    // Serialize message field [is_moving]
    bufferInfo = _serializer.bool(obj.is_moving, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type JointState
    let tmp;
    let len;
    let data = new JointState();
    // Deserialize message field [header]
    tmp = std_msgs.msg.Header.deserialize(buffer);
    data.header = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [name]
    tmp = _deserializer.string(buffer);
    data.name = tmp.data;
    buffer = tmp.buffer;
    // Deserialize array length for message field [motor_ids]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [motor_ids]
    data.motor_ids = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.int32(buffer);
      data.motor_ids[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize array length for message field [motor_temps]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [motor_temps]
    data.motor_temps = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.int32(buffer);
      data.motor_temps[i] = tmp.data;
      buffer = tmp.buffer;
    }
    // Deserialize message field [goal_pos]
    tmp = _deserializer.float64(buffer);
    data.goal_pos = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [current_pos]
    tmp = _deserializer.float64(buffer);
    data.current_pos = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [error]
    tmp = _deserializer.float64(buffer);
    data.error = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [velocity]
    tmp = _deserializer.float64(buffer);
    data.velocity = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [load]
    tmp = _deserializer.float64(buffer);
    data.load = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [is_moving]
    tmp = _deserializer.bool(buffer);
    data.is_moving = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'dynamixel_msgs/JointState';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '2b8449320cde76616338e2539db27c32';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    Header header
    string name         # joint name
    int32[] motor_ids   # motor ids controlling this joint
    int32[] motor_temps # motor temperatures, same order as motor_ids
    
    float64 goal_pos    # commanded position (in radians)
    float64 current_pos # current joint position (in radians)
    float64 error       # error between commanded and current positions (in radians)
    float64 velocity    # current joint speed (in radians per second)
    float64 load        # current load
    bool is_moving      # is joint currently in motion
    
    
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
    
    `;
  }

};

module.exports = JointState;
