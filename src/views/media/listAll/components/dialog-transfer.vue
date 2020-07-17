<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :modal-append-to-body="false"
    center
    append-to-body
    width="600px"
    :close-on-click-modal="false"
  >
    <el-form :model="form" ref="form" :rules="rules" label-width="100px" label-position="left">
      <el-form-item label="分组" prop="uuid">
        <el-select v-model="form.uuid" @change="handleChange">
          <el-option
            v-for="item in options"
            :key="item.uuid"
            :label="item.groupName"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>

      <div class="text-align-center">
        <el-t-button size="small" @click="handleCancel">取消</el-t-button>
        <el-t-button size="small" type="primary" @click="handleConfirm">确定</el-t-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: null
    },
    options: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      title: '移至分组',
      dialogVisible: false,
      uuid: '', //groupUuid
      rules: {
        uuid: [{ required: true, message: '请选择目标分组', trigger: 'blur' }]
      },
      form: {
          uuid: ''
      }
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.form.uuid = newVal
        }
      },
      immediate: true
    }
  },
  methods: {
    handleChange() {
      this.$emit('change', this.form.uuid)
    },
    handleCancel() {
      this.dialogVisible = false
    },
    handleConfirm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('handleTransfer')
        } else {
          this.$message({
            type: 'warning',
            message: '请检查输入'
          })
        }
      })
      // this.$emit('handleTransfer')
    }
  }
}
</script>

<style>
</style>