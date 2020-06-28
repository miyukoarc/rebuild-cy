<template>
  <el-form :model="form" ref="form" label-width="100px">
    <el-form-item label="分组名称">
      <el-input
        v-model.trim="form.groupName"
        maxlength="20"
        show-word-limit
      ></el-input>
    </el-form-item>

    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>

      <el-button type="primary" size="small" @click="handleConfirm"
        >确定</el-button
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
          console.log(payload);
          this.$store
            .dispatch("media/rename", payload)
            .then(() => {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              this.handleCancel();
              this.refresh();
            })
            .catch(err => {
              console.log(err);
              this.$message({
                type: "error",
                message: "操作失败"
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
    },
    refresh() {
      this.$store
        .dispatch("media/getMediaGroupListAll")
        .then(() => {
        //   this.reload();
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    }
  }
};
</script>

<style></style>
