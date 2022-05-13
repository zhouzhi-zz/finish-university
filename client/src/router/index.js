import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 路由
const Content = () => import('@/views/content.vue')
const Home = () => import('@/views/home.vue')
const Message = () => import('@/views/message.vue')
const Mine = () => import('@/views/mine.vue')
// 文章页
const DetailArticle = () => import('@/views/detailArticle.vue')

// 登录页
const Login = () => import('@/views/login.vue')
// 注册
const Registered = () => import('@/views/registered.vue')

// 挂号
const Guahao = () => import('@/views/guahao.vue')

// 测试
const test = () => import('@/views/test.vue')

// 查看详情订单
const OrderReport = () => import('@/views/orderReport.vue')

// 评价订单
const Evaluation = () => import('@/views/evaluation.vue')

const routes = [
  { path: '/', name: 'Content', component: Content, redirect: '/home.html',
    children: [
      { path: '/home.html', name: 'HOME', component: Home },
      { path: '/message.html', name: 'MESSAGE', component: Message },
      { path: '/mine.html', name: 'MINE', component: Mine, meta: { needLogin: true }}
    ] },
  { path: '/detailArticle.html', name: 'DetailArticle', component: DetailArticle },
  { path: '/login.html', name: 'Login', component: Login },
  { path: '/guahao.html', name: 'Guahao', component: Guahao },
  { path: '/registered.html', name: 'Registered', component: Registered },
  { path: '/test.html', name: 'test', component: test },
  { path: '/orderReport.html', name: 'OrderReport', component: OrderReport },
  { path: '/evaluation.html', name: 'Evaluation', component: Evaluation }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    console.log(1)
  }
  next()
})

export default router
