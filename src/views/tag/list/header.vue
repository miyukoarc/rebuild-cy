<template>
  <div>
    <el-form inline label-position="left" label-width="120px">
      <el-form-item>
        <span>卡片名称</span>
        <span>（企业标签由管理员统一配置，配置后企业全部成员可使用）</span>
      </el-form-item>
      <el-form-item label="标签组名称">
        <el-input v-model="params.groupName"></el-input>
      </el-form-item>
      <el-form-item label="标签名称">
        <el-input v-model="params.tagName"></el-input>
      </el-form-item>

      <div class="search-button">
        <el-form-item>
          <el-t-button size="mini" type="primary" @click="handleSearch">搜索</el-t-button>
          <el-t-button size="mini" @click="handleRefresh">重置</el-t-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {
          groupName: '',
          tagName: ''
      }
    }
  },
  methods: {
    handleSearch() {
        this.$bus.$emit('search',this.params)
        console.log('搜索')
    },
    handleRefresh() {
        Object.assign(this.$data, this.$options.data())
        this.$bus.$emit('refresh')
    }
  }
}
</script>

<style lang="scss" scoped>
.search-button {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>