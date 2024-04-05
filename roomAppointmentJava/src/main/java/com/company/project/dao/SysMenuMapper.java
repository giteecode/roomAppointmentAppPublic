package com.company.project.dao;

import com.company.project.core.Mapper;
import com.company.project.model.SysMenu;

import java.util.List;

public interface SysMenuMapper extends Mapper<SysMenu> {

    List<Object> selectMenuByRoleId(Long roleId);

}