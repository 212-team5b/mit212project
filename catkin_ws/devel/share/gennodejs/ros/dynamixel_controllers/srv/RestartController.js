// Auto-generated. Do not edit!

// (in-package dynamixel_controllers.srv)


"use strict";

let _serializer = require('../base_serialize.js');
let _deserializer = require('../base_deserialize.js');
let _finder = require('../find.js');

//-----------------------------------------------------------


//-----------------------------------------------------------

class RestartControllerRequest {
  constructor() {
    this.port_name = '';
    this.package_path = '';
    this.module_name = '';
    this.class_name = '';
    this.controller_name = '';
    this.dependencies = [];
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type RestartControllerRequest
    // Serialize message field [port_name]
    bufferInfo = _serializer.string(obj.port_name, bufferInfo);
    // Serialize message field [package_path]
    bufferInfo = _serializer.string(obj.package_path, bufferInfo);
    // Serialize message field [module_name]
    bufferInfo = _serializer.string(obj.module_name, bufferInfo);
    // Serialize message field [class_name]
    bufferInfo = _serializer.string(obj.class_name, bufferInfo);
    // Serialize message field [controller_name]
    bufferInfo = _serializer.string(obj.controller_name, bufferInfo);
    // Serialize the length for message field [dependencies]
    bufferInfo = _serializer.uint32(obj.dependencies.length, bufferInfo);
    // Serialize message field [dependencies]
    obj.dependencies.forEach((val) => {
      bufferInfo = _serializer.string(val, bufferInfo);
    });
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type RestartControllerRequest
    let tmp;
    let len;
    let data = new RestartControllerRequest();
    // Deserialize message field [port_name]
    tmp = _deserializer.string(buffer);
    data.port_name = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [package_path]
    tmp = _deserializer.string(buffer);
    data.package_path = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [module_name]
    tmp = _deserializer.string(buffer);
    data.module_name = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [class_name]
    tmp = _deserializer.string(buffer);
    data.class_name = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [controller_name]
    tmp = _deserializer.string(buffer);
    data.controller_name = tmp.data;
    buffer = tmp.buffer;
    // Deserialize array length for message field [dependencies]
    tmp = _deserializer.uint32(buffer);
    len = tmp.data;
    buffer = tmp.buffer;
    // Deserialize message field [dependencies]
    data.dependencies = new Array(len);
    for (let i = 0; i < len; ++i) {
      tmp = _deserializer.string(buffer);
      data.dependencies[i] = tmp.data;
      buffer = tmp.buffer;
    }
    return {
      data: data,
      buffer: buffer
    }
  }

  static datatype() {
    // Returns string type for a service object
    return 'dynamixel_controllers/RestartControllerRequest';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '7785d708c83a180befd2fe3450dd9d41';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string port_name
    string package_path
    string module_name
    string class_name
    string controller_name
    string[] dependencies
    
    `;
  }

};

class RestartControllerResponse {
  constructor() {
    this.success = false;
    this.reason = '';
  }

  static serialize(obj, bufferInfo) {
    // Serializes a message object of type RestartControllerResponse
    // Serialize message field [success]
    bufferInfo = _serializer.bool(obj.success, bufferInfo);
    // Serialize message field [reason]
    bufferInfo = _serializer.string(obj.reason, bufferInfo);
    return bufferInfo;
  }

  static deserialize(buffer) {
    //deserializes a message object of type RestartControllerResponse
    let tmp;
    let len;
    let data = new RestartControllerResponse();
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
    return 'dynamixel_controllers/RestartControllerResponse';
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
  Request: RestartControllerRequest,
  Response: RestartControllerResponse
};
