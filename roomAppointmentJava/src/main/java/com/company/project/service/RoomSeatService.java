package com.company.project.service;

import com.company.project.core.Service;
import com.company.project.model.RoomSeat;

import java.util.List;

public interface RoomSeatService extends Service<RoomSeat> {

    List<RoomSeat> selectByRoomId(Long roomId);

    List<RoomSeat> selectByRoomIdAndMaxX(Long roomId, Integer num);
}
