<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="120px" label-position="left">
    <el-form-item label="企业：">
      <!-- <el-select-tree
        :default-expand-all="defaultExpandAll"
        :multiple="multiple"
        :placeholder="placeholder"
        :disabled="disabled"
        :popover-min-width="100"
        :data="treeData"
        :props="treeProps"
        :disabled-values="disabledValues"
        :check-strictly="checkStrictly"
        :clearable="clearable"
        v-model="value1"
      ></el-select-tree>-->
      <!-- <el-input v-model.trim="form.name"></el-input> -->
      <!-- <el-select  v-model="form.orgUuid" placeholder="请选择">
            <el-option
                v-for="item in 10"
                :key="item"
                :label="item"
                :value="item"
            ></el-option>
      </el-select>-->
      <el-select-tree
        :default-expand-all="true"
        :multiple="false"
        :placeholder="'请选择组织/部门'"
        :popover-min-width="100"
        :data="listSelect"
        :props="{value:'uuid',children:'children',label:'name'}"
        :check-strictly="true"
        v-model="form.tenantId"
      ></el-select-tree>
    </el-form-item>
    <!-- <el-form-item label="code" prop="code">
      <el-input v-model.trim="form.code"></el-input>
    </el-form-item>-->

    <!-- <el-form-item> -->

    <!-- </el-form-item> -->
    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-t-button type="primary" size="small" @click="handleConfirm">确定</el-t-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  inject: ['reload'],

  data() {
    return {
      form: {
        name: '',
        code: '',
        tenantId: '',
        // uuid: ''
        // org: ''
      },
      rules: {
        name: [
          { required: true, message: '请选择节点', trigger: 'blur' },
        //   {
        //     min: 3,
        //     max: 20,
        //     message: '长度在 3 到 20 个字符',
        //     trigger: 'blur',
        //   },
        ],
        code: [
          { required: true, message: '请输入角色code', trigger: 'blur' },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  watch: {},
  computed: {
    ...mapState({
        listSelect: state => state.department.listSelect
    }),
  },
  created() {
    this.initFilter()
  },
  mounted() {},
  methods: {
    handleClick(e) {
      console.log(e)
    },
    initFilter() {
      this.$store
        .dispatch('department/getDepartmentListSelect')
        .then(() => {})
        .catch((err) => {
          console.error(err)
        })
    },
    handleConfirm() {
      const tenantId = this.form.tenantId

      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch('role/getRoleList', {tenantId})
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功',
              })
              this.handleCancel()
            //   this.$bus.$emit('handleRefresh')
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
      this.$store
        .dispatch('role/getRoleList')
        .then(() => {
          this.reload()
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