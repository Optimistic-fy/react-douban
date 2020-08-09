/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import {
  Loading,
  Message
} from 'element-ui';
import store from '../store/index';
import router from '../router/index';
import {
  getLocalStorage
} from './public'

// loading框设置局部刷新，且所有请求完成后关闭loading框
let loading;

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "Loading...",
    background: 'rgba(0, 0, 0, 0.7)',
    target: document.querySelector('.loading-area') //设置加载动画区域
  });
}

function endLoading() {
  loading.close();
}

//声明一个对象用于存储请求个数
let needLoadingRequestCount = 0;

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}

// 请求超时时间
// axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
  config => {
    showFullScreenLoading()
    const token = store.state.token || getLocalStorage('token');
    token && (config.headers["Authorization"] = token);
    return config;
  },
  error => {
    Message.error({
      message: '请求超时!'
    });
    tryHideFullScreenLoading()
    return Promise.error(error);
  })

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      setTimeout(function () {
        tryHideFullScreenLoading()
      }, 300)
      return Promise.resolve(response);
    } else {
      setTimeout(function () {
        tryHideFullScreenLoading()
      }, 300)
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况    
  error => {
    tryHideFullScreenLoading()
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录                 
        case 401:
          localStorage.clear()
          router.replace({
            path: '/login',
          });
          break;
          // 404请求不存在                
        case 404:
          Message.error({
            message: '网络请求不存在'
          });
          break;
          // 其他错误，直接抛出错误提示                
        default:
          Message.error({
            message: error.response.data.msg
          });
      }
      return Promise.reject(error.response);
    }
  }
);
/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
