
"use strict";

let RestartController = require('./RestartController.js')
let SetCompliancePunch = require('./SetCompliancePunch.js')
let SetComplianceMargin = require('./SetComplianceMargin.js')
let SetSpeed = require('./SetSpeed.js')
let StartController = require('./StartController.js')
let TorqueEnable = require('./TorqueEnable.js')
let StopController = require('./StopController.js')
let SetComplianceSlope = require('./SetComplianceSlope.js')
let SetTorqueLimit = require('./SetTorqueLimit.js')

module.exports = {
  RestartController: RestartController,
  SetCompliancePunch: SetCompliancePunch,
  SetComplianceMargin: SetComplianceMargin,
  SetSpeed: SetSpeed,
  StartController: StartController,
  TorqueEnable: TorqueEnable,
  StopController: StopController,
  SetComplianceSlope: SetComplianceSlope,
  SetTorqueLimit: SetTorqueLimit,
};
