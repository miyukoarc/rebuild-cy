<template>
  <div>
    <el-form :model="form" ref="form" label-width="120px">
      <el-form-item label="名称" prop="name">
        <el-select v-model="form.departmentsUuid" filterable>
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
        departmentsUuid: 0
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.currentRowUserList,
      departments: state => state.department.departments
    })
  },
  methods: {
    closeDialog() {
      this.$parent.$parent.dialogVisible = false
    },
    handleCancel() {
      this.closeDialog()
    },
    handleConfrim() {}
  }
}
</script>

<style>
</style>