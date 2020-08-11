<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="100px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="上级">
        <el-checkbox v-model="hasParent">是否为子部门</el-checkbox>
    </el-form-item>
    <el-form-item>
        <el-select  v-model="form.parent" placeholder="请选择">
            <el-option
                :disabled="!hasParent"
                v-for="item in 10"
                :key="item"
                :label="item"
                :value="item"
            ></el-option>
        </el-select>
    </el-form-item>
    
    <el-form-item>
      <el-button type="danger" size="small" @click="handleCancel">取消</el-button>
      <el-t-button type="primary" size="small" @click="handleConfirm">确定</el-t-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'

export default {
    inject: ['reload'],
  data() {
    return {
      hasParent: false,
      form: {
        name: '',
        code: '',
        org: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
      hasParent:{
          handler(newVal,oldVal){
              if(newVal){

              }
              if(!newVal){

              }
          },
          immediate:true
      }
  },
  computed: {
      ...mapState({
      })
  },
  mounted(){
  },
  methods: {
    handleConfirm() {
      const payload = this.form

      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(payload)
          this.$store
            .dispatch('role/addRole', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.handleCancel()
              this.refresh()
            })
            .catch(err => {
              
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            })
        } else {
          this.$message({
            type: 'error',
            message: '请检查输入'
          })
        }
      })
    },
    handleCancel() {
      this.$parent.$parent.dialogVisible = false
    },
    refresh() {
      this.$store.dispatch('role/getRoleList').then(()=>{
          this.reload()
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    }
  }
}
</script>

<style>
</style>