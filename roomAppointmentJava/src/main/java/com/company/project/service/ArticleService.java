package com.company.project.service;

import com.company.project.core.Result;
import com.company.project.core.Service;
import com.company.project.model.Article;

import java.util.List;

public interface ArticleService extends Service<Article> {

    List<Article> selectByArticleType(Long id);

    Result list(Article article);

    Result detail(Long id, String userId);

    List<Article> selectBySiteCateory(Long id);

    Result findByCreatedAt(Article article);

    Result findByHot(Article article);

    Result findAllByModal(Article article);

    Result find(Article article);

    Result detailNotType(Long id, String userId);
}
