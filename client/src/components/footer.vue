<template>
  <div class="footer">
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item name="HOME" icon="shield-o">首页</van-tabbar-item>
      <!-- <van-tabbar-item name="MESSAGE" icon="chat-o">消息中心</van-tabbar-item> -->
      <van-tabbar-item name="MINE" icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'Footer',
  data() {
    return {
      active: 'HOME'
    }
  },
  mounted() {
    this.active = this.getCurrentPath()
  },
  watch: {
    active(newVal) {
      if (this.getCurrentPath() !== newVal.toUpperCase()) {
        this.$emit('switchMenu', newVal)
      }
    }
  },
  methods: {
    // 放在computer有缓存
    getCurrentPath() {
      const paths = location.href.split('/').pop().split('.')[0].toUpperCase()
      return paths
    }
  }
}
</script>

<style lang="scss" scoped>
// 底部有点漏了卧槽
.footer /deep/ .van-tabbar--fixed {
    bottom: 0px;
}
</style>
