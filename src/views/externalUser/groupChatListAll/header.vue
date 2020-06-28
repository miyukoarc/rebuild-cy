<!--
 * @Author: your name
 * @Date: 2020-06-24 10:23:46
 * @LastEditTime: 2020-06-28 16:02:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\externalUser\groupChatListAll\header.vue
--> 
<template>
  <el-form ref="searchForm" inline label-width="120px">
    <el-form-item label="搜索群名称：">
      <el-input v-model.trim="query.externalUuid" clearable></el-input>
    </el-form-item>
    <el-form-item label="全部群主：">
      <el-select v-model="query.userId" clearable @change="handleChangeSecond">
        <el-option
          v-for="item in listOwner"
          :key="item.userId"
          :label="item.name"
          :value="item.userId"
        ></el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="员工角色">
      <el-select v-model="query.roleUuid" @change="handleChangeThird">
        <el-option
          v-for="item in roleList"
          :key="item.uuid"
          :label="item.name"
          :value="item.uuid"
        ></el-option>
      </el-select>
    </el-form-item>-->

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
      query: {
        externalUuid: "",
        userId: ""
      }
    };
  },
  computed: {
    ...mapState({
      listOwner: state => state.externalUser.listOwner
    })
  },
  methods: {
    handleChangeFirst(val) {
      console.log(val);
      this.$emit("handleSearch", this.query);
    },
    handleChangeSecond(val) {
      console.log(val);
      this.$emit("handleSearch", this.query);
    },
    handleChangeThird(val) {
      console.log(val);
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