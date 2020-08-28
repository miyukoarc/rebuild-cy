<template>
  <div>
    <el-form :model="form" ref="form" :rules="rules" label-width="100px">
      <div>已选择{{transfer.length}}名用户，查看列表</div>
      <br />

      <el-form-item label="消息内容：" prop="content">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>

      <el-form-item label="开始时间：" prop="startTime">
        <el-date-picker
          popper-class="addBatchTaskDatePicker"
          v-model="form.startTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>

      <div class="text-align-center">
        <el-button size="small" @click="handleCancel">取消</el-button>
        <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    transfer: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      form: {
        // customerUuids: [],
        startTime: "",
        content: "",
      },
      rules: {
        startTime: [
          { required: true, message: "请输入正确的时间格式", trigger: "blur" },
        ],
        content: [
          { required: true, message: "消息内容为必填项", trigger: "blur" },
        ],
      },
      pickerOptions: {
        disabledDate: (time) => time.getTime() < Date.now() - 8.64e7,
        shortcuts: [
          {
            text: "15秒后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 1000 * 15);
              picker.$emit("pick", date);
            },
          },
          {
            text: "30秒后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 1000 * 30);
              picker.$emit("pick", date);
            },
          },
          {
            text: "1分钟后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 1000 * 60);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  methods: {
    handleCancel() {
      this.$parent.$parent.dialogVisible = false;
    },
    handleConfirm() {
      let customerUuids = [];
      this.transfer.map((obj, index) => {
        customerUuids[index] = obj.uuid;
      });
      const payload = { ...this.form, customerUuids };
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log(payload);
          this.$store
            .dispatch("potentialCustomer/batchAddTask", payload)
            .then(() => {
              this.$message({
                type: "success",
                message: "操作成功",
              });
              this.handleCancel();
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: "操作失败",
              });
            });
        } else {
          this.$message({
            type: "error",
            message: "请检查输入",
          });
        }
      });
    },
  },
};
</script>

<style>
.addBatchTaskDatePicker .el-picker-panel__footer .el-button--text {
  display: none;
}
</style>