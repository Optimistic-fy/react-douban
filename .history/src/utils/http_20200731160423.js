import axios from 'axios';
import { Toast } from 'antd-mobile';

// function startLoading(text = '加载中...') {
//     Toast.loading(text, 0);
// }

// function endLoading() {
//     Toast.hide();
// }

// //声明一个对象用于存储请求个数
// let needLoadingRequestCount = 0;

// function showFullScreenLoading() {
//   if (needLoadingRequestCount === 0) {
//     startLoading();
//   }
//   needLoadingRequestCount++;
// }

// function tryHideFullScreenLoading() {
//   if (needLoadingRequestCount <= 0) return;
//   needLoadingRequestCount--;
//   if (needLoadingRequestCount === 0) {
//     endLoading();
//   }
// }

// 请求超时时间
// axios.defaults.timeout = 10000;

// 请求来源区分
// axios.defaults.headers.common["App-Id"] = '73x94y71svg';

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use((config) => {
//   showFullScreenLoading()
//   const appId = store.state.appid;
//   const accessToken = store.state.userInfo.accessToken || localStorage.getItem('Access-Token');
//   const openid = store.state.userInfo.openid || localStorage.getItem('Openid');
//   const snowflakeId = store.state.userInfo.snowflakeId || localStorage.getItem('SnowlakeId');
//   appId && (config.headers["App-Id"] = appId);
//   accessToken && (config.headers["accessToken"] = accessToken);
//   openid && (config.headers["openid"] = openid);
//   snowflakeId && (config.headers["uid"] = snowflakeId);
  return config;
}, (err) => {
  Toast.offline('请求超时!', 1);
  tryHideFullScreenLoading()
  return Promise.reject(err);
});

// 响应拦截器
axios.interceptors.response.use((response) => {
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
}, (error) => {
  tryHideFullScreenLoading()
  if (error.response.status) {
    switch (error.response.status) {
      // 401: 未登录                 
      case 401:
        this.props.history.push('/login')
        break;
        // 403 token过期          
      case 403:
        Toast.offline('登录过期了！', 1);
        // 清除token  
        localStorage.clear() //清楚所有数据
        this.props.history.push('/login')
        break;
        // 404请求不存在                
      case 404:
        Toast.fail('请求不存在！', 1);
        break;
        // 其他错误，直接抛出错误提示                
      default:
          Toast.fail(error.response.data.message, 1);
    }
    return Promise.reject(error.response);
  }
})
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err)
      })
  })
}