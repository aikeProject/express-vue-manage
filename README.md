###### express vue

###### 项目运行
-   `npm run dev` 开发运行
-   `npm run publish-install` 发布前安装依赖
-   `npm run publish` 发布启动服务

###### express环境搭建
-   `npm install express-generator -g` 安装`express`项目生成器 [express](http://www.expressjs.com.cn/starter/generator.html)
-   `express express-vue-manage` 初始化项目`express-vue-manage`
-   `npm install -g @vue/cli` 安装`vue-cli` [vue-cli](https://cli.vuejs.org/zh/guide/installation.html)
-   `vue create client` vue项目初始化`client`
-   项目目录结构

```
|-- express-vue-manage
    |-- app.js
    |-- Dockerfile docker部署
    |-- main.js 拷贝文件，将打包好的vue拷贝到express的public目录
    |-- package.json
    |-- README.md
    |-- bin
    |   |-- www
    |-- client vue客户端
    |   |-- .gitignore
    |   |-- babel.config.js
    |   |-- package.json
    |   |-- README.md
    |   |-- vue.config.js
    |   |-- yarn.lock
    |   |-- public
    |   |   |-- favicon.ico
    |   |   |-- index.html
    |   |   |-- css
    |   |   |   |-- font-awesome.min.css
    |   |   |   |-- reset.css
    |   |   |-- fonts
    |   |       |-- fontawesome-webfont.eot
    |   |       |-- fontawesome-webfont.svg
    |   |       |-- fontawesome-webfont.ttf
    |   |       |-- fontawesome-webfont.woff
    |   |       |-- fontawesome-webfont.woff2
    |   |       |-- FontAwesome.otf
    |   |-- src
    |       |-- App.vue
    |       |-- config.js
    |       |-- http.js
    |       |-- main.js
    |       |-- router.js
    |       |-- store.js
    |       |-- assets
    |       |   |-- 404.gif
    |       |   |-- bg.jpg
    |       |   |-- logo.png
    |       |   |-- showcase.png
    |       |-- components
    |       |   |-- AsideNav.vue
    |       |   |-- DialogFound.vue
    |       |   |-- HeaderNav.vue
    |       |-- utils
    |       |   |-- CY.js
    |       |-- views
    |           |-- 404.vue
    |           |-- Foundlist.vue
    |           |-- Home.vue
    |           |-- index.vue
    |           |-- Infoshow.vue
    |           |-- Login.vue
    |           |-- Register.vue
    |-- config
    |   |-- keys.js
    |   |-- log4js.js
    |   |-- passport.js
    |-- logs 日志文件
    |-- mode 模型
    |   |-- profiles.js
    |   |-- user.js
    |-- public 静态资源
    |-- routes 路由
    |   |-- api
    |       |-- profiles.js
    |       |-- users.js
    |-- utils
    |   |-- CY.js
    |-- views
        |-- error.jade
        |-- index.jade
        |-- layout.jade
```

-   `passport` token认证 [passport](https://github.com/jaredhanson/passport)
-   `mongoose` 操作mongodb [mongoose](https://github.com/Automattic/mongoose)
-   `bcrypt` 加密 [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
-   `gravatar` 全球公认头像 [gravatar](https://github.com/emerleite/node-gravatar)
-   `jsonwebtoken` 生成token [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
-   `log4js` 日志 [log4js](https://github.com/log4js-node/log4js-node)

###### 部署
-   通过docker部署 [daocloud](https://dashboard.daocloud.io/)

```dockerfile
FROM node

MAINTAINER ChengYu "https://github.com/aikeProject"

# 优先将 ./package.json  复制到镜像中，预先加载第三方依赖
COPY . /app/

WORKDIR /app

RUN npm run publish-install

# 暴露3000端口
EXPOSE 3000

CMD npm run publish
```