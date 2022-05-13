<template>
  <div class="warp">
    <h4 class="elli">标题：{{article.title}}</h4>
    <article class="flex">
      <div class="fs16 c333 line3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{article.content}}</div>
      <div v-if="article.cover">
        <img v-lazy="article.cover" :src="article.cover" class="cover">
      </div>
    </article>
    <footer class="fs14 c333 pr20 footer" style="color: rgba(54, 106, 148, 0.8);">
      作者：{{article.author}}医生
      创作时间：{{getDate}}
      <van-icon name="eye-o pl5" />{{article.views}}
    </footer>
  </div>
</template>

<script>
import { date } from '@/utils/util.js'
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      article: {}
    }
  },
  computed: {
    getDate() {
      return date(this.article.createdAt)
    }
  },
  created() {
    this.article = { ...this.item }
  }
}
</script>

<style lang="scss" scoped>
.warp {
    background-color: #f4f4f4;
    padding: 5px;
    border-radius: 10px;
    margin: 30px 0;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.cover {
  height: 60px;
}
</style>
