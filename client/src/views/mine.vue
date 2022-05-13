<template>
  <div class="wrap">
    <i class="layout" @click="layout"></i>
    <div class="top" @click="layout">
    </div>
    <div class="nav user">
      <h2 class="c666">{{userInfo.name}} {{userInfo.phone}}</h2>
      <h2 class="c666">{{userInfo.age}}岁 {{userInfo.sex ? '男' : '女'}}</h2>
    </div>
    <div class="detail">
      <span><i>{{userInfo.perform_times}}</i><span>挂号次数</span></span>
      <span><i>{{waitToSee}}</i><span>待就诊</span></span>
      <span class="un-promise"><i>{{userInfo.unpromise_times}}</i>
        <span>爽约次数</span>
        <van-icon class="icon" name="question-o" @click="showMsg" />
      </span>
    </div>
    <van-divider />
    <div class="order">
      <h2>历史订单</h2>
      <van-empty
        v-if="!orderList.length"
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="暂无预约订单"
      />
      <article v-for="item in orderList" :key="item.id" class="order-deatil" @click="seeOrder(item.id)">
        <div class="c333 fs14 context">
          <span>挂号类型：{{item.type}}</span>
          <span>咨询时间：{{item.add_time}}</span>
          <span>咨询时段：{{item.timer === 1 ? '上午' : item.timer === 2 ? '中午' : '晚上'}}</span>
          <span>咨询医生：{{item.doctor_name}}</span>
        </div>
        <span class="perform">{{item.is_perform === 1 ? '已就诊' : item.is_perform === 0 ? '爽约' : '未就诊'}}</span>
      </article>
      <van-divider
        v-if="orderList.length"
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >
        <span class="fs14">没有更多了哦</span>
      </van-divider>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import api from '@/api'
export default {
  data() {
    return {
      orderList: [],
      waitToSee: 0 // 待就诊次数
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'userInfo'])
  },
  created() {
    if (this.isLogin === false) {
      this.goLogin()
    } else {
      this.refreshUserInfo()
      this.getOrder()
    }
  },

  methods: {
    ...mapMutations(['setUserInfo']),
    refreshUserInfo() {
      const params = {
        loginWay: 1,
        phone: this.userInfo.phone,
        password: this.userInfo.password
      }
      api.login(params).then(res => {
        this.setUserInfo(res.data)
      })
    },
    getOrder() {
      api.getPatientOrder({ patient_id: this.userInfo.patient_id }).then(res => {
        res.data.forEach(i => {
          if (typeof i.is_perform === 'object') {
            this.waitToSee++
          }
        })
        this.orderList = res.data
      })
    },
    layout() {
      console.log(111)
      this.$router.push({ name: 'Login' })
    },
    seeOrder(order_id) {
      this.$router.push({ name: 'OrderReport', query: { order_id }})
    },
    showMsg() {
      this.$dialog.alert({ message: '如果您超过3次爽约，一年内不得再使用该系统挂号' })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
}
.top {
    top: 0px;
    height: 100px;
    width: 100%;
    background: url('./images/background-default.png') repeat-x;
    background-size: contain;
}
    .layout {
      position: absolute;
      background-image: url('./images/layout.png');
      background-size: cover;
      width: 30px;
      height: 30px;
      top: 70px;
      right: 20px;
    }
.nav {
    padding: 0 10px 20px;
    margin-top: -30px;
}
.detail {
    padding: 0 10px;
    display: flex;
    justify-content: space-around;
    span{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        i {
            font-weight: 600;
            color: #333;
            font-size: 18px;
        }
        span {
            color: #666;
            font-size: 14px;
        }
    }
    .un-promise {
      position: relative;
      .icon {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
}
.order {
    padding: 0 10px 50px;
    h2 {
        font-size: 22px;
        color:#00d2a3;
    }
}
.custom-image {
    margin-top: 100px;
}
.custom-image /deep/ .van-empty__image {
    width: 90px;
    height: 90px;
}
.order-deatil {
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  padding: 20px;
  background-color: #eee;
  margin: 20px 0;
  .perform {
    color: #ee0a24;
  }
  .context {
    display: flex;
    flex-direction: column;
  }
}
</style>
