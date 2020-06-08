<template>
  <div class="dashboard-container">
    <el-button @click="handleClick">获取</el-button>
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {},
  methods: {
    handleClick() {
      this.$store
        .dispatch('permission/getListAll')
        .then(() => {})
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
