import { get, post } from './config'

// const test = () => get('http://t.weather.sojson.com/api/weather/city/101280105')
// 获取天气信息
const getWeather = () => get('getWeather')

// 获取疫情
const getYiqin = () => get('yiqin')

// 获取医生文章
const getArticleList = params => get('patient/getArticleList', params)

// 获取所有挂号类型
const getType = () => get('getType')

// 获取文章详情
const getDetailArticle = params => get('patient/getDetailArticle', params)

// 发表评论
const published = params => post('patient/published', params)

// 用户登录
const login = params => post('patient/login', params)

// 用户注册
const registered = params => post('patient/registered', params)

// 获取排班信息
const getScheduling = params => get('patient/getScheduling', params)

// 挂号
const appointment = params => post('patient/appointment', params)

// 获取挂号订单
const getPatientOrder = params => get('patient/getPatientOrder', params)

// 获取订单详情信息
const getDetailOrder = params => get('patient/getDetailOrder', params)

// 评价订单
const evaluation = params => post('patient/evaluation', params)

// 删除评论
const deleteComment = params => get('patient/deleteComment', params)

export default {
  getWeather,
  getYiqin,
  getArticleList,
  getDetailArticle,
  login,
  published,
  registered,
  getScheduling,
  appointment,
  getPatientOrder,
  getDetailOrder,
  getType,
  evaluation,
  deleteComment
}
