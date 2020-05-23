import axios from 'axios';
import Vue from 'vue'

axios.defaults.timeout = 50000;
axios.defaults.baseURL = '';

// var domain = "http://st.smartservice.bjev.com.cn/gateway-console/v1/";
// const domain = "http://139.159.203.230:9401/v1/";
var domain = "http://111.202.228.62:9102/gateway-console/v1/"
// var domain = "http://localhost:9102/gateway-console/v1/"
//http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    let token = localStorage.token;
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'accept': 'application/json;charset=UTF-8',
    };
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    // if(token){
    //   config.params = {'token':token}
    // }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errCode == 2) {
      router.push({
        path: "/login",
        querry: {redirect: router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

function requestAbnormityHandle(that,err) {
  console.log("err",err.request,err.response)
  var statusCode = 0;
  var statusMsg = '';
  if (err.request) {
    statusCode = err.request.status;
    statusMsg = err.request.responseText;
  } else if (err.response) {
    statusCode = err.response.status;
    statusMsg = err.response.data;
  }
  if (statusCode == 401) {
    that.$message.destroy();
    that.$message.error('登录已过期');
    setTimeout(()=>{
      that.$router.push({
        path:'/login'
      })
    },1000)
  }
  if (statusCode == 400) {
    that.$message.destroy();
    that.$message.error(statusMsg||'请求失败')
  }
  if (statusCode == 404) {
    that.$message.destroy();
    that.$message.error(statusMsg||'接口不存在')
  }
  if (statusCode == 500) {
    that.$message.destroy();
    that.$message.error(statusMsg||'服务器异常')
  }
}

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    var currentDomain = domain;
    if (url.trim().indexOf("http") == 0) {
      currentDomain = ''
    }
    axios.get(currentDomain + url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
        requestAbnormityHandle(this,err)
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
    var currentDomain = domain;
    if (url.trim().indexOf("http") == 0) {
      currentDomain = ''
    }
    axios.post(currentDomain + url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
        requestAbnormityHandle(this,err)
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
        resolve(response.data);
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
    // this.$message.destroy();
    // console.log(this.$message.loading)
    // const hide = this.$message.loading("提交中", 0);
    axios.put(domain + url, data)
      .then(response => {
        resolve(response.data);
        // setTimeout(hide,0);
      }, err => {
        reject(err);
        requestAbnormityHandle(err);
        // setTimeout(hide,0);
      })
  })
}

export function deletes(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(domain + url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
        requestAbnormityHandle(this,err)
      })
  })
}

Vue.prototype.$post = post;
Vue.prototype.$get = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$delete = deletes;
// Vue.prototype.$qs = require('qs');