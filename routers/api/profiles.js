/*
 * @Author: 成雨 
 * @Date: 2018-12-08 17:06:10 
 * @Last Modified by: 成雨
 * @Last Modified time: 2018-12-08 22:25:12
 */

const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profiles = require('../../mode/profiles');

/**
 * $route POST api/profiles/add
 * @desc 新建信息接口
 * @access Pravite
 */
router.post('/add', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const profileFields = {};

    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.incode) profileFields.incode = req.body.incode;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;
    console.log(profileFields);
    new Profiles(profileFields)
        .save()
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
});


/**
 * $route POST api/profiles
 * @desc 获取所有信息
 * @access Pravite
 */
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profiles.find()
        .then((result) => {
            if (!result) {
                return res.status(4040).json('没有任何内容');
            }
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
});


/**
 * $route POST api/profiles
 * @desc 获取单个信息
 * @access Pravite
 */
router.get('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profiles.findOne({
            _id: req.params.id
        })
        .then((result) => {
            if (!result) {
                return res.status(4040).json('没有任何内容');
            }
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
});


module.exports = router;