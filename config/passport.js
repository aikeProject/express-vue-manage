/*
 * @Author: 成雨
 * @Date: 2018-12-08 14:55:26 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-08 15:24:46
 */
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log('jwt_payload 认证返回值---：', jwt_payload);

        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch(err => console.log(err));
    }));
};