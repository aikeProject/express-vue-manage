/*
 * @Author: 成雨
 * @Date: 2018-12-08 13:19:22 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-08 13:45:50
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});


module.exports = User = mongoose.model('users', UserSchema);