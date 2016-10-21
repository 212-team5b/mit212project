// Auto-generated. Do not edit!

// (in-package dynamixel_msgs.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class MotorState {
  constructor() {
    this.timestamp = 0.0;
    this.id = 0;
    this.goal = 0;
    this.position = 0;
    this.error = 0;
    this.speed = 0;
    this.load = 0.0;
    this.voltage = 0.0;
    this.temperature = 0;
    this.moving = false;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type MotorState
    // Serialize message field [timestamp]
    bufferInfo = _serializer.float64(obj.timestamp, bufferInfo);
    // Serialize message field [id]
    bufferInfo = _serializer.int32(obj.id, bufferInfo);
    // Serialize message field [goal]
    bufferInfo = _serializer.int32(obj.goal, bufferInfo);
    // Serialize message field [position]
    bufferInfo = _serializer.int32(obj.position, bufferInfo);
    // Serialize message field [error]
    bufferInfo = _serializer.int32(obj.error, bufferInfo);
    // Serialize message field [speed]
    bufferInfo = _serializer.int32(obj.speed, bufferInfo);
    // Serialize message field [load]
    bufferInfo = _serializer.float64(obj.load, bufferInfo);
    // Serialize message field [voltage]
    bufferInfo = _serializer.float64(obj.voltage, bufferInfo);
    // Serialize message field [temperature]
    bufferInfo = _serializer.int32(obj.temperature, bufferInfo);
    // Serialize message field [moving]
    bufferInfo = _serializer.bool(obj.moving, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type MotorState
    let tmp;
    let len;
    let data = new MotorState();
    // Deserialize message field [timestamp]
    tmp = _deserializer.float64(buffer);
    data.timestamp = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [id]
    tmp = _deserializer.int32(buffer);
    data.id = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [goal]
    tmp = _deserializer.int32(buffer);
    data.goal = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [position]
    tmp = _deserializer.int32(buffer);
    data.position = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [error]
    tmp = _deserializer.int32(buffer);
    data.error = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [speed]
    tmp = _deserializer.int32(buffer);
    data.speed = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [load]
    tmp = _deserializer.float64(buffer);
    data.load = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [voltage]
    tmp = _deserializer.float64(buffer);
    data.voltage = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [temperature]
    tmp = _deserializer.int32(buffer);
    data.temperature = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [moving]
    tmp = _deserializer.bool(buffer);
    data.moving = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'dynamixel_msgs/MotorState';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '1cefdc3ff0c7d52e475886024476b74d';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
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

module.exports = MotorState;
