/*
 * @Author: 成雨
 * @Date: 2018-12-08 12:29:15 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-08 12:38:59
 */

 const express = require('express');
 const app = express();

app.get('/', (req, res) => {
    res.send('hello world');
});

 const port = process.env.PORT || 5000;

 app.listen(port, () => {
     console.log(`Server port ${port}`);
 });