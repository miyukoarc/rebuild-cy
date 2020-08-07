<template>
  <el-form ref="searchForm" inline label-width="120px">
    <el-form-item label="敏感词：">
      <el-input v-model.trim="query.word"></el-input>
    </el-form-item>

    <el-form-item label="触发员工">
      <el-select filterable v-model="query.userUuid">
        <el-option
          v-for="item in userListAll"
          :key="item.uuid"
          :label="item.name"
          :value="item.uuid"
        ></el-option>
      </el-select>
    </el-form-item>


    <el-form-item label="触发时间：">
      <el-date-picker
        v-model="value"
        type="daterange"
        :value-format="'yyyy-MM-dd HH-mm-ss'"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="handleChangeFirst"
        :default-time="['00:00:00', '23:59:59']"
      ></el-date-picker>
    </el-form-item>

    <!-- <el-form-item label="所属客服">
      <el-select v-model="query.userId" @change="handleChangeThird">
        <el-option
          v-for="item in userListAll"
          :key="item.userId"
          :label="item.name"
          :value="item.userId"
        ></el-option>
      </el-select>
    </el-form-item>-->

    <!-- <el-form-item label="客户标签">
      <el-select v-model="query.tagIds" clearable @change="handleChangeSecond">
        <el-option
          v-for="item in tagListAll"
          :key="item.tagId"
          :label="item.tagName"
          :value="item.tagId"
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
import { mapState } from 'vuex'
export default {
  data() {
    return {
      value: [],
      query: {
        startTime: '',
        endTime: ''
        // userId: ''
        // roleUuid: ''
      }
    }
  },
  computed: {
    ...mapState({
      //   tagListAll: state => state.tag.tagListAll,
      userListAll: state => state.user.listSelect
      //   departments: state => state.department.departments
    })
  },
  methods: {
    handleChangeFirst(val) {
      this.query.startTime = val[0]
      this.query.endTime = val[1]
    //   this.$emit('handleSearch', this.query)
    },
    handleChangeSecond(val) {
      
      this.$emit('handleSearch', this.query)
    },
    handleChangeThird(val) {
      
      this.$emit('handleSearch', this.query)
    },
    handleSearch() {
      this.$emit('handleSearch', this.query)
    },
    handleRefresh() {
      this.$emit('handleRefresh')
      this.value = this.$options.data().value
      this.query = this.$options.data().query
    }
  }
}
</script>

<style>
</style>