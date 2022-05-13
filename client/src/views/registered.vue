<template>
  <div class="warp">
    <h2 class="fs22 flex-center pb5">用户注册</h2>
    <van-form validate-first @submit="submit">
      <van-field
        v-model="formData.name"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="formData.phone"
        name="pattern"
        label="手机号"
        placeholder="请输入您的手机号码"
        :rules="[{ pattern, message: '请填写正确的手机号码' }]"
      />
      <van-field
        v-model="formData.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="formData.password1"
        type="password"
        name="再次输入密码"
        label="再次输入密码"
        placeholder="请再次输入密码"
        :rules="[{ validator, message: '密码不一致' }]"
      />
      <van-field name="stepper" label="年龄">
        <template #input>
          <van-stepper v-model="formData.age" />
        </template>
      </van-field>
      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="formData.sex" direction="horizontal">
            <van-radio :name="1">男</van-radio>
            <van-radio :name="0">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data() {
    return {
      formData: {
        name: '',
        password: '',
        password1: '',
        phone: '',
        age: 18,
        sex: 1
      },
      pattern: /^1[3456789]\d{9}$/
    }
  },
  methods: {
    validator(val) {
      if (val !== this.formData.password) return false
    },
    submit() {
      api.registered(this.formData).then(res => {
        if (res.code) {
          this.back()
        } else {
          this.$toast(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.warp {
    padding: 20px 10px;
}
</style>
