package com.company.project.service;
import com.company.project.core.Result;
import com.company.project.model.User;
import com.company.project.core.Service;
import com.company.project.vo.LoginVo;

import java.util.List;

public interface UserService extends Service<User> {

    Result logout(Long userId);

    Result login(LoginVo vo);

    Result captcha();

    User findUserByOpenId(String openId);

    Result findAllColumns();

    List<User> selectAllUsers();
}
