package com.company.project.service;

import com.company.project.core.Result;
import com.company.project.core.Service;
import com.company.project.model.MakeAnAppoint;

import java.util.Date;
import java.util.List;

public interface MakeAnAppointService extends Service<MakeAnAppoint> {

    Result add(MakeAnAppoint makeAnAppoint);

    Result list(MakeAnAppoint makeAnAppoint);

    List<MakeAnAppoint> selectByUserIdAndTime(Long userId, Date date);
}
