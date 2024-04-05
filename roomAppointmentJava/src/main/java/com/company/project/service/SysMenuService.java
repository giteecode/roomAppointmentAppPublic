package com.company.project.service;

import com.company.project.core.Service;
import com.company.project.model.SysMenu;

import java.util.List;

public interface SysMenuService extends Service<SysMenu> {

    List<Object> selectMenuByRoleId(Long roleId);
}
