<template>
  <div class="warp">
    <router-view />
    <Footer @switchMenu="switchMenu" />
  </div>
</template>

<script>
import Footer from '@/components/footer.vue'
export default {
  name: 'Content',
  components: {
    Footer
  },
  data() {
    return {
      data: {}
    }
  },
  methods: {
    switchMenu(menu) {
      this.$router.push({ name: menu })
    }
  }
}
</script>

