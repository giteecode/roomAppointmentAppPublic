import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['accessToken'] = getToken();
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    let { code, data, message, status } = res;
    if (status == true) {

      if (code == 800032 || code == 800005) {
        Message({
          message: '用户信息已过期',
          type: 'error',
          duration: 5 * 1000
        })
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
        return Promise.reject(new Error(res.msg || 'Error'))
      }
      else if (code == 800000) {
        Message({
          message: '用户信息已过期',
          type: 'error',
          duration: 5 * 1000
        })

        return Promise.reject(new Error(res.msg || 'Error'))
      }
      else if (code > 200) {
        Message({
          message: message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(message))
      }
      return res
    }
    else {
      if (code == 400) {
        let values = Object.values(res.data);
        let array = [];
        for (let index in values) {
          array = [...array, values[index]];
        }
        Message({
          message: '参数错误:' + array.join(","),
          type: 'error',
          duration: 5 * 1000
        })
        return res
      }
      else if (code == 403) {
        Message({
          message: '没有此操作权限',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error('权限不足'))
      }
      else if (code == 800032) {
        Message({
          message: '用户信息已过期',
          type: 'error',
          duration: 5 * 1000
        })
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
        return Promise.reject(new Error(res.msg || 'Error'))
      }
      else if (code == 500) {
        Message({
          message: res.msg,
          type: 'error',
          duration: 5 * 1000
        })
        return res
      }

      else {
        return Promise.reject(new Error(res.msg || 'Error'))
      }
    }

  },
  error => {
    console.log(error.message);
    if (error.message.indexOf("401") != -1) {

      Message({
        message: '用户信息已过期',
        type: 'error',
        duration: 5 * 1000
      })
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
      return Promise.reject(new Error(error || 'Error'))
    }
    else if (error.message.indexOf("403") != -1) {
      Message({
        message: '用户没有该权限',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(new Error(error || 'Error'))
    }
    else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
