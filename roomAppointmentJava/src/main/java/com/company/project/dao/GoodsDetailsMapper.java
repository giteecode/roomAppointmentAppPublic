package com.company.project.dao;

import com.company.project.core.Mapper;
import com.company.project.model.GoodsDetails;

import java.util.List;

public interface GoodsDetailsMapper extends Mapper<GoodsDetails> {

    List<GoodsDetails> findByUser(String createdBy);

}