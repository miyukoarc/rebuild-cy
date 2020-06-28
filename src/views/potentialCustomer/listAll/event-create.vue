<template>
  <el-form :model="form[0]" ref="form" :rules="rules" label-width="100px">
    <el-form-item label="客户名" prop="name">
      <el-input v-model="form[0].name"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="form[0].mobile"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form[0].remark"></el-input>
      <!-- <el-select  v-model="form.parent" placeholder="请选择">
            <el-option
                :disabled="!hasParent"
                v-for="item in 10"
                :key="item"
                :label="item"
                :value="item"
            ></el-option>
      </el-select>-->
    </el-form-item>

    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from "vuex";

import { isMobilePhone } from "@/utils/validate.js";

export default {
  inject: ["reload"],
  data() {
    // 验证手机号
    const validatePhone = (rule, value, callback) => {
      if (!value || isMobilePhone(value)) {
        callback();
      } else {
        callback(new Error("手机格式不正确"));
      }
    };
    return {
      hasParent: false,
      form: [
        {
          mobile: "",
          name: "",
          remark: ""
        }
      ],
      rules: {
        name: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: validatePhone,
            trigger: ["blur", "change"]
          }
        ],
        remark: [
          { required: true, message: "请输入备注", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    hasParent: {
      handler(newVal, oldVal) {
        if (newVal) {
        }
        if (!newVal) {
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({})
  },
  mounted() {},
  methods: {
    handleConfirm() {
      const payload = this.form;

      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log(payload);
          this.$store
            .dispatch("potentialCustomer/batchAdd", payload)
            .then(() => {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              this.handleCancel();
              this.refresh();
            })
            .catch(err => {
              console.error(err);
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
        .dispatch("potentialCustomer/getListMy")
        .then(() => {
          this.reload();
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

<style>
</style>