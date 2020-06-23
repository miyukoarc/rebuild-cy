<template>
  <el-form ref="searchForm" inline label-width="120px">
    <el-form-item label="搜索客户">
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
        <el-option-group 
        v-for="item in tagListAll" 
        :key="item.groupId" 
        :label="item.groupName">
          <el-option
            v-for="child in item.tagList"
            :key="child.uuid"
            :label="child.tagName"
            :value="child.tagId"
          ></el-option>
        </el-option-group>
      </el-select>
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
      tagListAll: state => state.tag.tagListSelect,
      userListAll: state => state.user.listSelect
      //   departments: state => state.department.departments
    })
  },
  methods: {
    handleChangeFirst(val) {
      console.log(val)
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