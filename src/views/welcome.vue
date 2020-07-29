<template>
  <div class="container">
    <div class="info-container">
      <div class="tips-container">
        <h1>SocialCRM</h1>
        <h5>把您的企业服务建立到微信上</h5>
      </div>
      <div class="text-align-center">
        <el-button size="small" @click="handleEnter" type="primary">进入</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // tenantId:''
    }
  },
  computed: {},
  created() {
    const localStorage = JSON.parse(window.localStorage.getItem('corp'))
    if (localStorage?.name) {
      this.$store.commit('auth/SAVE_CORPINFO', localStorage)
    }
  },
  methods: {
    handleEnter() {
      this.$router.push({
        path: '/dashboard',
      })

      this.$store
        .dispatch('user/getMyInfo')
        .then(() => {})
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .tips-container {
    margin: 20px 0;
  }
  -webkit-app-region: drag;
  .info-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
    -webkit-app-region: no-drag;
  }
}
</style>