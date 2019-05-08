/**
 * User: 成雨
 * Date: 2019/3/11 0011
 * Time: 23:10
 */

import axios from 'axios';
import {Message} from 'element-ui';

const CY = {
    GET(url, data, options = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, data).then(res => {
                const data = res.data;
                const model = data.model || '';
                if (data.success) {
                    resolve(model);
                } else {
                    if (!options.error) {
                        Message.error(data.errorMsg || '链接超时请重试');
                    } else {
                        reject(model);
                    }
                }
            });
        });
    },
    POST(url, data, options = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, data).then(res => {
                const data = res.data;
                const model = data.model || '';
                if (data.success) {
                    resolve(model);
                } else {
                    if (!options.error) {
                        Message.error(data.errorMsg || '链接超时请重试');
                    } else {
                        reject(model);
                    }
                }
            });
        });
    },
    isEmpty(value) {
        return (
            value === undefined ||
            value === null ||
            (typeof value === "object" && Object.keys(value).length === 0) ||
            (typeof value === "string" && value.trim().length === 0)
        );
    }
};

export default CY;