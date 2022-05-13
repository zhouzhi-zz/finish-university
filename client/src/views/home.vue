<template>
  <div id="top" class="wap">
    <van-notice-bar
      mode="closeable"
      left-icon="volume-o"
      text="本网站为周植毕业设计，原创且不提供任何商务用处"
    />
    <div class="mt10">
      <div class="flex-center pb5"><b>{{showWeather}}</b></div>
      <div class="flex-center" style="color: rgba(67, 214, 99, 0.92); margin-bottom:-10px;">{{notice}}</div>
    </div>
    <van-divider />
    <h3 class="pt10 pb5">快速挂号</h3>
    <div>
      <van-grid :column-num="4" class="fast-guahao">
        <van-grid-item v-for="(item,index) in menu" :key="index" :icon="item.icon" :text="item.type" @click="touch(index)" />
      </van-grid>
    </div>
    <van-divider />
    <div id="yiqin" class="flex flex-space-between flex-align-items">
      <h3 class="pt10 pb5" style="color: #E6A23C;">疫情详情数据</h3>
      <h3 class="fs14 c999">更新时间：{{lastUpdateTime}}</h3>
    </div>
    <keep-alive>
      <div class="yiqin mb20">
        <div class="flex">
          <span>省份</span>
          <span>城市</span>
          <span>昨日新增</span>
          <span>现存患者</span>
        </div>
        <ul v-for="(item, index) in shortYiqin" :key="index" class="flex mt5">
          <li>{{item.prov}}</li>
          <li>{{item.city}}</li>
          <li>{{item.confirmAdd}}</li>
          <li>{{item.nowConfirm > 0 ? item.nowConfirm : 0}}</li>
        </ul>
        <div v-if="!isAll" class="seeMore" @click="seeMore">
          查看更多<van-icon name="arrow-down pl5" class="icon-down" />
        </div>
        <div v-if="isAll" class="seeMore" @click="packUp">
          收起<van-icon name="arrow-up pl5" class="arrow-up" />
        </div>
      </div>
    </keep-alive>
    <!-- 医生文章 -->
    <div id="article-title" class="article">
      <h3 style="color: #FA5151; margin-bottom:-20px;margin-bottom:-10px;">医生文章</h3>
      <div>
        <span :class="['pr20', active === 1 ? 'active' : '']" @click="switchActive(1)">按最新</span>
        <span :class="active === 2 ? 'active' : ''" @click="switchActive(2)">按浏览</span>
      </div>
    </div>
    <div class="article-module">
      <van-list
        v-model="loading"
        :finished="finished"
        offset="0"
        @load="onLoad"
      >
        <Article v-for="item in articleList" :key="item.id" :item="item" @click.native="toDetail(item.id)" />
      </van-list>
    </div>
    <van-divider
      v-if="finished"
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      <span class="fs14">没有更多了哦</span>
    </van-divider>
  </div>
</template>

<script>
import api from '@/api'
import Article from '@/components/article.vue'
import VueScrollTo from 'vue-scrollto'
import { week } from '@/utils/util'
const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
export default {
  name: 'Home',
  components: {
    Article
  },
  data() {
    return {
      menu: [],
      weather: {
        city: '花都区',
        high: '',
        low: '',
        type: '',
        week: ''
      },
      notice: '',
      articleList: [],
      yiqin: [],
      shortYiqin: [],
      isAll: false, // 疫情数据是否到底
      lastUpdateTime: '',
      active: 2,
      loading: false,
      finished: false,
      page: 0
    }
  },
  computed: {
    showWeather() {
      let str = ''
      Object.values(this.weather).forEach(i => {
        str += `${i}  `
      })
      return str
    }
  },
  created() {
    this.getWeather()
    this.getYiqin()
    // this.getArticleList()
    this.getType()
  },
  mounted() {
  },
  methods: {
    // 获取天气信息
    async getWeather() {
      const { data } = await api.getWeather()
      const { high, low, notice, type } = data.data.forecast[0]
      this.weather.high = high
      this.weather.low = low
      this.notice = notice
      this.weather.type = type
      this.weather.week = weeks[week()]
    },
    // 疫情接口
    getYiqin() {
      api.getYiqin().then(res => {
        // const data = res.data.replace(/callback11\(/, '').replace(/\)/, '')
        // console.log(JSON.parse(data))
        this.yiqin = Object.freeze(JSON.parse(res.data.replace(/^callback11\(|\)$/g, '')).data)
        this.shortYiqin = this.yiqin.slice(0, 3)
        this.lastUpdateTime = this.yiqin[0].update_time
        // console.log(this.yiqin)
        // const dd = res.data1.replace('"', '\"')
        // // console.log(dd)
        // const child = res.data1.areaTree[0].children
        // this.lastUpdateTime = res.data1.lastUpdateTime
        // let data = []
        // child.forEach(item => {
        //   item.children.forEach(city => {
        //     city.provinces = item.name
        //   })
        //   data = [...data, ...item.children]
        // // })
        // data.sort((a, b) => b.total.nowConfirm - a.total.nowConfirm)
        // data.sort((a, b) => b.today.confirm - a.today.confirm)
        // this.yiqin = data
        // this.shortYiqin = data.slice(0, 3)
      })
    },
    // 获取医生文章信息
    async getArticleList() {
      const params = {
        page: this.page,
        type: this.active
      }
      this.loading = false
      const res = await api.getArticleList(params)
      this.articleList.push(...res.data.rows)
      if (res.data.count === this.articleList.length) {
        this.finished = true
      }
    },
    // 获取挂号类型
    getType() {
      api.getType().then(res => {
        this.menu = Object.freeze(res.data)
      })
    },
    // 去挂号
    touch(index) {
      localStorage.setItem('guahaoDes', this.menu[index].describe)
      this.$router.push({ name: 'Guahao', query: { type: this.menu[index].type }})
    },
    // 去文章详情页
    toDetail(id) {
      this.$router.push({ name: 'DetailArticle', query: { id }})
    },
    // 查看更多
    seeMore() {
      if (this.shortYiqin.length === 3) {
        this.shortYiqin = this.yiqin.slice(0, 100)
      } else {
        this.shortYiqin = this.yiqin
        this.isAll = true
      }
    },
    // 收起
    packUp() {
      this.shortYiqin = this.yiqin.slice(0, 3)
      this.isAll = false
      // window.location.hash = '#top'
      VueScrollTo.scrollTo('#yiqin', 100, { offset: 0 })
    },
    // 切换浏览模式
    switchActive(i) {
      VueScrollTo.scrollTo('#article-title', 500, { offset: 0 })
      if (i === this.active) {
        return
      }
      this.loading = false
      this.page = 1
      this.articleList = []
      this.active = i
      this.getArticleList()
    },
    onLoad() {
      this.page++
      this.getArticleList()
    }
  }
}
</script>

<style lang="scss" scoped>
.wap {
    padding: 10px;
    padding-bottom: 70px;
    .yiqin {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      background: #fff;
      border-radius: 0.106667rem;
      box-shadow: 0 0.08rem 0.266667rem 0 rgb(194, 200, 219);
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      padding: 10px 5px 0.8rem 0;
      position: relative;
      span,li {
        width: 33.3%;
        text-align: center;
      }
      li {
        color: #666;
      }
      .fenge {
        border: 0.5px solid #999;
        margin-bottom: 10px;
      }
      .icon-down {
        animation: down 1s infinite;
      }
      @keyframes down {
        0% {
          transform: translate(0px, -3px);
        }
        50% {
          transform: translate(0px, 3px);
        }
        100% {
          transform: translate(0px, -3px);
        }
      }
      .arrow-up {
        animation: down 1s infinite;
      }
      .seeMore {
        padding-top: 15px;
        cursor: pointer;
        text-align: center;
      }
    }
}
.fast-guahao {
    border-radius: 20px;
}
.article {
  display: flex;
  justify-content: space-between;
}
.active {
  color: blue
}
.article-module {
  width: 100%;
  height: 100%;
}
</style>
