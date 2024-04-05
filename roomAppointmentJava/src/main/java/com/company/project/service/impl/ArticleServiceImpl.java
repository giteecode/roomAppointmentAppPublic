package com.company.project.service.impl;

import com.company.project.core.AbstractService;
import com.company.project.core.Result;
import com.company.project.core.ResultGenerator;
import com.company.project.dao.ArticleMapper;
import com.company.project.model.Article;
import com.company.project.service.ArticleService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class ArticleServiceImpl extends AbstractService<Article> implements ArticleService {

    @Autowired
    private ArticleMapper articleMapper;

    @Override
    public List<Article> selectByArticleType(Long id) {
        List<Article> list = articleMapper.selectByArticleType(id);
        return list;
    }

    @Override
    public Result list(Article article) {

        if(article == null){
            article = new Article();
        }

        PageHelper.startPage(article.getPage() == null ? 0 : article.getPage(), article.getLimit() == null ? 10 : article.getLimit());
        article.setIsDelete(false);
        List<Article> list = articleMapper.list(article);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    @Override
    public Result detail(Long id, String userId) {
        //根据id查询单个详情
        if (null == id){
            return ResultGenerator.genSuccessResult(new Article());
        }else {
            Article article = articleMapper.detail(id,userId);
            if (null == article){
                return ResultGenerator.genSuccessResult(new Article());
            }else {
                if (null != article.getViewCount()){
                    article.setViewCount(article.getViewCount() + 1);
                }else {
                    article.setViewCount(1);
                }
                update(article);
                //返回查询的单个详情
                return ResultGenerator.genSuccessResult(article);
            }
        }
    }

    @Override
    public Result detailNotType(Long id, String userId) {
        //根据id查询单个详情
        if (null == id){
            return ResultGenerator.genSuccessResult(new Article());
        }else {
            Article article = articleMapper.detailNotType(id,userId);
            if (null == article){
                return ResultGenerator.genSuccessResult(new Article());
            }else {
                if (null != article.getViewCount()){
                    article.setViewCount(article.getViewCount() + 1);
                }else {
                    article.setViewCount(1);
                }

                //返回查询的单个详情
                return ResultGenerator.genSuccessResult(article);
            }
        }
    }

    @Override
    public List<Article> selectBySiteCateory(Long id) {
        List<Article> list = articleMapper.selectBySiteCateory(id);
        return list;
    }

    @Override
    public Result findByCreatedAt(Article article) {

        if(article == null){
            article = new Article();
        }

        PageHelper.startPage(article.getPage() == null ? 0 : article.getPage(), article.getLimit() == null ? 10 : article.getLimit());
        article.setIsDelete(false);
        List<Article> list = articleMapper.findByCreatedAt(article);
        Collections.shuffle(list);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    @Override
    public Result findByHot(Article article) {

        if(article == null){
            article = new Article();
        }

        PageHelper.startPage(0, 0);
        article.setIsDelete(false);
        List<Article> list = articleMapper.findByHot(article);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    @Override
    public Result findAllByModal(Article article) {

        if(article == null){
            article = new Article();
        }

        PageHelper.startPage(0, 0);
        article.setIsDelete(false);
        List<Article> list = articleMapper.findAllByModal(article);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    @Override
    public Result find(Article article) {
        if(article == null){
            article = new Article();
        }

        PageHelper.startPage(article.getPage() == null ? 0 : article.getPage(), article.getLimit() == null ? 10 : article.getLimit());
        article.setIsDelete(false);
        List<Article> list = articleMapper.find(article);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
