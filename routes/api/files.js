/**
 * @author 成雨
 * @date 2019/5/6 0006$
 * @Description: upload file
 */

const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const CY = require('../../utils/CY');
const config = require('../../config/keys');
router.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "./files";
    form.parse(req, function (err, fields, files) {
        if (err) throw err;
        const oldPath = files.file.path;
        const key = (new Date() * 1) + '-' + parseInt(Math.random() * 8999 + 10000) + '-' + files.file.name;
        const newPath = path.join(path.dirname(oldPath), key);
        fs.rename(oldPath, newPath, (err) => {
            if (err) throw err;
            CY.response(res, {
                json: {
                    model: {
                        key: key,
                        url: config.BASE_URL + key
                    }
                }
            });
        });
    });
});

module.exports = router;