package com.company.project.service.impl;

import com.company.project.dao.GoodsDetailsMapper;
import com.company.project.model.GoodsDetails;
import com.company.project.service.GoodsDetailsService;
import com.company.project.core.AbstractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
@Transactional
public class GoodsDetailsServiceImpl extends AbstractService<GoodsDetails> implements GoodsDetailsService {

    @Resource
    private GoodsDetailsMapper goodsDetailsMapper;

    @Override
    public List<GoodsDetails> findByUser(String createdBy) {
        return goodsDetailsMapper.findByUser(createdBy);
    }
}
