<template>
  <div>
    <div v-if="loading">loading...</div>
    <div v-else>好了</div>
  </div>
</template>

<script>
export default {
  props: {
    uuid: {
      type: String,
      default: null,
      loading: false
    },
    key: {
        type: String,
    }
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    initData(payload) {
        this.loading = true
        setTimeout(()=>{
            this.loading = false
        },2000)
    //   this.$store
    //     .dispatch('user/getAllUserList', payload)
    //     .then(res => {
    //       console.log()
    //     })
    //     .catch(err => {
    //       this.$message({
    //         type: 'error',
    //         message: err || '加载失败'
    //       })
    //     })
    }
  }
}
</script>

<style>
</style>