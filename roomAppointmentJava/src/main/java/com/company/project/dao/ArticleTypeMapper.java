package com.company.project.dao;

import com.company.project.core.Mapper;
import com.company.project.model.ArticleType;

import java.util.List;

public interface ArticleTypeMapper extends Mapper<ArticleType> {

    ArticleType detail(Long id);

    List<ArticleType> selectByParentId(Long id);

    List<ArticleType> list(ArticleType articleType);

    List<ArticleType> findAllByModal(ArticleType articleType);

    List<ArticleType> findTwoByModal(ArticleType articleType);

}