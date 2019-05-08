/*
 * @Author: 成雨
 * @Date: 2018-12-08 13:19:22 
 * @Last Modified by: 成雨
 * @Last Modified time: 2018-12-08 16:56:47
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
    avatarKey: {
        type: String,
    },
    avatarDefault: {
        type: String,
    },
    identity: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});


module.exports = User = mongoose.model('users', UserSchema);