/*
 * @Author: 成雨
 * @Date: 2018-12-08 12:29:15 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-08 13:15:37
 */

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// DB config
const db = require('./config/keys').mongoURL;

// api users.js
const users = require('./routers/api/users');
app.use('/api/user', users);

// Connect to mongodb
mongoose.connect(db)
    .then(() => {
        console.log('连接 Mongodb 成功');
    })
    .catch( err => console.log(err));

app.get('/', (req, res) => {
    res.send('hello world');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server port ${port}`);
});