<template>
  <el-form ref="searchForm" inline label-width="120px">
    <el-form-item label="敏感行为">
      <el-input v-model.trim="query.action"></el-input>
    </el-form-item>

    <!-- <el-form-item label="手机号码">
      <el-input v-model.trim="query.name"></el-input>
    </el-form-item>

    <el-form-item label="批量添加次数">
      <el-input v-model.trim="query.name"></el-input>
    </el-form-item> -->

    <el-form-item label="发生时间">
      <el-date-picker
        v-model="value"
        type="daterange"
        :value-format="'yyyy-MM-dd HH-mm-ss'"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="handleChangeFirst"
      ></el-date-picker>
    </el-form-item>

    <!-- <el-form-item label="审批人">
      <el-select v-model="query.userId" @change="handleChangeThird">
        <el-option
          v-for="item in 10"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item> -->

    <!-- <el-form-item label="提交人">
      <el-select v-model="query.userId" @change="handleChangeThird">
        <el-option
          v-for="item in 10"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item> -->

    <!-- <el-form-item label="状态">
      <el-select v-model="query.userId" @change="handleChangeThird">
        <el-option
          v-for="item in 10"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item> -->

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
      value: '',
      query: {
        action: '',
        startTiem: '',
        endTime: ''
        // roleUuid: ''
      }
    }
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
      console.log(val)
        this.query.startTime = val[0]
        this.query.endTime = val[1]      
      this.$emit('handleSearch', this.query)
    },
    handleChangeSecond(val) {
      console.log(val)
      this.$emit('handleSearch', this.query)
    },
    handleChangeThird(val) {
      console.log(val)
      this.$emit('handleSearch', this.query)
    },
    handleSearch() {
      this.$emit('handleSearch', this.query)
    },
    handleRefresh() {
      this.$emit('handleRefresh')
      this.query = this.$options.data().query
    }
  }
}
</script>

<style>
</style>