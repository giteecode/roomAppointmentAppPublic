package com.company.project.dao;

import com.company.project.core.Mapper;
import com.company.project.model.Room;

import java.util.List;

public interface RoomMapper extends Mapper<Room> {

    List<Room> randList();

}