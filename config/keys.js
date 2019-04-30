/*
 * @Author: 成雨 
 * @Date: 2018-12-08 12:55:48 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-08 14:39:39
 */

module.exports = {
    // 本地mongodb数据库
    local: {
        mongoURL: 'mongodb://localhost/vue-manage',
    },
    // 远程mongodb数据库
    server: {
        mongoURL: 'mongodb://admin:admin0402@ds149616.mlab.com:49616/vue-manage',
    },
    secretOrKey: 'secret',
};