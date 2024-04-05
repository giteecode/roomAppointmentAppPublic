package com.company.project;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableScheduling     //开启定时器
@ServletComponentScan //该注解可以自动注入@WebServlet，@WebFilter，@WebListener。否则在过滤器中无法获取到自动注入得bean
@EnableTransactionManagement // 启注解事务管理，
@MapperScan(basePackages = {"com.compant.project.dao.*.*"}) //解决多个dao层无法注入bean的问题
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

