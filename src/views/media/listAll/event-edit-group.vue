<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="100px" label-position="left">
    <el-form-item label="分组名称" prop="groupName">
      <el-input
        v-model.trim="form.groupName"
        maxlength="20"
        show-word-limit
      ></el-input>
    </el-form-item>

    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>

      <el-t-button type="primary" size="small" @click="handleConfirm"
        >确定</el-t-button
      >
    </div>
  </el-form>
</template>

<script>
import { mapState } from "vuex";

export default {
  inject: ["reload"],
  props:{
      transfer: {
          type: Object,
          default: ()=>{}
      }
  },
  data() {
    return {
      form: {
        groupName: "",
        uuid: ''
      },
      rules: {
        groupName: [
          { required: true, message: '请输入组名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  watch:{
      transfer:{
          handler(newVal,oldVal){
              const {groupName,uuid} = newVal
              this.form.groupName = groupName
              this.form.uuid = uuid
          },
          immediate: true

      }
  },
  computed: {
    ...mapState({
      listSelect: state => state.department.listSelect
    })
  },
  mounted() {},
  methods: {
    handleConfirm() {
      const payload = this.form;

      this.$refs["form"].validate(valid => {
        if (valid) {

          this.$store
            .dispatch("media/rename", payload)
            .then(() => {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              this.handleCancel();
              this.$bus.$emit('handleRefresh')
            })
            .catch(err => {
              
              this.$message({
                type: "error",
                message: err||"操作失败"
              });
            });
        } else {
          this.$message({
            type: "error",
            message: "请检查输入"
          });
        }
      });
    },
    handleCancel() {
      this.$parent.$parent.dialogVisible = false;
    }
  }
};
</script>

<style></style>
