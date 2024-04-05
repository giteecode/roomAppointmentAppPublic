package com.company.project.service.impl;

import com.company.project.core.AbstractService;
import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.dao.ArticleTypeMapper;
import com.company.project.model.ArticleType;
import com.company.project.service.ArticleService;
import com.company.project.service.ArticleTypeService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ArticleTypeServiceImpl extends AbstractService<ArticleType> implements ArticleTypeService {

    @Autowired
    private ArticleTypeMapper articleTypeMapper;

    @Autowired
    private ArticleService articleService;

    @Override
    public Result detail(Long id) {

        //根据id查询单个详情
        if (null == id){
            return ResultGenerator.genSuccessResult(new ArticleType());
        }else {
            ArticleType healthType = articleTypeMapper.detail(id);
            if (null == healthType){
                return ResultGenerator.genSuccessResult(new ArticleType());
            }else {
                //一级分类下的文章
                healthType.setArticleList(articleService.selectByArticleType(healthType.getId()));

                //返回查询的单个详情
                //代表一级分类
                if (null == healthType.getParentId()){
                    //查询全部的二级分类
                    healthType.setArticleTypeList(articleTypeMapper.selectByParentId(healthType.getId()));
                    if (healthType.getArticleTypeList() != null && healthType.getArticleTypeList().size() > 0){
                        for (ArticleType d:healthType.getArticleTypeList()) {
                            d.setArticleList(articleService.selectByArticleType(d.getId()));
                        }
                    }
                }
                return ResultGenerator.genSuccessResult(healthType);
            }
        }
    }

    @Override
    public Result list(ArticleType articleType) {

        if (articleType == null){
            articleType = new ArticleType();
        }

        PageHelper.startPage(articleType.getPage() == null ? 0 : articleType.getPage(), articleType.getLimit() == null ? 10 : articleType.getLimit());
        articleType.setIsDelete(false);
        //查询全部一级分类
        List<ArticleType> list = articleTypeMapper.list(articleType);
        if (list.size() > 0){
            for (ArticleType d:list) {
                //查询全部的二级分类
                d.setArticleTypeList(articleTypeMapper.selectByParentId(d.getId()));
            }
        }
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    @Override
    public Result findAllByModal(ArticleType articleType) {

        if (articleType == null){
            articleType = new ArticleType();
        }

        PageHelper.startPage(articleType.getPage() == null ? 0 : articleType.getPage(), articleType.getLimit() == null ? 10 : articleType.getLimit());
        articleType.setIsDelete(false);
        List<ArticleType> list = articleTypeMapper.findAllByModal(articleType);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    @Override
    public Result findTwoByModal(ArticleType articleType) {

        if (articleType == null){
            articleType = new ArticleType();
        }

        PageHelper.startPage(articleType.getPage() == null ? 0 : articleType.getPage(), articleType.getLimit() == null ? 10 : articleType.getLimit());
        List<ArticleType> list = articleTypeMapper.findTwoByModal(articleType);
        if (list.size() > 0){
            for (ArticleType d:list) {
                d.setArticleList(articleService.selectByArticleType(d.getId()));
            }
        }
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
