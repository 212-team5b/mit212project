// Generated by gencpp from file dynamixel_controllers/TorqueEnableRequest.msg
// DO NOT EDIT!


#ifndef DYNAMIXEL_CONTROLLERS_MESSAGE_TORQUEENABLEREQUEST_H
#define DYNAMIXEL_CONTROLLERS_MESSAGE_TORQUEENABLEREQUEST_H


#include <string>
#include <vector>
#include <map>

#include <ros/types.h>
#include <ros/serialization.h>
#include <ros/builtin_message_traits.h>
#include <ros/message_operations.h>


namespace dynamixel_controllers
{
template <class ContainerAllocator>
struct TorqueEnableRequest_
{
  typedef TorqueEnableRequest_<ContainerAllocator> Type;

  TorqueEnableRequest_()
    : torque_enable(false)  {
    }
  TorqueEnableRequest_(const ContainerAllocator& _alloc)
    : torque_enable(false)  {
  (void)_alloc;
    }



   typedef uint8_t _torque_enable_type;
  _torque_enable_type torque_enable;




  typedef boost::shared_ptr< ::dynamixel_controllers::TorqueEnableRequest_<ContainerAllocator> > Ptr;
  typedef boost::shared_ptr< ::dynamixel_controllers::TorqueEnableRequest_<ContainerAllocator> const> ConstPtr;

}; // struct TorqueEnableRequest_

typedef ::dynamixel_controllers::TorqueEnableRequest_<std::allocator<void> > TorqueEnableRequest;

typedef boost::shared_ptr< ::dynamixel_controllers::TorqueEnableRequest > TorqueEnableRequestPtr;
typedef boost::shared_ptr< ::dynamixel_controllers::TorqueEnableRequest const> TorqueEnableRequestConstPtr;

// constants requiring out of line definition



template<typename ContainerAllocator>
std::ostream& operator<<(std::ostream& s, const ::dynamixel_controllers::TorqueEnableRequest_<ContainerAllocator> & v)
{
ros::message_operations::Printer< ::dynamixel_controllers::TorqueEnableRequest_<ContainerAllocator> >::stream(s, "", v);
return s;
}

} // namespace dynamixel_controllers

namespace ros
{
namespace message_traits
{



// BOOLTRAITS {'IsFixedSize': True, 'IsMessage': True, 'HasHeader': False}
// {}

// !!!!!!!!!!! ['__class__', '__delattr__', '__dict__', '__doc__', '__eq__', '__format__', '__getattribute__', '__hash__', '__init__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_parsed_fields', 'constants', 'fields', 'full_name', 'has_header', 'header_present', 'names', 'package', 'parsed_fields', 'short_name', 'text', 'types']




template <class ContainerAllocator>
struct IsFixedSize< ::dynamixel_controllers::TorqueEnableRequest_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsFixedSize< ::dynamixel_controllers::TorqueEnableRequest_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::dynamixel_controllers::TorqueEnableRequest_<ContainerAllocator> >
  : TrueType
  { };

template <class ContainerAllocator>
struct IsMessage< ::dynamixel_controllers::TorqueEnableRequest_<ContainerAllocator> const>
  : TrueType
  { };

template <class ContainerAllocator>
struct HasHeader< ::dynamixel_controllers::TorqueEnableRequest_<ContainerAllocator> >
  : FalseType
  { };

template <class ContainerAllocator>
struct HasHeader< ::dynamixel_controllers::TorqueEnableRequest_<ContainerAllocator> const>
  : FalseType
  { };


template<class ContainerAllocator>
struct MD5Sum< ::dynamixel_controllers::TorqueEnableRequest_<ContainerAllocator> >
{
  static const char* value()
  {
    return "e44dc96db32bd58b5a896c2c5bf316d0";
  }

  static const char* value(const ::dynamixel_controllers::TorqueEnableRequest_<ContainerAllocator>&) { return value(); }
  static const uint64_t static_value1 = 0xe44dc96db32bd58bULL;
  static const uint64_t static_value2 = 0x5a896c2c5bf316d0ULL;
};

template<class ContainerAllocator>
struct DataType< ::dynamixel_controllers::TorqueEnableRequest_<ContainerAllocator> >
{
  static const char* value()
  {
    return "dynamixel_controllers/TorqueEnableRequest";
  }

  static const char* value(const ::dynamixel_controllers::TorqueEnableRequest_<ContainerAllocator>&) { return value(); }
};

template<class ContainerAllocator>
struct Definition< ::dynamixel_controllers::TorqueEnableRequest_<ContainerAllocator> >
{
  static const char* value()
  {
    return "bool torque_enable\n\
";
  }

  static const char* value(const ::dynamixel_controllers::TorqueEnableRequest_<ContainerAllocator>&) { return value(); }
};

} // namespace message_traits
} // namespace ros

namespace ros
{
namespace serialization
{

  template<class ContainerAllocator> struct Serializer< ::dynamixel_controllers::TorqueEnableRequest_<ContainerAllocator> >
  {
    template<typename Stream, typename T> inline static void allInOne(Stream& stream, T m)
    {
      stream.next(m.torque_enable);
    }

    ROS_DECLARE_ALLINONE_SERIALIZER;
  }; // struct TorqueEnableRequest_

} // namespace serialization
} // namespace ros

namespace ros
{
namespace message_operations
{

template<class ContainerAllocator>
struct Printer< ::dynamixel_controllers::TorqueEnableRequest_<ContainerAllocator> >
{
  template<typename Stream> static void stream(Stream& s, const std::string& indent, const ::dynamixel_controllers::TorqueEnableRequest_<ContainerAllocator>& v)
  {
    s << indent << "torque_enable: ";
    Printer<uint8_t>::stream(s, indent + "  ", v.torque_enable);
  }
};

} // namespace message_operations
} // namespace ros

#endif // DYNAMIXEL_CONTROLLERS_MESSAGE_TORQUEENABLEREQUEST_H
