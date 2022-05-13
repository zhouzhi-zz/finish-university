<template>
  <div class="wap">
    <h2 class="top c33">{{article.title}}</h2>
    <div class="c999">
      <span class="tag">原创</span>
      <span class="fs12 pl5">发布于：{{date(article.createdAt)}}</span>
      <span class="fs12 pl5">阅读量：{{article.views}}</span>
    </div>
    <img v-if="article.cover" :src="article.cover" class="cover">
    <div class="content c333" v-html="article.content"></div>
    <van-divider />
    <h2 class="fs18 c333 pb5">留言（{{total}}）</h2>
    <div v-if="total">
      <div v-for="i in replyList" :key="i.id" class="pb10">
        <div>
          <span class="pl5 fs18 c666">{{i.reply_name}}</span>
          <span class="pl10 fs12 c999">{{date(i.createdAt)}}</span>
        </div>
        <div class="pl15 fs14" style="color: rgba(67, 68, 60, 0.8);">
          {{i.reply_content}}
          <span v-if="patient_id === i.patient_id" class="blue" @click="deleteComment(i)">删除</span>
        </div>
      </div>
    </div>
    <van-empty v-else description="说点什么吧" />
    <div class="reply-content">
      <van-field v-model="reply_content" class="input" placeholder="想要留言call这里~" />
      <button class="btn" @click="published">发表</button>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { date } from '@/utils/util.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      article: {},
      reply_content: '',
      total: 0,
      replyList: [], // 评论数组
      patient_id: ''
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'userInfo'])
  },
  created() {
    this.getArticle()
    this.patient_id = this.userInfo.patient_id
  },
  methods: {
    // 发表
    published() {
      if (this.isLogin) {
        if (this.reply_content.trim() === '') {
          return
        }
        const params = {
          patient_id: this.userInfo.patient_id,
          article_id: this.getUrlParam('id'),
          reply_content: this.reply_content,
          reply_name: this.userInfo.name
        }
        api.published(params).then(res => {
          this.$toast(res.msg)
          this.getArticle()
          this.reply_content = ''
        })
      }
      this.checkLogin()
    },
    getArticle() {
      const id = this.getUrlParam('id')
      api.getDetailArticle({ id }).then(res => {
        this.article = res.data
        this.article.content = this.article.content.replace(/\n/g, '<br />').replace(/ {4}/g, '&nbsp;&nbsp;&nbsp;')
        this.total = res.data.reply.count
        this.replyList = res.data.reply.rows
      })
    },
    // 时间过滤
    date(d) {
      return date(d)
    },
    // 删除评论
    deleteComment(i) {
      console.log(i)
      this.$dialog.confirm({
        message: '是否删除该评论'
      })
        .then(() => {
          api.deleteComment({ id: i.id }).then(res => {
            this.replyList.splice(this.replyList.findIndex(item => i === item), 1)
          })
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.cover {
  padding-top: 20px;
  width: 100%;
}
.wap {
    padding: 0 15px 40px;
}
.top {
    padding: 30px 0 5px;
    font-size: 22px;
}
.tag {
    padding: 0 0.053rem;
    border-radius: 0.053rem;
    border: 0.027rem solid rgba(250, 81, 81, 0.26);
    font-size: .293rem;
    color: #FA5151;
}
.content {
    padding-top: 30px;
    letter-spacing: 0.544px;
    line-height: 22px;
}
.reply-content {
    display: flex;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    bottom: 0;
    background-color: #fff;
    .input {
        width: 60%;
    }
    .btn {
        width: 20%;
        border-radius: 10px;
        height: 35px;
        background-color: rgba(167, 182, 65, 0.8);
        margin-top: 10px;
        margin-right: 18px;
    }
}
.blue {
  color: blue;
}
</style>
