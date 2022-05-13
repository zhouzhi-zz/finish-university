import axios from 'axios'
import Qs from 'Qs'

const instance = axios.create({
  // baseURL: 'http://47.107.253.189:7001'
  baseURL: process.env.NODE_ENV === 'development' ? '//localhost:7001' : 'http://43.138.212.238:7001'
  // baseURL: 'http://43.138.212.238:7001'
})

// 响应拦截
// instance.interceptors.response.use(function(response) {
//     // 未登录时，后端直接返回未登录 重置到登录页
//     if (typeof response.data === '未登录') {
//       window.location.href = '/login/index.html'
//       return false
//     }
//     return response
//   }, function(error) {
//     return Promise.reject(error)
//   })

// 请求拦截
// instance.interceptors.request.use(req => {
//   req.headers.token = localStorage.getItem('token')
//   req.headers.account = localStorage.getItem('account')
//   req.headers.docToken = localStorage.getItem('docToken')
//   return req
// })

// instance.interceptors.response.use(req => {
//   if(req.data.code !== -1) { // token失效
//     return req
//   }
//   // window.location.href = '/'
// })

// get
export const get = (url, params) => {
  return instance.get(url, {
    params
  }).then((response) => {
    return Promise.resolve(response?.data || {})
  }).catch(function(error) {
    return Promise.reject(error)
  })
}

// post请求

// 类型转换
const getContentType = (opts = {}) => {
  let type = 'application/x-www-form-urlencoded'
  if (opts.dataType === 'JSON') {
    type = 'application/json'
  }
  if (opts.dataType === 'FORM_DATA') {
    type = 'multipart/form-data'
  }
  return type
}
export const post = (url, params, opts = {}) => {
  return instance({
    url: url,
    method: 'post',
    headers: {
      'Content-Type': getContentType(opts)
    },
    transformRequest: [function(data, header) {
      // 对 data 进行任意转换处理
      if (opts.dataType === 'JSON') {
        if (opts.reqType === 'TCvideo') {
          console.log('reqType', header)
          delete header.common['X-Requested-With']
        }
        return JSON.stringify(data)
      } else if (opts.dataType === 'FORM_DATA') {
        return data
      } else {
        return Qs.stringify(data)
      }
    }],
    data: params
  }).then((response) => {
    if (response.data.status === 200 || response.data.state === 1) {
      return Promise.resolve(response.data || {})
    } else {
      return Promise.resolve(response.data || {})
    }
  }).catch(function(error) {
    return Promise.reject(error)
  })
}

// put
export const put = (url, params) => {
  return instance({
    url: url,
    method: 'put',
    data: params
  }).then((response) => {
    if (response.data.status === 200 || response.data.state === 1) {
      return Promise.resolve(response.data || {})
    } else {
      return Promise.resolve(response.data || {})
    }
  }).catch(function(error) {
    return Promise.reject(error)
  })
}

// delete
export const del = (url, params) => {
  return instance({
    url: url,
    method: 'delete',
    data: params
  }).then((response) => {
    if (response.data.status === 200 || response.data.state === 1) {
      return Promise.resolve(response.data || {})
    } else {
      return Promise.resolve(response.data || {})
    }
  }).catch(function(error) {
    return Promise.reject(error)
  })
}
