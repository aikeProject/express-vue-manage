/*
 * @Author: 成雨
 * @Date: 2018-12-08 13:12:19 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-08 14:09:49
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const User = require('../../mode/user.js');

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

/**
 * $route POST api/users/register
 * @desc 返回亲求的json数据
 * @access public
 */
router.post('/register', (req, res) => {
    // 查询数据库中是否有邮箱

    User.findOne({email:req.body.email})
        .then((user) => {
            if (user) {
                return res.status(400).json({email: '邮箱已被注册'})
            } else {
                var avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar,
                });
                
                // 加密密码
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        // Store hash in your password DB.
                        if (err) throw err;

                        newUser.password = hash;

                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

module.exports = router;