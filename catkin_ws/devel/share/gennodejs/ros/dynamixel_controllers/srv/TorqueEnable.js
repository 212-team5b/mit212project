// Auto-generated. Do not edit!

// (in-package dynamixel_controllers.srv)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------


//-----------------------------------------------------------

class TorqueEnableRequest {
  constructor() {
    this.torque_enable = false;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type TorqueEnableRequest
    // Serialize message field [torque_enable]
    bufferInfo = _serializer.bool(obj.torque_enable, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type TorqueEnableRequest
    let tmp;
    let len;
    let data = new TorqueEnableRequest();
    // Deserialize message field [torque_enable]
    tmp = _deserializer.bool(buffer);
    data.torque_enable = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'dynamixel_controllers/TorqueEnableRequest';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'e44dc96db32bd58b5a896c2c5bf316d0';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    bool torque_enable
    
    `;
  }

};

class TorqueEnableResponse {
  constructor() {
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type TorqueEnableResponse
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type TorqueEnableResponse
    let tmp;
    let len;
    let data = new TorqueEnableResponse();
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'dynamixel_controllers/TorqueEnableResponse';
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
  Request: TorqueEnableRequest,
  Response: TorqueEnableResponse
};
