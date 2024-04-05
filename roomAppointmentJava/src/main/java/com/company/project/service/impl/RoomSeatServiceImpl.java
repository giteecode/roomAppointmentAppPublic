package com.company.project.service.impl;

import com.company.project.core.AbstractService;
import com.company.project.dao.RoomSeatMapper;
import com.company.project.model.RoomSeat;
import com.company.project.service.RoomSeatService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
@Transactional
public class RoomSeatServiceImpl extends AbstractService<RoomSeat> implements RoomSeatService {

    @Resource
    private RoomSeatMapper roomSeatMapper;

    @Override
    public List<RoomSeat> selectByRoomId(Long roomId) {
        return roomSeatMapper.selectByRoomId(roomId);
    }

    @Override
    public List<RoomSeat> selectByRoomIdAndMaxX(Long roomId,Integer num) {
        return roomSeatMapper.selectByRoomIdAndMaxX(roomId,num);
    }
}
