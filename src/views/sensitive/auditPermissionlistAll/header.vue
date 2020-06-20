<template>
  <el-form ref="searchForm" inline label-width="120px">
    <el-form-item label="审批人">
      <el-select v-model="handlerId" @change="handleChangeFirst">
        <el-option
          v-for="item in userListAll"
          :key="item.uuid"
          :label="item.name"
          :value="item.uuid"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="审批状态">
      <el-select v-model="auditConfirmation" @change="handleChangeSecond">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="提起人">
      <el-select v-model="submitterId" @change="handleChangeThird">
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
      handlerId: '',
      auditConfirmation: '',
      submitterId: ''
    }
  },
  computed: {
    ...mapState({
      userListAll: state => state.user.userListAll
    })
  },
  methods: {
    handleChangeFirst(val) {
      console.log(val)
      this.$bus.$emit('changeSelect',{handlerId:val})
    },
    handleChangeSecond(val) {
      console.log(val)
      this.$bus.$emit('changeSelect',{auditConfirmation:val})
    },
    handleChangeThird(val) {
      console.log(val)
      this.$bus.$emit('changeSelect',{submitterId:val})
    },
    handleSearch(val){
        this.$bus.$emit('handleSearch',{str:'search'})
    },
    handleRefresh(val){
        this.$bus.$emit('handleRefresh',{str:'refresh'})
    }
  }
}
</script>

<style>
</style>