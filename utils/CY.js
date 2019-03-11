/**
 * User: 成雨
 * Date: 2019/3/11 0011
 * Time: 22:12
 */
// 统一的请求返回值模版

const model = {
    success: true,
    errorMsg: '',
    errorCode: '',
    model: '',
    attributes: ''
};

function modelData(obj) {
    obj = obj || {};
    return Object.assign({}, model, obj);
}

// 统一的处理返回
function response(res, obj) {
    obj = obj || {};
    const json = modelData(obj.json || {});
    const value = obj.value ? obj.value : 200;
    return res.status(value).json(json);
}

module.exports = {
    modelData,
    response
};