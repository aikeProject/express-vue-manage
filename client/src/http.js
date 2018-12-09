/*
 * @Author: 成雨 
 * @Date: 2018-12-09 16:34:58 
 * @Last Modified by: 成雨
 * @Last Modified time: 2018-12-09 17:48:27
 */

import axios from 'axios';
import {Loading, Message} from 'element-ui';
import router from './router';

let loading;
function startLoad() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    });
}

function endLoad() {
    loading.close();
}

 // 请求拦截
 axios.interceptors.request.use(config => {
     // 加载动画
     startLoad();
     if (localStorage.eleToken) {
        // 设置统一的请求头
        config.headers.Authorization = localStorage.eleToken;
     }
     return config;
 }, error => {
    return Promise.reject(error);
 });

 // 响应拦截
 axios.interceptors.response.use(res => {
    // 结束加载动画
    endLoad();
    return res;
 }, error => {
    endLoad();
    Message.error(error.response.data);

    // 获取错误状态码
    const {status} = error.response;
    if (status == 401) {
        Message.error('token失效，请重新登录！');

        // 清楚token
        localStorage.removeItem('eleToken');

        router.push('/login');
    }

    return Promise.reject(error);
 });

 export default axios;