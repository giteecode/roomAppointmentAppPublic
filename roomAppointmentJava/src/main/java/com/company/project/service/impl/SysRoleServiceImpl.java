package com.company.project.service.impl;

import com.company.project.core.AbstractService;
import com.company.project.dao.SysRoleMapper;
import com.company.project.model.SysRole;
import com.company.project.service.SysRoleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service
@Transactional
public class SysRoleServiceImpl extends AbstractService<SysRole> implements SysRoleService {

    @Resource
    private SysRoleMapper tSysRoleMapper;

}
