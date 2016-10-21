// Auto-generated. Do not edit!

// (in-package dynamixel_controllers.srv)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------


//-----------------------------------------------------------

class StopControllerRequest {
  constructor() {
    this.controller_name = '';
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type StopControllerRequest
    // Serialize message field [controller_name]
    bufferInfo = _serializer.string(obj.controller_name, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type StopControllerRequest
    let tmp;
    let len;
    let data = new StopControllerRequest();
    // Deserialize message field [controller_name]
    tmp = _deserializer.string(buffer);
    data.controller_name = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'dynamixel_controllers/StopControllerRequest';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'df2b10f2f876d82269ae3fc1e0538e11';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string controller_name
    
    `;
  }

};

class StopControllerResponse {
  constructor() {
    this.success = false;
    this.reason = '';
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type StopControllerResponse
    // Serialize message field [success]
    bufferInfo = _serializer.bool(obj.success, bufferInfo);
    // Serialize message field [reason]
    bufferInfo = _serializer.string(obj.reason, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type StopControllerResponse
    let tmp;
    let len;
    let data = new StopControllerResponse();
    // Deserialize message field [success]
    tmp = _deserializer.bool(buffer);
    data.success = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [reason]
    tmp = _deserializer.string(buffer);
    data.reason = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'dynamixel_controllers/StopControllerResponse';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'a4d50a34d34f18de48e2436ff1472594';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    bool success
    string reason
    
    
    `;
  }

};

module.exports = {
  Request: StopControllerRequest,
  Response: StopControllerResponse
};
