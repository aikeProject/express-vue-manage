/*
 * @Author: 成雨
 * @Date: 2018-12-08 12:29:15 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-08 13:41:22
 */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// api users.js
const users = require('./routers/api/users');

// DB config
const db = require('./config/keys').mongoURL;

// Connect to mongodb
mongoose.connect(db)
    .then(() => {
        console.log('连接 Mongodb 成功');
    })
    .catch( err => console.log(err));

app.get('/', (req, res) => {
    res.send('hello world');
});

// 使用 bodu-parser中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server port ${port}`);
});