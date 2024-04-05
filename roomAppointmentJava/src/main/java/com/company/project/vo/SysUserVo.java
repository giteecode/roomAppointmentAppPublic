package com.company.project.vo;

import java.io.Serializable;

public class SysUserVo implements Serializable {

    private Long userId;

    private String phone;

    private String email;

    private String token;

    private Long expireTime;

    private String roleId;

    private String channel;

    private String userName;

    public SysUserVo() {
        super();
    }

    public SysUserVo(Long userId, String phone, String email, String token, Long expireTime, String roleId, String channel, String userName) {
        this.userId = userId;
        this.phone = phone;
        this.email = email;
        this.token = token;
        this.expireTime = expireTime;
        this.roleId = roleId;
        this.channel = channel;
        this.userName = userName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(Long expireTime) {
        this.expireTime = expireTime;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
