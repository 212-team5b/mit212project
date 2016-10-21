// Auto-generated. Do not edit!

// (in-package dynamixel_controllers.srv)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------


//-----------------------------------------------------------

class SetCompliancePunchRequest {
  constructor() {
    this.punch = 0;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type SetCompliancePunchRequest
    // Serialize message field [punch]
    bufferInfo = _serializer.uint8(obj.punch, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type SetCompliancePunchRequest
    let tmp;
    let len;
    let data = new SetCompliancePunchRequest();
    // Deserialize message field [punch]
    tmp = _deserializer.uint8(buffer);
    data.punch = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'dynamixel_controllers/SetCompliancePunchRequest';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '6f1db06d3f143058321215213d1c3bef';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    
    
    uint8 punch
    
    `;
  }

};

class SetCompliancePunchResponse {
  constructor() {
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type SetCompliancePunchResponse
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type SetCompliancePunchResponse
    let tmp;
    let len;
    let data = new SetCompliancePunchResponse();
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'dynamixel_controllers/SetCompliancePunchResponse';
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
  Request: SetCompliancePunchRequest,
  Response: SetCompliancePunchResponse
};
