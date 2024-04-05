package com.company.project.vo;

import io.swagger.annotations.ApiModelProperty;

import javax.validation.constraints.NotNull;

public class LoginVo {

    @ApiModelProperty(value = "用户名称")
    @NotNull(message = "用户名称不可为空")
    private String userName;

    @NotNull(message = "密码不可为空")
    @ApiModelProperty(value = "密码")
    private String password;

    @NotNull(message = "权限不可为空")
    @ApiModelProperty(value = "1管理员;2会员;3教练")
    private Integer role;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }
}
