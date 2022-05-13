import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/index.scss'
import Vant from 'vant'
import 'vant/lib/index.css'
import { Lazyload } from 'vant'
import { mapGetters } from 'vuex'

Vue.config.productionTip = false
Vue.use(Lazyload)
Vue.use(Vant)
Vue.mixin({
  computed: {
    ...mapGetters(['isLogin', 'userInfo'])
  },
  methods: {
    getUrlParam(query) {
      return this.$route.query[query]
    },
    // 去登录页
    goLogin() {
      this.$router.push({ name: 'Login' })
    },
    back() {
      this.$router.back()
    },
    // 判断是否登录，没有则去登录
    checkLogin() {
      if (!this.isLogin) {
        this.goLogin()
      }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
