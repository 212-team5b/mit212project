execute_process(COMMAND "/home/luke/catkin_ws/mit212project/catkin_ws/build/me212bot/catkin_generated/python_distutils_install.sh" RESULT_VARIABLE res)

if(NOT res EQUAL 0)
  message(FATAL_ERROR "execute_process(/home/luke/catkin_ws/mit212project/catkin_ws/build/me212bot/catkin_generated/python_distutils_install.sh) returned error code ")
endif()
