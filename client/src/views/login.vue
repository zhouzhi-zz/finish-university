<template>
  <div class="login">
    <div class="bac flex-center">
      <img src="https://img2.baidu.com/it/u=3510833004,4282767687&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" class="logo">
      <b style="color: #00D3C2; font-size: 25px;">挂号</b>
      <b class="pl5" style="color: rgba(236, 181, 16, 0.8); font-size: 25px;">毕设</b>
    </div>
    <van-field v-model="phone" center clearable label="手机号码" placeholder="请输入手机号码" />
    <van-field v-if="loginWay" v-model="password" type="password" center clearable label="密码" placeholder="请输入密码" />
    <van-field v-else v-model="yzm" center clearable label="短信验证码" placeholder="请输入短信验证码">
      <template v-if="!loginWay" #button>
        <van-button size="small" class="yzm" type="primary" @click="sendYZM">{{isSend ? timer + 's' : '发送验证码'}}</van-button>
      </template>
    </van-field>
    <div class="flex-center pt20"><button :class="['btn', 'flex-center', isShowBtn ? 'full' : '']" @click="login">登录</button></div>
    <div v-if="loginWay" class="miss flex-center" @click="changeWay">忘记密码？可以选择短信登陆</div>
    <div v-else class="miss flex-center" @click="changeWay">密码登录</div>
    <div class="no-acounnt flex-center" @click="toRegistered">还没账号？去注册</div>
  </div>
</template>

<script>
import api from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      phone: '',
      password: '',
      yzm: '',
      loginWay: 1, // 1是密码 0是验证码
      isSend: false, // 是否发送验证码
      timer: 60 // 倒计时
    }
  },
  computed: {
    isShowBtn() {
      if (this.phone.trim() !== '') {
        if (this.password.trim() !== '' || this.yzm.trim() !== '') return true
        else return false
      } else return false
    }
  },
  methods: {
    ...mapMutations(['setIsLogin', 'setUserInfo']),
    changeWay() {
      this.loginWay = this.loginWay ? 0 : 1
      this.password = ''
      this.yzm = ''
    },
    login() {
      if (this.isShowBtn) {
        const params = {
          loginWay: this.loginWay,
          phone: this.phone,
          password: this.password,
          yzm: this.yzm
        }
        api.login(params).then(res => {
          if (res.code) {
            this.setIsLogin(true)
            this.setUserInfo(res.data)
            this.back()
          } else {
            this.$toast(res.msg)
          }
        })
      }
    },
    // 发送验证码
    sendYZM() {
      this.isSend = true
      const that = this
      const timing = setInterval(() => {
        if (that.timer === 1) {
          clearInterval(timing)
          that.timer = 60
          that.isSend = false
        }
        that.timer--
      }, 1000)
    },
    // 注册
    toRegistered() {
      this.$router.push({ name: 'Registered' })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
    height: 100vh;
    .logo {
        width: 30px;
        padding-right: 10px;
    }
    .bac {
        height: 130px;
        background-color: #F1F1F1;
    }
    .btn {
        height: 35px;
        width: 90%;
        border-radius: 999px;
        background-color: #aaa;
        color: #fff;;
    }
    .yzm {
        width: 100px;
    }
    .full {
        background-color: #1989fa;
    }
}
.miss {
    position: fixed;
    width: 100%;
    bottom: 60px;
    color: #009EE6;
}
.no-acounnt {
  position: fixed;
  width: 100%;
  bottom: 20px;
  color: #009EE6;
}
</style>
