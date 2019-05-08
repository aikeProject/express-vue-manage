const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const log4js = require('./config/log4js');
const errLogger = log4js.getLogger('err');
const othLogger = log4js.getLogger('oth');
// token认证
const passport = require('passport');

// api users.js
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const files = require('./routes/api/files');

// DB config
// const db = require('./config/keys').local.mongoURL;
const db = require('./config/keys').server.mongoURL;

// Connect to mongodb
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => {
        othLogger.info('连接 Mongodb 成功');
    })
    .catch(err => errLogger.error(err));

const app = express();

// 使用中间件实现允许跨域
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     next();
// });

// 请求日志
// log4js.useLogger(app, logger);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'files')));

// 认证处理
require('./config/passport')(passport);

// passport init初始化
app.use(passport.initialize());

// api
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/files', files);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// console.log('-process.env-', app.get('env'));

module.exports = app;
