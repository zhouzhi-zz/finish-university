<template>
  <div class="wrap">
    <div class="nav"></div>
    <van-field name="satisfaction" label="评分">
      <template #input>
        <van-rate v-model="satisfaction" allow-half void-icon="star" void-color="#eee" />
      </template>
    </van-field>
    <van-field v-model="opinion" rows="2" autosiz label="意见" type="textarea" maxlength="200" placeholder="请输入留言" show-word-limit />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit" @click="sumbit">提交</van-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '@/api'
export default {
  data() {
    return {
      satisfaction: 5,
      opinion: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    sumbit() {
      const orderInfo = JSON.parse(localStorage.getItem('orderInfo'))
      const userInfo = this.userInfo
      console.log(orderInfo)
      console.log(this.userInfo)
      const params = {
        patient_id: userInfo.patient_id, // id
        patient_name: userInfo.name, // 评论人
        satisfaction: this.satisfaction, // 满意度
        opinion: this.opinion, // 意见
        doctor_id: orderInfo.doctor_id, // 被评论医生
        order_id: orderInfo.id, // 订单id
        age: userInfo.age, // 年龄
        sex: userInfo.sex
      }
      api.evaluation(params).then(res => {
        console.log(1)
        this.$dialog.alert({ message: '谢谢您宝贵的评价！' }).then(res => {
          this.back()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
    padding: 10px;
}
.nav {
    height: 10px;
}
</style>
