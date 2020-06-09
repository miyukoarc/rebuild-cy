<template>
  <el-container>
    <el-form :model="form" ref="form" label-width="80px" inline>
      <el-form-item>
        <el-input v-model="form.name" placeholder="名称" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
        <el-button size="small" type="primary" @click="handleCreate">
          <i class="el-icon-circle-plus-outline"></i>
          添加
        </el-button>
        <el-button type="primary" icon="el-icon-refresh" size="small" class="filter-item ml-2">刷新</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
// import mForm from "./form";
import { mapState, mapMutations, mapActions } from 'vuex'
const NAME = 'management'
export default {
  components: {},
  data() {
    return {
      form: {
        name: null
      }
    }
  },
  methods: {
    handleCreate() {
      this.$bus.$emit('showFormDialog', { type: 'Create', state: true })
    }
  }
}
</script>

<style lang="scss" scoped></style>
