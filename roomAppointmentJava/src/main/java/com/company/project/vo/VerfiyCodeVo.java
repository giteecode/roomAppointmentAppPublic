package com.company.project.vo;

import java.io.Serializable;

public class VerfiyCodeVo implements Serializable {

    private static final long serialVersionUID = -10034668880034434L;

    private String code;

    private Long expireTime;

    public VerfiyCodeVo(){

    }

    public VerfiyCodeVo(String code,Long expireTime){
        this.code=code;
        this.expireTime=expireTime;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Long getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(Long expireTime) {
        this.expireTime = expireTime;
    }

}
