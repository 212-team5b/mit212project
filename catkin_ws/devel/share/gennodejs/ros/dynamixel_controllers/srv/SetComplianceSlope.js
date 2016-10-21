// Auto-generated. Do not edit!

// (in-package dynamixel_controllers.srv)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------


//-----------------------------------------------------------

class SetComplianceSlopeRequest {
  constructor() {
    this.slope = 0;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type SetComplianceSlopeRequest
    // Serialize message field [slope]
    bufferInfo = _serializer.uint8(obj.slope, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type SetComplianceSlopeRequest
    let tmp;
    let len;
    let data = new SetComplianceSlopeRequest();
    // Deserialize message field [slope]
    tmp = _deserializer.uint8(buffer);
    data.slope = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'dynamixel_controllers/SetComplianceSlopeRequest';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '0b655cbe1b74daf357824dcc427c1004';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    
    
    uint8 slope
    
    `;
  }

};

class SetComplianceSlopeResponse {
  constructor() {
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type SetComplianceSlopeResponse
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type SetComplianceSlopeResponse
    let tmp;
    let len;
    let data = new SetComplianceSlopeResponse();
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'dynamixel_controllers/SetComplianceSlopeResponse';
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
  Request: SetComplianceSlopeRequest,
  Response: SetComplianceSlopeResponse
};
