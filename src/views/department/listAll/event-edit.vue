<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="120px" label-position="left">
    <el-form-item label="名称" prop="name">
      <el-input v-model.trim="form.name"></el-input>
    </el-form-item>

    <el-form-item label="上级" v-if="type!=='HEAD'">
      <el-select-tree
        :default-expand-all="true"
        :multiple="false"
        :placeholder="'请选择组织/部门'"
        :popover-min-width="100"
        :data="departmentList"
        :disabledValues="disabledValues"
        :props="{value:'uuid',children:'children',label:'name'}"
        :check-strictly="true"
        :disabled="type=='BRANCH'"
        v-model="form.parentUuid"
      ></el-select-tree>
    </el-form-item>

    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
import { flattenTree } from '@/utils/common'
export default {
  props: {
    transfer: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      type: 'HEAD',
      form: {
        name: '',
        parentUuid: 1,
        uuid: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur',
          },
        ],
      },
      businessBanded: [],
      disabledValues: []
    }
  },
  watch: {
    transfer: {
      handler(newVal, oldVal) {
        if (newVal.uuid) {
          const { name, uuid, type } = newVal
          const parentUuid = newVal.parent?.uuid
          this.type = type
          this.form.name = name
          this.form.parentUuid = parentUuid || this.form.parentUuid
          this.form.uuid = uuid
        }
      },
      immediate: true,
    },
    type:{
        handler(newVal,oldVal){
            if(newVal==='HEAD'){
                // this.$delete(this.form,'parentUuid')
                this.form.parentUuid = null
            }
            if(newVal==='BRANCH'){

            }

            if(newVal==='BUSINESS'){
                this.disabledValues = this.businessBanded
            }

            if(newVal==='DEPT'){
                this.disabledValues =[]
            }
        },immediate:true
    }
  },
  computed: {
    ...mapState({
      currentDepartment: (state) => state.department.currentDepartment,
      listSelect: (state) => state.department.listSelect,
      departmentList: (state) => state.department.departmentList,
    }),
  },
  created() {
    if (this.departmentList.length) {
      const arr = flattenTree(this.departmentList)
      const businessBanded = arr.filter(item=>{return item.type=='DEPT'||item.type=='BUSINESS'}).map(item=>{return item.uuid})
      this.businessBanded = businessBanded
    }
  },
  methods: {
    handleConfirm() {
      const payload = this.form

      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log(payload)
          this.$store
            .dispatch('department/updateDepartment', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功',
              })
              this.handleCancel()
              this.refresh()
            })
            .catch((err) => {
              this.$message({
                type: 'error',
                message: '操作失败',
              })
            })
        } else {
          this.$message({
            type: 'error',
            message: '请检查输入',
          })
        }
      })
    },
    handleCancel() {
      this.$parent.$parent.dialogVisible = false
    },
    refresh() {
      const payload = this.$route.params.org
      this.$store
        .dispatch('department/getDepartmentListAll', payload)
        .then(() => {
          //   this.reload()
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err,
          })
        })
    },
  },
}
</script>

<style>
</style>