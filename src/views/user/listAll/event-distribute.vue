<template>
  <div>
    <el-form :model="form" ref="form" label-width="120px">
      <el-form-item label="名称" prop="name">
        <el-select v-model="form.depUuid">
          <el-option
            v-for="item in departments"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>
      {{user.uuid}}
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
  data() {
    return {
      form: {
        depUuid: '',
        userId: ''
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.currentRowUserList,
      departments: state => state.department.listSelect
    })
  },
  watch: {
    user: {
      handler(newVal, oldVal) {
          this.form.userId = newVal.userId
      },
      immediate:true
    }
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
        this.$store.dispatch('department/allocation',payload).then((res)=>{
            this.$message({
                type: 'success',
                message: '操作成功'
            })
            this.$bus.$emit('handleRefresh')
            this.closeDialog()
        }).catch(err=>{
            this.$message({
                type: 'error',
                message: err
            })
            // this.closeDialog()
        })
    }
  }
}
</script>

<style>
</style>