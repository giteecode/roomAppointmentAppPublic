package com.company.project.service.impl;

import com.company.project.core.AbstractService;
import com.company.project.dao.CoverMapper;
import com.company.project.model.Cover;
import com.company.project.service.CoverService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service
@Transactional
public class CoverServiceImpl extends AbstractService<Cover> implements CoverService {

    @Resource
    private CoverMapper tCoverMapper;

}
