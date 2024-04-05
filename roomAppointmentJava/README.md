## 基于Java+Springboot+Vue的餐厅点餐系统(源代码+数据库+4000字文档)131

## 一、系统介绍
本项目前后端分离，分为管理员、用户两种角色

### 1、用户：
- 注册、登录、点餐、订单查询、个人信息
### 2、管理员：
- 菜单管理、用户管理、角色管理、分类管理、菜品管理、订单管理、标签管理、座位管理、客服管理、订单管理

## 二、所用技术

后端技术栈：

- Springboot
- MybatisPlus
- Mysql
- Maven
- redis
- springSecurity
- Jwt

前端技术栈：

- Vue 
- Vue-router 
- axios 
- element-ui

## 三、环境介绍

基础环境 :IDEA/eclipse, JDK1.8, Mysql5.7及以上,Maven3.6, node14，navicat

所有项目以及源代码本人均调试运行无问题 可支持远程调试运行

## 四、页面截图
文档截图
![contents](./picture/picture00.png)
### 1、用户
![contents](./picture/picture0.png)
![contents](./picture/picture1.png)
![contents](./picture/picture2.png)
![contents](./picture/picture3.png)
![contents](./picture/picture4.png)
![contents](./picture/picture5.png)
![contents](./picture/picture6.png)
![contents](./picture/picture7.png)
![contents](./picture/picture8.png)
![contents](./picture/picture9.png)

### 2、管理员：
![contents](./picture/picture10.png)
![contents](./picture/picture11.png)
![contents](./picture/picture12.png)
![contents](./picture/picture13.png)
![contents](./picture/picture14.png)
![contents](./picture/picture15.png)
![contents](./picture/picture16.png)
![contents](./picture/picture17.png)
![contents](./picture/picture18.png)
![contents](./picture/picture19.png)
![contents](./picture/picture20.png)
![contents](./picture/picture21.png)
![contents](./picture/picture22.png)
![contents](./picture/picture23.png)

## 五、浏览地址

后台访问地址：http://localhost:8080/
- 管理员账号/密码：admin/123456

## 六、部署教程

1. 使用Navicat或者其它工具，在mysql中创建对应名称的数据库，并执行项目的sql

2. 使用IDEA/Eclipse导入order_food项目，导入时，若为maven项目请选择maven; 等待依赖下载完成

3. 修改ruoyi-admin目录的resources目录下面application-dev.yml里面的数据库配置,小程序账号配置

4. src/main/java/com/xlf/Xlf_main.java启动后端

5. vscode或idea打开order_food_vue_admin项目

6. 在编译器中打开terminal，执行npm install 依赖下载完成后执行 npm run serve,执行成功后会显示后台管理访问地址

7. hbuilder打开orderFoodApp项目, 修改manifest.json里面的微信小程序配置AppId(从注册的微信小程序账号里面复制)

8. hbuilder点击运行-运行到小程序模拟器-微信开发者工具，然后会打开微信开发者工具，小程序页面就展示出来了(如果没有微信小程序开发工具也可以运行到浏览器打开)

