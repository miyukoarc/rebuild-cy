<template>
  <el-form ref="searchForm" inline label-width="120px">
      <div class="font-s">
          当企业成员被客户从微信联系人中删除时，会在客户流失列表中产生一条记录，超盈SCRM会为您自动发出【被删除通知】，以便您第一时间得到通知信息，客户流失功能只会记录授权给超盈SCRM成员的客户流失信息
      </div>
    <!-- <el-form-item label="搜索客户">
      <el-input v-model.trim="query.name"></el-input>
    </el-form-item>

        <el-form-item label="所属客服">
      <el-select v-model="query.userId" @change="handleChangeThird">
        <el-option
          v-for="item in userListAll"
          :key="item.userId"
          :label="item.name"
          :value="item.userId"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="客户标签">
      <el-select v-model="query.tagIds" clearable @change="handleChangeSecond">
        <el-option
          v-for="item in tagListAll"
          :key="item.tagId"
          :label="item.tagName"
          :value="item.tagId"
        ></el-option>
      </el-select>
    </el-form-item>

    <div>
      <el-form-item label=" ">
        <el-t-button size="mini" type="primary" @click="handleSearch">搜索</el-t-button>
        <el-t-button size="mini" @click="handleRefresh">重置</el-t-button>
      </el-form-item>
    </div> -->
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
    //   options: [
    //     {
    //       label: '待审核',
    //       value: 'TO_BE_REVIEWED'
    //     },
    //     {
    //       label: '审核通过',
    //       value: 'APPROVED'
    //     },
    //     {
    //       label: '审核不通过',
    //       value: 'AUDIT_FAILED'
    //     }
    //   ],
      query: {
        name: '',
        tagIds: '',
        userId: ''
        // roleUuid: ''
      }
    }
  },
  computed: {
    ...mapState({
        
      tagListAll: state => state.tag.tagListAll,
      userListAll: state => state.user.userListAll
    //   departments: state => state.department.departments
    })
  },
  methods: {
    handleChangeFirst(val) {
      
      this.$emit('handleSearch', this.query)
    },
    handleChangeSecond(val) {
      
      this.$emit('handleSearch', this.query)
    },
    handleChangeThird(val) {
      
      this.$emit('handleSearch', this.query)
    },
    handleSearch() {
      this.$emit('handleSearch',this.query)
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