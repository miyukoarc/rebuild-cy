<!--
 * @Author: your name
 * @Date: 2020-06-27 14:05:27
 * @LastEditTime: 2020-07-11 16:44:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\potentialCustomer\listAll\event-distribute.vue
--> 
<template>
  <div>
    <el-form :model="form" ref="form" label-width="120px">
      <el-form-item label="名称" prop="name">
        <el-select v-model="form.userUuid">
          <el-option
            v-for="item in userListSelect"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- {{user.uuid}} -->
      <div class="text-align-center">
        <el-button size="small" @click="handleCancel">取消</el-button>
        <el-button size="small" type="primary" @click="handleConfrim">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    transfer: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        userUuid: '',
        uuid: [],
      }
    }
  },
  watch:{
    transfer: {
      handler(newVal,oldVal){
        console.log(newVal,'77')  
        const {uuid} = newVal
        this.form.uuid = uuid
      }
      ,immediate:true
    }
  },
  computed: {
    ...mapState({
      // user: state => state.user.currentRowUserList,
      // departments: state => state.department.departments
      userListSelect: state => state.user.listSelect
    })
  },
  methods: {
    closeDialog() {
      this.$parent.$parent.dialogVisible = false
    },
    handleCancel() {
      this.closeDialog()
    },
    handleConfrim() {
      const payload = this.form
      this.$store.dispatch('potentialCustomer/allocation',payload).then(()=>{
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        this.closeDialog()
        this.handleRefresh()
        
      }).catch(err=>{
        this.$message({
          type: 'error',
          message: err
        })

      })
    },
    handleRefresh(){
      this.$bus.$emit('handleRefresh')
    }
  }
}
</script>

<style>
</style>