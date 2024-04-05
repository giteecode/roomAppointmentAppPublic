package com.company.project.service;

import com.company.project.core.Result;
import com.company.project.core.Service;
import com.company.project.model.ArticleType;

public interface ArticleTypeService extends Service<ArticleType> {

    Result detail(Long id);

    Result list(ArticleType articleType);

    Result findAllByModal(ArticleType articleType);

    Result findTwoByModal(ArticleType articleType);

}
