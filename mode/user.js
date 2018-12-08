/*
 * @Author: 成雨
 * @Date: 2018-12-08 13:19:22 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-08 13:23:18
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: string,
        required: true,
    },
    email: {
        type: string,
        required: true,
    },
    password: {
        type: string,
        required: true,
    },
    avatar: {
        type: string,
    },
    date: {
        type: Date,
        default: Date.now
    },
});


module.exports = User = mongoose.model('users', UserSchema);