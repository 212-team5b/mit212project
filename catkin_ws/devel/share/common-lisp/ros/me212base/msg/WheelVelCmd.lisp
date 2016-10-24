; Auto-generated. Do not edit!


(cl:in-package me212base-msg)


;//! \htmlinclude WheelVelCmd.msg.html

(cl:defclass <WheelVelCmd> (roslisp-msg-protocol:ros-message)
  ((desiredWV_R
    :reader desiredWV_R
    :initarg :desiredWV_R
    :type cl:float
    :initform 0.0)
   (desiredWV_L
    :reader desiredWV_L
    :initarg :desiredWV_L
    :type cl:float
    :initform 0.0))
)

(cl:defclass WheelVelCmd (<WheelVelCmd>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <WheelVelCmd>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'WheelVelCmd)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name me212base-msg:<WheelVelCmd> is deprecated: use me212base-msg:WheelVelCmd instead.")))

(cl:ensure-generic-function 'desiredWV_R-val :lambda-list '(m))
(cl:defmethod desiredWV_R-val ((m <WheelVelCmd>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader me212base-msg:desiredWV_R-val is deprecated.  Use me212base-msg:desiredWV_R instead.")
  (desiredWV_R m))

(cl:ensure-generic-function 'desiredWV_L-val :lambda-list '(m))
(cl:defmethod desiredWV_L-val ((m <WheelVelCmd>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader me212base-msg:desiredWV_L-val is deprecated.  Use me212base-msg:desiredWV_L instead.")
  (desiredWV_L m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <WheelVelCmd>) ostream)
  "Serializes a message object of type '<WheelVelCmd>"
  (cl:let ((bits (roslisp-utils:encode-single-float-bits (cl:slot-value msg 'desiredWV_R))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-single-float-bits (cl:slot-value msg 'desiredWV_L))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <WheelVelCmd>) istream)
  "Deserializes a message object of type '<WheelVelCmd>"
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'desiredWV_R) (roslisp-utils:decode-single-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'desiredWV_L) (roslisp-utils:decode-single-float-bits bits)))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<WheelVelCmd>)))
  "Returns string type for a message object of type '<WheelVelCmd>"
  "me212base/WheelVelCmd")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'WheelVelCmd)))
  "Returns string type for a message object of type 'WheelVelCmd"
  "me212base/WheelVelCmd")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<WheelVelCmd>)))
  "Returns md5sum for a message object of type '<WheelVelCmd>"
  "428fbbfd1f38717ca7baa73045b4efaa")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'WheelVelCmd)))
  "Returns md5sum for a message object of type 'WheelVelCmd"
  "428fbbfd1f38717ca7baa73045b4efaa")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<WheelVelCmd>)))
  "Returns full string definition for message of type '<WheelVelCmd>"
  (cl:format cl:nil "float32 desiredWV_R~%float32 desiredWV_L~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'WheelVelCmd)))
  "Returns full string definition for message of type 'WheelVelCmd"
  (cl:format cl:nil "float32 desiredWV_R~%float32 desiredWV_L~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <WheelVelCmd>))
  (cl:+ 0
     4
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <WheelVelCmd>))
  "Converts a ROS message object to a list"
  (cl:list 'WheelVelCmd
    (cl:cons ':desiredWV_R (desiredWV_R msg))
    (cl:cons ':desiredWV_L (desiredWV_L msg))
))
