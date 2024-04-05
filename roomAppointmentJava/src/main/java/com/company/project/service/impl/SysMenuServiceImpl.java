package com.company.project.service.impl;

import com.company.project.core.AbstractService;
import com.company.project.dao.SysMenuMapper;
import com.company.project.model.SysMenu;
import com.company.project.service.SysMenuService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
@Transactional
public class SysMenuServiceImpl extends AbstractService<SysMenu> implements SysMenuService {

    @Resource
    private SysMenuMapper sysMenuMapper;

    @Override
    public List<Object> selectMenuByRoleId(Long roleId) {
        return sysMenuMapper.selectMenuByRoleId(roleId);
    }
}
