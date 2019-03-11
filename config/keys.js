/*
 * @Author: 成雨 
 * @Date: 2018-12-08 12:55:48 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-08 14:39:39
 */

module.exports = {
    // 本地mongodb数据库
    local: {
        mongoURL: 'localhost:27017',
    },
    // 远程mongodb数据库
    server: {
        mongoURL: 'mongodb://test:abcd1234@ds129454.mlab.com:29454/restful-api-product',
        secretOrKey: 'secret',
    }
};