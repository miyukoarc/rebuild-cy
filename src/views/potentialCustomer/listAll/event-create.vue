<template>
  <el-form :model="form[0]" ref="form" :rules="rules" label-width="100px">
    <el-form-item label="客户名">
      <el-input v-model="form[0].name"></el-input>
    </el-form-item>

    <el-form-item label="持有人">
      <el-select v-model="form[0].userUuid" style="width:100%">
        <el-option
          v-for="item in userListAll"
          :key="item.userId"
          :label="item.name"
          :value="item.uuid"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="form[0].mobile"></el-input>
    </el-form-item>

    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
    </div>
  </el-form>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

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
          userUuid: ""
        }
      ],
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: validatePhone,
            trigger: ["blur", "change"]
          }
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
    ...mapGetters(['uuid']),
    ...mapState({
      userListAll: state => state.user.listSelect,
    })
  },
  mounted() {
    this.form[0].userUuid = this.uuid
  },
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