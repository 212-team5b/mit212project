;; Auto-generated. Do not edit!


(when (boundp 'me212base::WheelVelCmd)
  (if (not (find-package "ME212BASE"))
    (make-package "ME212BASE"))
  (shadow 'WheelVelCmd (find-package "ME212BASE")))
(unless (find-package "ME212BASE::WHEELVELCMD")
  (make-package "ME212BASE::WHEELVELCMD"))

(in-package "ROS")
;;//! \htmlinclude WheelVelCmd.msg.html


(defclass me212base::WheelVelCmd
  :super ros::object
  :slots (_desiredWV_R _desiredWV_L ))

(defmethod me212base::WheelVelCmd
  (:init
   (&key
    ((:desiredWV_R __desiredWV_R) 0.0)
    ((:desiredWV_L __desiredWV_L) 0.0)
    )
   (send-super :init)
   (setq _desiredWV_R (float __desiredWV_R))
   (setq _desiredWV_L (float __desiredWV_L))
   self)
  (:desiredWV_R
   (&optional __desiredWV_R)
   (if __desiredWV_R (setq _desiredWV_R __desiredWV_R)) _desiredWV_R)
  (:desiredWV_L
   (&optional __desiredWV_L)
   (if __desiredWV_L (setq _desiredWV_L __desiredWV_L)) _desiredWV_L)
  (:serialization-length
   ()
   (+
    ;; float32 _desiredWV_R
    4
    ;; float32 _desiredWV_L
    4
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; float32 _desiredWV_R
       (sys::poke _desiredWV_R (send s :buffer) (send s :count) :float) (incf (stream-count s) 4)
     ;; float32 _desiredWV_L
       (sys::poke _desiredWV_L (send s :buffer) (send s :count) :float) (incf (stream-count s) 4)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; float32 _desiredWV_R
     (setq _desiredWV_R (sys::peek buf ptr- :float)) (incf ptr- 4)
   ;; float32 _desiredWV_L
     (setq _desiredWV_L (sys::peek buf ptr- :float)) (incf ptr- 4)
   ;;
   self)
  )

(setf (get me212base::WheelVelCmd :md5sum-) "428fbbfd1f38717ca7baa73045b4efaa")
(setf (get me212base::WheelVelCmd :datatype-) "me212base/WheelVelCmd")
(setf (get me212base::WheelVelCmd :definition-)
      "float32 desiredWV_R
float32 desiredWV_L

")



(provide :me212base/WheelVelCmd "428fbbfd1f38717ca7baa73045b4efaa")


