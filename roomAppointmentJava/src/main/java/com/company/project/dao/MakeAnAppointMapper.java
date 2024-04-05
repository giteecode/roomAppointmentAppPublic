package com.company.project.dao;

import com.company.project.core.Mapper;
import com.company.project.model.MakeAnAppoint;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface MakeAnAppointMapper extends Mapper<MakeAnAppoint> {

    Integer getCount(MakeAnAppoint makeAnAppoint);

    List<MakeAnAppoint> list(MakeAnAppoint makeAnAppoint);

    List<MakeAnAppoint> selectByUserIdAndTime(@Param("userId") Long userId, @Param("date") Date date);
}