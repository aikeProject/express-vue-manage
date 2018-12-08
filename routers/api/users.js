/*
 * @Author: 成雨
 * @Date: 2018-12-08 13:12:19 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-08 15:25:46
 */

const express = require('express');
const router = express.Router();
// 密码加密
const bcrypt = require('bcrypt');
// 全球公认头像
const gravatar = require('gravatar');
// 生成token
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../mode/user.js');
const keys = require('../../config/keys');
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
 * @desc 注册
 * @access public
 */
router.post('/register', (req, res) => {
    // 查询数据库中是否有邮箱

    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                return res.status(400).json({
                    email: '邮箱已被注册'
                })
            } else {
                var avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar,
                });

                // 加密密码
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
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

/**
 * $route POST api/users/login
 * @desc 登陆 返回token jwt passport
 * @access public
 */
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // 查询数据库
    User.findOne({
            email
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    email: '用户不存在！',
                });
            }

            // 密码匹配
            // Load hash from your password DB.
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const rule = {id: user.id, name: user.name};

                        jwt.sign(rule, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
                            if (err) throw err;
                            res.json({
                                success: true,
                                token: 'Bearer ' + token,
                            });
                        });
                    } else {
                        return res.status(400).json({
                            password: '密码错误！'
                        })
                    }
                });
        })
});

/**
 * $route GET api/users/current
 * @desc token 认证
 * @access Private
 */
 router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
    });
 });

module.exports = router;