<!--
 * @Author: your name
 * @Date: 2020-06-27 14:05:27
 * @LastEditTime: 2020-08-12 15:32:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\potentialCustomer\listAll\event-distribute.vue
--> 
<template>
  <div>
    <el-form :model="form" ref="form" label-width="120px">
      <!-- <el-form-item label="名称" prop="name">
        <el-select v-model="form.userUuid">
          <el-option
            v-for="item in userListSelect"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="分配目标：" prop="userUuid" :rules="rules.userUuid">
        <el-select filterable v-model="form.userUuid" style="width:100%;margin-bottom:20px">
          <el-option
            v-for="(item,index) in userListSelect"
            :key="index"
            :label="item.name"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <complex-select v-model="selects" :options="departmentList"></complex-select> -->
      <!-- {{user.uuid}} -->
      <div class="text-align-center">
        <el-button size="small" @click="handleCancel">取消</el-button>
        <el-t-button size="small" type="primary" @click.native.stop="handleConfrim">确定</el-t-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ComplexSelect from '@/components/ComplexSelect'
export default {
  props: {
    transfer: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    ComplexSelect,
  },
  data() {
    return {
      selects: [],
      form: {
        userUuid: '',
        uuid: [],
      },

      rules: {
        userUuid: [
          { required: true, message: '请选择分配对象', trigger: 'blur' },
        ],
      },
    }
  },
  watch: {
    transfer: {
      handler(newVal, oldVal) {
        console.log(newVal, '8888')
        const { uuid } = newVal
        this.form.uuid = uuid
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      // user: state => state.user.currentRowUserList,
      departmentList: (state) => state.department.departmentList,
      userListSelect: (state) => state.user.listSelect,
    }),
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

      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch('potentialCustomer/allocation', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功',
              })
              this.closeDialog()
              this.handleRefresh()
            })
            .catch((err) => {
              this.$message({
                type: 'error',
                message: err,
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
    code(code) {
      if (code == 1) {
        this.$message({
          type: 'error',
          message: '分配失败',
        })
      } else {
        this.$message({
          type: 'success',
          message: '操作成功',
        })
        this.handleRefresh()
      }
      this.closeDialog()
    },
    handleRefresh() {
      this.$bus.$emit('handleRefresh')
    },
  },
}
</script>

<style>
</style>