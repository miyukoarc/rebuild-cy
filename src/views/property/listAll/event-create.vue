<template>
  <el-form :model="form" ref="form" label-width="100px">
    <el-form-item label="字段名称：" prop="label" :rules="labelRules">
      <el-input v-model="form.label" placeholder="请输入字段名称，不超过5个字" maxlength="5" show-word-limit></el-input>
    </el-form-item>
    <el-form-item label="字段类型：">
      <el-radio-group v-model="form.type">
        <el-radio label="TEXT">文本</el-radio>
        <el-radio label="SELECT">选择</el-radio>
      </el-radio-group>
    </el-form-item>
    <div v-show="form.type == 'SELECT'">
      <el-form-item
        v-for="(option,index) in form.optionList"
        :key="index"
        :prop="'optionList.' + index + '.value'"
        :rules="inputRules"
      >
        <div class="option-list">
          <el-input
            style="width:94%;margin-right:5px"
            ref="inputFocus"
            type="text"
            :placeholder="'选项'+(index+1)"
            v-model="option.name"
            maxlength="15"
            show-word-limit
          ></el-input>
          <i
            class="el-icon-remove-outline"
            v-show="form.optionList.length>1"
            @click="delInput(option)"
          ></i>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="addSelect">
          <i class="el-icon-circle-plus-outline"></i> 添加选项
        </el-button>
      </el-form-item>
    </div>

    <div style="text-align:center;">
      <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
      <el-button type="danger" size="small" @click="handleCancel('form')">取消</el-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from "vuex";

export default {
  inject: ["reload"],
  data() {
    const validateTrim = (rule, value, callback) => {
      console.log(value, "88888");
      if (value.trim()) {
        callback();
      } else {
        callback(new Error("标签不能为空格"));
      }
    };
    return {
      hasParent: false,
      form: {
        label: "",
        type: "TEXT",
        text: "",
        optionList: [
          {
            name: "",
            value: "1"
          }
        ]
      },
      labelRules: [
        { required: true, message: "请输入字段名称", trigger: "blur" }
      ],
      inputRules: [
        { required: true, message: "*选项不能为空", trigger: "blur" },
        { validator: validateTrim, trigger: ["blur", "change"] }
      ]
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
    // "form.optionList": {
    //   handler(newVal, oldVal) {
    //     console.log(newVal, "newar");
    //     this.$nextTick(() => {
    //       //DOM 更新了
    //       console.log(this.$refs.inputFocus,'000')
    //       // document.getElementById("minInput").focus();
    //       // this.$refs.inputFocus.focus();
    //     });
    //   },
    //   immediate: true
    // }
  },
  computed: {
    ...mapState({
      propertyListAll: state => state.externalUser.propertyListAll
    })
  },
  mounted() {},
  methods: {
    handleConfirm() {
      let sort = 0;
      if (this.propertyListAll.length > 0) {
        sort = this.propertyListAll[0].sort;
      }
      let payload = {};
      payload.label = this.form.label;
      payload.sort = sort + 1;
      payload.type = this.form.type;
      if (this.form.type == "SELECT") {
        payload.optionList = this.form.optionList;
      }
      console.log(payload, "payload");
      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log(payload, "77ddd");
          this.$store
            .dispatch("externalUser/propertyAdd", payload)
            .then(() => {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              this.refresh();
              this.handleCancel("form");
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: err
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
    addSelect() {
      console.log(this.form.optionList);
      this.form.optionList.push({
        name: "",
        value: this.form.optionList.length + 1 + ""
      });
    },
    // focusInput() {
    //   this.$refs.inputFocus[0].focus();
    // },
    delInput(item) {
      let index = this.form.optionList.indexOf(item);
      if (index > -1) {
        this.form.optionList.splice(index, 1);
      }
    },
    handleCancel(formName) {
      this.$parent.$parent.dialogVisible = false;
      this.$refs[formName].resetFields();
      this.form = this.$options.data().form;
    },
    refresh() {
      this.$store
        .dispatch("externalUser/getPropertyListAll")
        .then(() => {})
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
.option-list {
  margin-bottom: 10px;
}
</style>