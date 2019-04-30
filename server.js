/*
 * @Author: 成雨
 * @Date: 2018-12-08 12:29:15 
 * @Last Modified by: 成雨
 * @Last Modified time: 2018-12-08 17:39:51
 */

const express = require('express');
const mongoose = require('mongoose');
const log4js = require('./config/log4js');
const logger = log4js.getLogger();
const errLogger = log4js.getLogger('err');
const othLogger = log4js.getLogger('oth');

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
        othLogger.info('连接 Mongodb 成功');
    })
    .catch(err => errLogger.error(err));

// 使用中间件实现允许跨域
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     next();
// });

// 请求日志
log4js.useLogger(app, logger);

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
    othLogger.info(`Server port ${port}`);
});