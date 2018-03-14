//封装所有api请求
import axios from 'axios';
import qs from 'qs';

export const BASE_ROOT = (process.env.NODE_ENV === 'production')
    ? ''
    : 'http://localhost:8080/api/'; //此条开发时会被设置成代理

axios.defaults.timeout = 20000;
axios.defaults.baseURL = BASE_ROOT;

//POST传参序列化
axios.interceptors.request.use((config) => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
  if (!res.data || res.data.code !== 0) {
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  return Promise.reject(error);
});

function fetch(url, params, method = 'post') {
  return new Promise((resolve, reject) => {
    switch (method) {
      case 'get':
        axios.get(url, params).then(
            response => {
              resolve(response.data);
            },
            err => {
              reject(err);
            },
        ).catch(
            (error) => {
              reject(error);
            },
        );
        break;
      default: //默认用post方式请求
        axios.post(url, params).then(
            response => {
              resolve(response.data);
            },
            err => {
              reject(err);
            },
        ).catch(
            (error) => {
              reject(error);
            },
        );
    }
  });
}

export default {};