<template>
  <el-form :model="form" ref="form" label-width="100px">
    <el-form-item label="内容">
      <el-input
        v-model.trim="form.content"
        maxlength="4000"
        type="textarea"
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
    props: {
        transfer: {
            type: Object,
            default:()=>{}
        }
    },
  data() {
    return {
      form: {
          type: 'TEXT',
        content: "",
        groupUuid: ''
      }
    };
  },
  watch: {
      transfer:{
          handler(newVal,oldVal){
            //   console.log()
            const {uuid} = newVal
            this.form.groupUuid = uuid
          },immediate:true
      }
  },
  computed: {
    ...mapState({
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
            .dispatch("media/addMedia", payload)
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
