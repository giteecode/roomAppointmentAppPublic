package com.company.project.service;

import com.company.project.core.Result;
import com.company.project.core.Service;
import com.company.project.model.Room;

public interface RoomService extends Service<Room> {

    Result add(Room room);

    Result list(Room room);

    Result detail(Long id);

    Result recommendByUser(Room room);
}
