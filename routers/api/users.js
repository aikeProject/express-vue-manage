/*
 * @Author: 成雨
 * @Date: 2018-12-08 13:12:19 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-08 13:17:41
 */

const express = require('express');
const router = express.Router();

/**
 * $route GET api/users/test
 * @desc 返回亲求的json数据
 * @access public
 */
router.get('/test', (req, res) => {
    res.json({
        msg: 'login works',
    })
});

module.exports = router;