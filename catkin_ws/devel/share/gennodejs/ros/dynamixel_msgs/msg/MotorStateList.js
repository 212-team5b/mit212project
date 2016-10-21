// Auto-generated. Do not edit!

// (in-package dynamixel_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');
let MotorState = require('./MotorState.js');

//-----------------------------------------------------------

class MotorStateList {
  constructor() {
    this.motor_states = [];
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type MotorStateList
    // Serialize the length for message field [motor_states]
    bufferInfo = _serializer.uint32(obj.motor_states.length, bufferInfo);
    // Serialize message field [motor_states]
    obj.motor_states.forEach((val) => {
      bufferInfo = MotorState.serialize(val, bufferInfo);
    });
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type MotorStateList
    let tmp;
    let len;
    let data = new MotorStateList();
    // Deserialize array length for message field [motor_states]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [motor_states]
    data.motor_states = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = MotorState.deserialize(buffer);
      data.motor_states[i] = tmp.data;
      buffer = tmp.buffer;
    }
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'dynamixel_msgs/MotorStateList';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '9e94ccf6563ca78afce19eb097f9343c';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    MotorState[] motor_states
    
    ================================================================================
    MSG: dynamixel_msgs/MotorState
    float64 timestamp   # motor state is at this time
    int32 id            # motor id
    int32 goal          # commanded position (in encoder units)
    int32 position      # current position (in encoder units)
    int32 error         # difference between current and goal positions
    int32 speed         # current speed (0.111 rpm per unit)
    float64 load        # current load - ratio of applied torque over maximum torque
    float64 voltage     # current voltage (V)
    int32 temperature   # current temperature (degrees Celsius)
    bool moving         # whether the motor is currently in motion
    
    `;
  }

};

module.exports = MotorStateList;
