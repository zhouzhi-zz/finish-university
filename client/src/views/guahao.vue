<template>
  <div class="warp">
    <van-cell title="请选择挂号日期" :value="date" @click="show = true" />
    <van-calendar v-model="show" @confirm="onConfirm" />
    <van-empty
      v-if="!schedulingArr.length"
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无可挂号医生"
    />
    <div class="flex all">
      <div v-for="(item) in schedulingArr" :key="item.id" :class="['deatil', 'mt30', 'ml30', active === item ? 'active' : '']" @click="updateActive(item)">
        <div>医生：{{item.doctor_name}}</div>
        <div>时间段：{{item.timer | appointmentTime}}</div>
        <div>剩余量：{{item.all_number - item.have_number}}</div>
      </div>
    </div>
    <div class="footer">
      <span class="pl20">预约时间: <span class="ml5 red">{{date}} {{active.timer | appointmentTime}}</span> </span>
      <van-button type="primary" @click="submit">预约</van-button>
    </div>
    <!-- 患者描述 -->
    <van-dialog v-model="desDialog" title="病情描述" show-cancel-button @confirm="fillDes">
      <van-field
        v-model="describe"
        rows="2"
        autosize
        type="textarea"
        maxlength="200"
        placeholder="请输入您的描述，有助于医生对您的病情做初步判断"
        show-word-limit
      />
    </van-dialog>
    <!-- 确认弹窗 -->
    <van-dialog v-model="dialog" title="预约信息" show-cancel-button @confirm="sureSubmit">
      <div class="flex-center flex-direction-column pl20 pr20">
        <div>时间段：{{date}} {{active.timer | appointmentTime}}</div>
        <div>看病类型：{{active.type}}</div>
        <div>医生：{{active.doctor_name}}</div>
        <div>我的备注：{{describe}}</div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { day } from '@/utils/util'
import { date as filteDate } from '@/utils/util.js'
import { mapGetters } from 'vuex'
import api from '@/api'
export default {
  data() {
    return {
      schedulingArr: [],
      date: day(new Date()),
      tiemDate: new Date(),
      show: false,
      active: {}, // 选中了哪个妞
      desDialog: false, // 描述
      describe: '',
      dialog: false
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'userInfo'])
  },
  created() {
    if (this.isLogin === false) {
      this.goLogin()
    } else {
      const describe = this.getUrlParam('type') === '发烧' && localStorage.getItem('guahaoDes')
      if (describe) {
        this.$dialog.alert({
          message: describe
        }).then(() => {
          localStorage.removeItem('guahaoDes')
        })
      }
      this.getScheduling()
    }
  },
  filters: {
    appointmentTime(timer) {
      if (!timer) return '暂无预约时间'
      return timer === 1 ? '上午' : timer === 2 ? '下午' : '晚上'
    }
  },
  methods: {
    // 获取排班信息
    getScheduling() {
      api.getScheduling({ nowDate: filteDate(this.tiemDate), type: decodeURIComponent(this.getUrlParam('type')) }).then(res => {
        this.schedulingArr = res.data.rows
      })
    },
    onConfirm(date) {
      this.show = false
      this.date = day(date)
      this.tiemDate = date
      this.active = {}
      this.getScheduling()
    },
    filteDate(d) {
      return filteDate(d)
    },
    updateActive(item) {
      if (item.all_number - item.have_number > 0) {
        this.active = item
      }
    },
    submit() {
      if (!this.active.timer) {
        return this.$dialog.alert({ message: '请选择预约时间段' })
      }
      this.desDialog = true
      //   this.dialog = true
    },
    // 填完描述
    fillDes() {
      this.dialog = true
    },
    // 确定提交
    sureSubmit() {
      const parmas = {
        patient_id: this.userInfo.patient_id,
        patient_name: this.userInfo.name,
        patient_age: this.userInfo.age,
        doctor_id: this.active.doctor_id,
        doctor_name: this.active.doctor_name,
        patient_node: this.describe,
        type: this.active.type,
        timer: this.active.timer,
        add_time: filteDate(this.tiemDate)
      }
      api.appointment(parmas).then(res => {
        this.getScheduling()
        this.$dialog.alert({ message: res.msg })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.warp {
    padding-top: 0 10px 40px;
    .all {
        flex-wrap:wrap;
    }
    .deatil {
        padding: 10px 20px;
        border: 1px solid #000;
        border-radius: 10px;
    }
    .active {
        border-color: #ee0a24!important;
    }
    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        bottom: 0;
        height: 40px;
        width: 100%;
    }
}
.footer /deep/ .van-button {
    width: 100px;
}
.custom-image {
    margin-top: 100px;
}
.custom-image /deep/ .van-empty__image {
    width: 90px;
    height: 90px;
  }
</style>
