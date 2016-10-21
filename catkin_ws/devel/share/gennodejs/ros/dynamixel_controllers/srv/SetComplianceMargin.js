// Auto-generated. Do not edit!

// (in-package dynamixel_controllers.srv)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------


//-----------------------------------------------------------

class SetComplianceMarginRequest {
  constructor() {
    this.margin = 0;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type SetComplianceMarginRequest
    // Serialize message field [margin]
    bufferInfo = _serializer.uint8(obj.margin, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type SetComplianceMarginRequest
    let tmp;
    let len;
    let data = new SetComplianceMarginRequest();
    // Deserialize message field [margin]
    tmp = _deserializer.uint8(buffer);
    data.margin = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'dynamixel_controllers/SetComplianceMarginRequest';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'daacbf1c0642fe923f2dfb9217a97b81';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    
    
    uint8 margin
    
    `;
  }

};

class SetComplianceMarginResponse {
  constructor() {
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type SetComplianceMarginResponse
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type SetComplianceMarginResponse
    let tmp;
    let len;
    let data = new SetComplianceMarginResponse();
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'dynamixel_controllers/SetComplianceMarginResponse';
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
  Request: SetComplianceMarginRequest,
  Response: SetComplianceMarginResponse
};
