
"use strict";

let RestartController = require('./RestartController.js')
let SetTorqueLimit = require('./SetTorqueLimit.js')
let SetComplianceMargin = require('./SetComplianceMargin.js')
let SetCompliancePunch = require('./SetCompliancePunch.js')
let SetSpeed = require('./SetSpeed.js')
let StartController = require('./StartController.js')
let TorqueEnable = require('./TorqueEnable.js')
let StopController = require('./StopController.js')
let SetComplianceSlope = require('./SetComplianceSlope.js')

module.exports = {
  RestartController: RestartController,
  SetTorqueLimit: SetTorqueLimit,
  SetComplianceMargin: SetComplianceMargin,
  SetCompliancePunch: SetCompliancePunch,
  SetSpeed: SetSpeed,
  StartController: StartController,
  TorqueEnable: TorqueEnable,
  StopController: StopController,
  SetComplianceSlope: SetComplianceSlope,
};
