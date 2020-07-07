<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="120px" label-position="left">
    <el-form-item label="名称" prop="name">
      <el-input v-model.trim="form.name"></el-input>
    </el-form-item>

    <el-form-item label="上级">
        <el-select-tree
                :default-expand-all="true"
                :multiple="false"
                :placeholder="'请选择组织/部门'"
                :popover-min-width="100"
                :data="departmentList"
                :props="{value:'uuid',children:'children',label:'name'}"
                :check-strictly="true"
                v-model="form.parentUuid"
            ></el-select-tree>
      <!-- <el-select v-model="form.parentUuid" placeholder="请选择">
        <el-option
          v-for="item in listSelect"
          :key="item.uuid"
          :label="item.name"
          :value="item.uuid"
        ></el-option>
      </el-select> -->

    </el-form-item>

    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  //   inject: ['reload'],
  data() {
    return {
      form: {
        name: '',
        parentUuid: 1,
        // parent: 0,
        uuid: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    currentDepartment: {
      handler(newVal, oldVal) {
        if (newVal) {
            console.log(newVal)
          this.initData()
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      currentDepartment: state => state.department.currentDepartment,
      listSelect: state => state.department.listSelect,
      departmentList: state => state.department.departmentList
    })
  },
  updated() {
    //   console.log('updated')
    //   this.initData()
  },
  methods: {
    initData() {
      const { name, uuid } = this.currentDepartment
      const parentUuid = this.currentDepartment.parent.uuid
      this.form.name = name
      this.form.parentUuid = parentUuid
      this.form.uuid = uuid
    },
    handleConfirm() {
      const payload = this.form

      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(payload)
          this.$store
            .dispatch('department/updateDepartment', payload)
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
      console.log('刷新')
      const payload = this.$route.params.org
      this.$store
        .dispatch('department/getDepartmentListAll', payload)
        .then(() => {
        //   this.reload()
        })
        .catch(err => {
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