// Auto-generated. Do not edit!

// (in-package dynamixel_controllers.srv)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------


//-----------------------------------------------------------

class SetTorqueLimitRequest {
  constructor() {
    this.torque_limit = 0.0;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type SetTorqueLimitRequest
    // Serialize message field [torque_limit]
    bufferInfo = _serializer.float64(obj.torque_limit, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type SetTorqueLimitRequest
    let tmp;
    let len;
    let data = new SetTorqueLimitRequest();
    // Deserialize message field [torque_limit]
    tmp = _deserializer.float64(buffer);
    data.torque_limit = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'dynamixel_controllers/SetTorqueLimitRequest';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '7ac67170532bb79d95db2a425915bbd6';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    
    
    float64 torque_limit
    
    `;
  }

};

class SetTorqueLimitResponse {
  constructor() {
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type SetTorqueLimitResponse
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type SetTorqueLimitResponse
    let tmp;
    let len;
    let data = new SetTorqueLimitResponse();
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'dynamixel_controllers/SetTorqueLimitResponse';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'd41d8cd98f00b204e9800998ecf8427e';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    
    
    
    `;
  }

};

module.exports = {
  Request: SetTorqueLimitRequest,
  Response: SetTorqueLimitResponse
};
