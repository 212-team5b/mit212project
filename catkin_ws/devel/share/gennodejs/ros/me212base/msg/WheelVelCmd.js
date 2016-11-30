// Auto-generated. Do not edit!

// (in-package me212base.msg)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------

class WheelVelCmd {
  constructor() {
    this.desiredWV_R = 0.0;
    this.desiredWV_L = 0.0;
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type WheelVelCmd
    // Serialize message field [desiredWV_R]
    bufferInfo = _serializer.float32(obj.desiredWV_R, bufferInfo);
    // Serialize message field [desiredWV_L]
    bufferInfo = _serializer.float32(obj.desiredWV_L, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type WheelVelCmd
    let tmp;
    let len;
    let data = new WheelVelCmd();
    // Deserialize message field [desiredWV_R]
    tmp = _deserializer.float32(buffer);
    data.desiredWV_R = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [desiredWV_L]
    tmp = _deserializer.float32(buffer);
    data.desiredWV_L = tmp.data;
    buffer = tmp.buffer;
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a message object
    return 'me212base/WheelVelCmd';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '428fbbfd1f38717ca7baa73045b4efaa';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    float32 desiredWV_R
    float32 desiredWV_L
    
    `;
  }

};

module.exports = WheelVelCmd;
