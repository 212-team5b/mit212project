// Auto-generated. Do not edit!

// (in-package dynamixel_controllers.srv)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------


//-----------------------------------------------------------

class SetSpeedRequest {
  constructor() {
    this.speed = 0.0;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type SetSpeedRequest
    // Serialize message field [speed]
    bufferInfo = _serializer.float64(obj.speed, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type SetSpeedRequest
    let tmp;
    let len;
    let data = new SetSpeedRequest();
    // Deserialize message field [speed]
    tmp = _deserializer.float64(buffer);
    data.speed = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'dynamixel_controllers/SetSpeedRequest';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '4641bb0523a3557209606d9bd91ce33a';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    float64 speed
    
    `;
  }

};

class SetSpeedResponse {
  constructor() {
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type SetSpeedResponse
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type SetSpeedResponse
    let tmp;
    let len;
    let data = new SetSpeedResponse();
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'dynamixel_controllers/SetSpeedResponse';
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
  Request: SetSpeedRequest,
  Response: SetSpeedResponse
};
