package com.company.project.dao;

import com.company.project.core.Mapper;
import com.company.project.model.RoomSeat;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RoomSeatMapper extends Mapper<RoomSeat> {

    List<RoomSeat> selectByRoomId(Long roomId);

    List<RoomSeat> selectByRoomIdAndMaxX(@Param("roomId") Long roomId, @Param("num") Integer num);
}