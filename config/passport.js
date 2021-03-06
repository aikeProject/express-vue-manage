/*
 * @Author: 成雨
 * @Date: 2018-12-08 14:55:26
 */
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys');
const log4js = require('./log4js');
const errlogger = log4js.getLogger('err');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch(err => errlogger.error(err));
    }));
};