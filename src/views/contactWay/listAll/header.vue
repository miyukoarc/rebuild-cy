<template>
  <el-form ref="searchForm" inline label-width="120px">
    <el-form-item label="活码名称：">
      <el-input v-model.trim="query.remark"></el-input>
    </el-form-item>


    <div>
      <el-form-item label=" ">
        <el-t-button size="mini" type="primary" @click="handleSearch">搜索</el-t-button>
        <el-t-button size="mini" @click="handleRefresh">重置</el-t-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      //   value: '',
      query: {
        remark: ""
        // name: '',
        // tagIds: '',
        // userId: ''
        // roleUuid: ''
      }
    };
  },
  computed: {
    ...mapState({
      //   tagListAll: state => state.tag.tagListAll,
      //   userListAll: state => state.user.userListAll
      //   departments: state => state.department.departments
    })
  },
  methods: {
    handleChangeFirst(val) {
      ;
      this.$emit("handleSearch", this.query);
    },
    handleChangeSecond(val) {
      ;
      this.$emit("handleSearch", this.query);
    },
    handleChangeThird(val) {
      ;
      this.$emit("handleSearch", this.query);
    },
    handleSearch() {
      this.$emit("handleSearch", this.query);
    },
    handleRefresh() {
      this.$emit("handleRefresh");
      this.query = this.$options.data().query;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form-item:last-child {
  margin-bottom: 0;
}
</style>