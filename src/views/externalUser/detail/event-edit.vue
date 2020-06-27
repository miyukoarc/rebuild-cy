<template>
  <el-form :model="form" ref="form" >


    <el-form-item label="自定义动态" >
      <el-input type="textarea" maxlength="100"
  show-word-limit v-model.trim="form.remark"></el-input>
    </el-form-item>


    <!-- <el-form-item label="上级">
      <el-checkbox v-model="hasParent">是否为子部门</el-checkbox>
    </el-form-item>

    <el-form-item>
      <el-select v-model="form.parent" placeholder="请选择">
        <el-option
          :disabled="!hasParent"
          v-for="item in 10"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item> -->
    <div class="text-align-center">
      <el-t-button  size="small" @click="handleCancel">取消</el-t-button>
      <el-t-button type="primary" size="small" @click="handleConfirm">确定</el-t-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
        transfer: {
            type: Object,
            default: ()=>{}
        }
    },
  inject: ['reload'],
  data() {
    return {
      hasParent: false,
      form: {
        remark: '',
        externalUserId: '',
        uuid: 0
      }
    }
  },
  computed: {
    ...mapState({
        externalUserDetail: state => state.externalUser.externalUserDetail,
    })
  },
  watch:{
      transfer:{
          handler(newVal,oldVal){
              console.log(newVal)
              this.form.uuid = newVal.uuid
              this.form.remark = newVal.remark
          },immediate:true
      }
  },
  mounted(){
      this.form.externalUserId = this.externalUserDetail?.externalUser?.externalUserId
  },
  methods: {
    handleConfirm() {
      const payload = this.form

      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(payload)
          this.$store
            .dispatch('externalUser/updateExTrends', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.handleCancel()
              this.refresh()
            })
            .catch(err => {
              console.log(err)
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
        this.reload()
      console.log('刷新')
    //   this.$store
    //     .dispatch('role/getRoleList')
    //     .then(() => {
    //       this.reload()
    //     })
    //     .catch(err => {
    //       this.$message({
    //         type: 'error',
    //         message: err
    //       })
    //     })
    }
  }
}
</script>

<style>
</style>