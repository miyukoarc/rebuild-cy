<!--
 * @Author: your name
 * @Date: 2020-07-31 16:41:29
 * @LastEditTime: 2020-08-10 11:24:38
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\externalUser\quitUserRelationExUserList\header.vue
-->
<template>
  <el-form ref="searchForm" inline label-width="120px" class="external-user-list-all-header">
    <el-form-item label="已离职成员：">
      <el-input v-model.trim="query.name" clearable placeholder="请输入已离职成员名称"></el-input>
    </el-form-item>

    <el-form-item label="客户状态：">
      <el-select v-model="query.status">
        <el-option
          v-for="(item,index) in contractWay"
          :key="index"
          :label="item.type"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="离职时间：">
      <el-date-picker
        v-model="value"
        type="daterange"
        :value-format="'yyyy-MM-dd HH:mm:ss'"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="handleSelectedTime"
        :default-time="['00:00:00', '23:59:59']"
      ></el-date-picker>
    </el-form-item>

    <div class="handle-warp">
      <el-form-item label=" ">
        <el-t-button size="mini" type="primary" @click="handleSearch">搜索</el-t-button>
        <el-t-button size="mini" @click="handleRefresh">重置</el-t-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      contractWay: [
        {
          type: '待分配',
          id: 'ALLOCATE',
        },
        {
          type: '待审核',
          id: '2',
        },
        {
          type: '已分配',
          id: 'ALLOCATED',
        },
      ],
      value: [],
      query: {
        name: '',
        status: '',
        startTime: '',
        endTime: '',
        // roleUuid: ''
      },
    }
  },
  computed: {
    ...mapState({
      // tagListAll: state => state.tag.tagListAll,
      // userListAll: state => state.user.userListAll
      //   departments: state => state.department.departments
    }),
  },
  methods: {
    handleSelectedTime(val) {
      this.query.startTime = this.value[0]
      this.query.endTime = this.value[1]
    },
    handleSearch() {
      this.$emit('handleSearch', this.query)
    },
    handleRefresh() {
      this.$emit('handleRefresh')
      this.query = this.$options.data().query
    },
  },
}
</script>

<style>
</style>