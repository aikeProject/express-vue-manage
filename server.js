/*
 * @Author: 成雨
 * @Date: 2018-12-08 12:29:15 
 * @Last Modified by: 成雨
 * @Last Modified time: 2018-12-08 17:39:51
 */

const express = require('express');
const mongoose = require('mongoose');
const log4js = require('log4js');
log4js.configure('./config/log4js.json');
const logger = log4js.getLogger('server');

// 解析参数
const bodyParser = require('body-parser');
// token认证
const passport = require('passport');
const app = express();

// api users.js
const users = require('./routers/api/users');
const profiles = require('./routers/api/profiles');

// DB config
const db = require('./config/keys').local.mongoURL;

// Connect to mongodb
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => {
        logger.info('连接 Mongodb 成功');
    })
    .catch(err => logger.error(err));

// 使用中间件实现允许跨域
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     next();
// });

app.use(log4js.connectLogger(log4js.getLogger("http"), {level: 'auto'}));

// 使用 bodu-parser中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 认证处理
require('./config/passport')(passport);

// passport init初始化
app.use(passport.initialize());

// api
app.use('/api/users', users);
app.use('/api/profiles', profiles);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    logger.info(`Server port ${port}`);
});