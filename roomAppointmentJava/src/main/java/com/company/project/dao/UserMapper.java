package com.company.project.dao;

import com.company.project.core.Mapper;
import com.company.project.model.Columns;
import com.company.project.model.Tables;
import com.company.project.model.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapper extends Mapper<User> {

    User findUserByUserName(String userName);

    User findUserByOpenId(String openId);

    List<Tables> selectAllTable(String databaseName);

    List<Columns> selectAllColumnsByTableName(@Param("databaseName") String databaseName, @Param("tableName") String tableName);

    List<User> selectAllUsers();
}
