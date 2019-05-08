/*
 * @Author: 成雨
 * @Date: 2018-12-08 13:12:19 
 * @Last Modified by: 成雨
 * @Last Modified time: 2018-12-08 16:56:16
 */

const express = require('express');
const router = express.Router();
// 密码加密
const bcrypt = require('bcrypt');
// 全球公认头像
const gravatar = require('gravatar');
// 生成token
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const passport = require('passport/lib');
const User = require('../../mode/user.js');
const keys = require('../../config/keys');
const CY = require('../../utils/CY');
const config = require('../../config/keys');
const log4js = require('../../config/log4js');
const errlogger = log4js.getLogger('err');
const othlogger = log4js.getLogger('oth');
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
                return CY.response(res, {
                    status: 400,
                    json: {
                        success: false,
                        errorMsg: '邮箱已经存在!!!',
                        errorCode: 400,
                    }
                });
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
                    identity: req.body.identity,
                });

                // 加密密码
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        // Store hash in your password DB.
                        errlogger.error(err);
                        if (err) throw err;

                        newUser.password = hash;

                        newUser.save()
                            .then(user => (CY.response(res, {
                                    json: {
                                        model: user
                                    }
                                })
                            ))
                            .catch(err => errlogger.error(err));
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
    othlogger.info('/login', req.body);
    // 查询数据库
    User.findOne({
        email
    })
        .then(user => {
            if (!user) {
                return CY.response(res, {
                    status: 400,
                    json: {
                        success: false,
                        errorMsg: '用户名不存在!!!',
                    }
                });
            }

            // 密码匹配
            // Load hash from your password DB.
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        othlogger.info(user);
                        const rule = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                            identity: user.identity,
                            email: user.email
                        };

                        jwt.sign(rule, keys.secretOrKey, {
                            expiresIn: 86400 // 24 * 60 * 60 一天
                        }, (err, token) => {
                            if (err) throw err;
                            return CY.response(res, {
                                json: {
                                    success: true,
                                    model: 'Bearer ' + token,
                                }
                            });
                        });
                    } else {
                        return CY.response(res, {
                            status: 400,
                            json: {
                                success: false,
                                errorMsg: '密码错误',
                                errorCode: 400,
                            }
                        });
                    }
                });
        })
});

/**
 * $route POST api/users/edit
 * @desc 修改
 * @access public
 */
router.post('/edit', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "./files";
    form.parse(req, function (err, fields, files) {
        if (err) throw err;
        const setFields = {};
        if (!fields.id) return;
        if (fields.name) setFields.name = fields.name;
        if (fields.email) setFields.email = fields.email;
        // 没上传文件
        if (!files.file) {
            // 新旧密码存在 才修改密码
            if (fields.passwordOld && fields.passwordNew) {
                setFields.password = fields.passwordNew;
                User.findById(fields.id)
                    .then((user) => {
                        bcrypt.compare(fields.passwordOld, user.password)
                            .then(isMatch => {
                                if (isMatch) {
                                    User.update({
                                        _id: fields.id,
                                    }, setFields).then(() => {
                                        CY.response(res, {json: {model: 'true'}});
                                    }).catch(() => {
                                        CY.response(res, {
                                            status: 400,
                                            json: {success: false, errorMsg: '修改失败', errorCode: 400}
                                        });
                                    });
                                } else {
                                    return CY.response(res, {
                                        status: 400,
                                        json: {
                                            success: false,
                                            errorMsg: '旧密码不匹配',
                                            errorCode: 400,
                                        }
                                    });
                                }
                            });
                    }).catch((err) => {
                    errlogger.error(err);
                    CY.response(res, {
                        status: 400,
                        json: {
                            success: false,
                            errorMsg: '修改失败',
                            errorCode: 400,
                        }
                    });
                });
            } else {
                User.update({
                    _id: fields.id,
                }, setFields).then(() => {
                    CY.response(res, {json: {model: true}});
                }).catch(() => {
                    CY.response(res, {
                        status: 400,
                        json: {success: false, errorMsg: '修改失败', errorCode: 400}
                    });
                });
            }
        } else {
            const oldPath = files.file.path;
            const key = (new Date() * 1) + '-' + parseInt(Math.random() * 8999 + 10000) + '-' + files.file.name;
            const newPath = path.join(path.dirname(oldPath), key);
            fs.rename(oldPath, newPath, (err) => {
                if (err) throw err;
                setFields.avatar = key;
                User.update({
                    _id: fields.id,
                }, setFields).then(() => {
                    CY.response(res, {json: {model: true}});
                }).catch(() => {
                    CY.response(res, {
                        status: 400,
                        json: {success: false, errorMsg: '修改失败', errorCode: 400}
                    });
                });
            });
        }
    });
});

/**
 * $route GET api/users/current
 * @desc token 认证
 * @access Private
 */
router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    CY.response(res, {
        json: {
            model: {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email,
                identity: req.user.identity,
            }
        }
    });
});

module.exports = router;