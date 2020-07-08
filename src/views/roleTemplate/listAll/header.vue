<template>
  <el-form ref="searchForm" inline label-width="120px">
    <el-form-item label="员工姓名">
      <!-- <el-select v-model="query.handlerId" @change="handleChangeFirst">
        <el-option
          v-for="item in userListAll"
          :key="item.uuid"
          :label="item.name"
          :value="item.uuid"
        ></el-option>
      </el-select> -->
      <el-input v-model.trim="query.userName"></el-input>
    </el-form-item>
    <el-form-item label="所在部门">
      <el-select v-model="query.departmentsUuid" @change="handleChangeSecond">
        <el-option
          v-for="item in departments"
          :key="item.uuid"
          :label="item.name"
          :value="item.uuid"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="员工角色">
      <el-select v-model="query.roleUuid" @change="handleChangeThird">
        <el-option
          v-for="item in userListAll"
          :key="item.uuid"
          :label="item.name"
          :value="item.uuid"
        ></el-option>
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
      options: [
        {
          label: '待审核',
          value: 'TO_BE_REVIEWED'
        },
        {
          label: '审核通过',
          value: 'APPROVED'
        },
        {
          label: '审核不通过',
          value: 'AUDIT_FAILED'
        }
      ],
      query: {
        userName: '',
        departmentsUuid: '',
        roleUuid: ''
      }
      
    }
  },
  computed: {
    ...mapState({
      userListAll: state => state.user.userListAll,
      roleList: state => state.role.roleList,
      departments: state => state.department.departments
    })
  },
  methods: {
    handleChangeFirst(val) {
      this.$bus.$emit('changeSelect', { handlerId: val })
    },
    handleChangeSecond(val) {
      this.$bus.$emit('changeSelect', { auditConfirmation: val })
    },
    handleChangeThird(val) {
      this.$bus.$emit('changeSelect', { submitterId: val })
    },
    handleSearch() {
      this.$bus.$emit('handleSearch')
    },
    handleRefresh() {
      this.$bus.$emit('handleRefresh')
      this.query = this.$options.data().query
    }
  }
}
</script>

<style>
</style>