<template>
  <div class="wrap">
    <van-steps :active="getProgress" :active-color="isSeeDoctor">
      <van-step>已预约</van-step>
      <van-step>暂未就诊</van-step>
      <van-step v-if="details.is_perform">已就诊</van-step>
      <van-step v-else>爽约</van-step>
    </van-steps>
    <h2 class="title">详情报告</h2>
    <ul class="deatils">
      <li>挂号人姓名：<span>{{details.patient_name}}</span></li>
      <li>挂号时间段：<span>{{details.add_time}} {{details.timer === 1 ? '上午' : details.timer === 2 ? '下午' : '晚上'}}</span></li>
      <li>下单时间：<span>{{date(details.createdAt)}}</span></li>
      <li>挂号病情类型：<span>{{details.type}}</span></li>
      <li>挂号人备注描述：<span>{{details.patient_node || '无'}}</span></li>
      <li>医生：<span>{{details.doctor_name}}</span></li>
      <li>诊断时间：<span>{{date(details.perform_time)}}</span></li>
      <li>医生备注描述：<span>{{details.doctor_node}}</span></li>
    </ul>
    <div v-if="getProgress === 2" class="evaluation" @click="toEvaluation">评价此次就诊~</div>
    <div class="footer">计科三班周植~</div>
  </div>
</template>

<script>
import api from '@/api'
import { time } from '@/utils/util.js'
export default {
  data() {
    return {
      active: 2,
      details: {}
    }
  },
  computed: {
    getProgress() {
      if ([0, 1].includes(this.details.is_perform)) {
        return 2
      } else {
        return 1
      }
    },
    isSeeDoctor() {
      if (this.details.is_perform === 1 || typeof this.details.is_perform === 'object') {
        return '#07c160'
      } else {
        return 'rgba(50, 50, 51, 0.88)'
      }
    }
  },
  created() {
    this.getOrder()
  },
  methods: {
    getOrder() {
      api.getDetailOrder({ order_id: this.getUrlParam('order_id') }).then(res => {
        this.details = res.data
      })
    },
    date(d) {
      if (d) {
        return time(d)
      }
      return '未就诊'
    },
    toEvaluation() {
      localStorage.setItem('orderInfo', JSON.stringify(this.details))
      this.$router.push({ name: 'Evaluation' })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 0 20px;
  .title {
    font-size: 22px;
  }
  .deatils {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    color: #666;
    li {
      margin-top: 20px;
      span {
        font-size: 18px;
        color: #111;
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 20px;
    width: 100%;
    padding-right: 30px;
    text-align: center;
    color: #999;
  }
  .evaluation {
    padding-top: 30px;
    text-align: center;
    color: blue;
  }
}
</style>
