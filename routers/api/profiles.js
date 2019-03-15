/*
 * @Author: 成雨 
 * @Date: 2018-12-08 17:06:10 
 * @Last Modified by: 成雨
 * @Last Modified time: 2018-12-08 22:38:58
 */

const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profiles = require('../../mode/profiles');
const CY = require('../../utils/CY');
const log4js = require('../../config/log4js');
const errlogger = log4js.getLogger('err');
const othlogger = log4js.getLogger('oth');
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

    new Profiles(profileFields)
        .save()
        .then((result) => {
            CY.response(res, {
                json: {
                    model: result
                }
            });
        }).catch((err) => {
        errlogger.error(err);
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
                return CY.response(res, {
                    status: 404,
                    json: {
                        success: false,
                        errorMsg: '暂无内容',
                        errorCode: 404,
                    }
                });
            }
            CY.response(res, {json: {model: result}});
        }).catch((err) => {
        errlogger.error(err);
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
                return CY.response(res, {
                    status: 404,
                    json: {
                        success: false,
                        errorMsg: '暂无内容',
                        errorCode: 404,
                    }
                });
            }
            CY.response(res, {json: {model: result}});
        }).catch((err) => {
        errlogger.error(err);
    });
});

/**
 * $route POST api/profiles/edit
 * @desc 编辑信息接口
 * @access Pravite
 */
router.post('/edit/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const profileFields = {};

    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.incode) profileFields.incode = req.body.incode;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;

    Profiles.findOneAndUpdate({
        _id: req.params.id,
    }, {
        $set: profileFields
    }, {
        new: true
    }).then((result) => {
        CY.response(res, {json: {model: result}});
    }).catch((err) => {
        errlogger.error(err);
    });
});

/**
 * $route POST api/profiles
 * @desc 删除
 * @access Pravite
 */
router.delete('/delete/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profiles.findOneAndRemove({
        _id: req.params.id
    })
        .then((result) => {
            result.save().then(profile => CY.response(res, {json: {model: profile}}));
        }).catch((err) => {
        CY.response(res, {
            status: 404,
            json: {
                success: false,
                errorMsg: '删除失败',
                errorCode: 404,
            }
        });
        errlogger.error(err);
    });
});

module.exports = router;