/*
 * @Author: 成雨 
 * @Date: 2018-12-08 17:01:15 
 * @Last Modified by: 成雨
 * @Last Modified time: 2018-12-08 17:23:18
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProFileSchema = new Schema({
    type: {
        type: String,
    },
    describe: {
        type: String,
    },
    income: {
        type: String,
        required: true,
    },
    expend: {
        type: String,
        required: true,
    },
    cash: {
        type: String,
        required: true,
    },
    remark: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});


module.exports = Profile = mongoose.model('profile', ProFileSchema);