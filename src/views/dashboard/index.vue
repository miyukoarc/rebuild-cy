<template>
  <div class="dashboard-container">
    <!-- <el-button @click="handleClick">获取</el-button> -->
    <div class="dashboard-text">name: {{ name }}</div>

    <el-tooltip placement="left">
        <div slot="content">123123</div>
        <a href="">123123</a>
    </el-tooltip>

    

    <!-- <el-popover
        placement="right"
        title="标题"
        width="200"
        trigger="hover"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        <el-t-button >实验按钮</el-t-button>
        <el-button >focus 激活</el-button>
</el-popover> -->
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
