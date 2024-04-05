package com.company.project.dao;

import com.company.project.core.Mapper;
import com.company.project.model.Article;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ArticleMapper extends Mapper<Article> {

    List<Article> selectByArticleType(Long id);

    List<Article> list(Article health);

    Article detail(@Param("id") Long id, @Param("userId") String userId);

    List<Article> selectBySiteCateory(Long id);

    List<Article> findByCreatedAt(Article article);

    List<Article> findByHot(Article article);

    List<Article> findAllByModal(Article article);

    List<Article> find(Article article);

    Article detailNotType(@Param("id") Long id, @Param("userId") String userId);
}