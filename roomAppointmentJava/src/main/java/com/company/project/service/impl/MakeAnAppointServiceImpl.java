package com.company.project.service.impl;

import com.company.project.core.AbstractService;
import com.company.project.core.Result;
import com.company.project.core.ResultCode;
import com.company.project.core.ResultGenerator;
import com.company.project.dao.MakeAnAppointMapper;
import com.company.project.model.MakeAnAppoint;
import com.company.project.model.User;
import com.company.project.service.MakeAnAppointService;
import com.company.project.service.UserService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class MakeAnAppointServiceImpl extends AbstractService<MakeAnAppoint> implements MakeAnAppointService {

    @Resource
    private MakeAnAppointMapper makeAnAppointMapper;

    @Resource
    private UserService userService;

    @Override
    public Result add(MakeAnAppoint makeAnAppoint) {

        Integer rows = makeAnAppointMapper.getCount(makeAnAppoint);
        if (rows > 0){
            return ResultGenerator.genFailResult("不可重复预约");
        }

        if (makeAnAppoint.getCreatedBy() != null){
            User user = userService.findByIdAndValidDelete(Long.valueOf(makeAnAppoint.getCreatedBy()));
            if (null == user){
                return ResultGenerator.genFailResult(ResultCode.USER_NOT_EXIST,"用户信息不存在[账号可能被停用或删除]");
            }
        }

        save(makeAnAppoint);
        Result result= ResultGenerator.genSuccessResult();
        result.setData(makeAnAppoint);
        return result;
    }

    @Override
    public Result list(MakeAnAppoint makeAnAppoint) {

        if (null == makeAnAppoint){
            makeAnAppoint = new MakeAnAppoint();
        }

        if (makeAnAppoint.getCreatedBy() != null){
            User user = userService.findByIdAndValidDelete(Long.valueOf(makeAnAppoint.getCreatedBy()));
            if (null == user){
                return ResultGenerator.genFailResult(ResultCode.USER_NOT_EXIST,"用户信息不存在[账号可能被停用或删除]");
            }

            if (0 == user.getRoleId()){
                makeAnAppoint.setCreatedBy(null);
            }
        }

        PageHelper.startPage(makeAnAppoint.getPage() == null ? 0 : makeAnAppoint.getPage(), makeAnAppoint.getLimit() == null ? 10 : makeAnAppoint.getLimit());
        makeAnAppoint.setIsDelete(false);
        List<MakeAnAppoint> list = makeAnAppointMapper.list(makeAnAppoint);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    @Override
    public List<MakeAnAppoint> selectByUserIdAndTime(Long userId, Date date) {
        return makeAnAppointMapper.selectByUserIdAndTime(userId,date);
    }
}
