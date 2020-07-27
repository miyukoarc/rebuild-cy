<!--
 * @Author: your name
 * @Date: 2020-07-22 15:18:54
 * @LastEditTime: 2020-07-22 16:51:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\property\listAll\event-editBasic.vue
--> 
<template>
  <el-form :model="form" ref="form" label-width="80px">
    <div class="tips display-flex">
      <span>说明：</span>
      <div class="content display-flex align-items-center">
        <span class="display-flex align-items-center">
          <span class="icon-wrap">
            <i
              class="el-icon-success show-icon"
              style="color: #1890ff;font-size:16px;margin-right:5px"
            ></i>
          </span>
          <span class>为显示</span>
        </span>
        <span class="display-flex align-items-center ml-20">
          <i class="circle"></i>
          <span>为不显示</span>
        </span>
      </div>
    </div>
    <div class="basic-info-warp">
      <el-checkbox-group v-model="checkboxGroup1" size="mini" @change="handleChecked">
        <el-checkbox
          :label="item.label"
          border
          v-for="(item,index) in basicData"
          :key="index"
          :disabled="disabledInfo.includes(item.label)"
        ></el-checkbox>
      </el-checkbox-group>
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
  props: {
    transfer: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        label: ""
      },
      checkboxGroup1: ["性别", "姓名"],
      disabledInfo: ["性别", "姓名"],
      basicData: [
        {
          label: "性别",
          uuid: "1"
        },
        {
          label: "姓名",
          uuid: "1"
        },
        {
          label: "年龄",
          uuid: "1"
        },
        {
          label: "地址",
          uuid: "1"
        },
        {
          label: "QQ",
          uuid: "1"
        },
        {
          label: "邮箱",
          uuid: "1"
        },
        {
          label: "微博",
          uuid: "1"
        }
      ]
    };
  },
  watch: {
    transfer: {
      handler(newVal, oldVal) {
        console.log(newVal, "77777");
        if (newVal) {
          this.uuid = newVal.uuid;
          this.form.label = newVal.label;
          this.form.type = newVal.type;
          if (newVal.type == "SELECT") {
            this.form.optionList = JSON.parse(newVal.options);
          }
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      // propertyListAll: state => state.externalUser.propertyListAll
    })
  },
  mounted() {},
  methods: {
    handleChecked() {
      console.log(this.checkboxGroup1, "888");
    },

    del(arr1, arr2) {
      return arr1.filter(v => {
        return arr2.indexOf(v.label) == -1; //第一个数组在第二个数组中不同的项
      });
    },
    add(arr2, arr1) {
      return arr2.filter(v => {
        return arr1.indexOf(v) == -1; //第二个数组在第一个数组中不同的项
      });
    },
    handleConfirm() {
      let a = this.basicData.filter(item => {
        return this.checkboxGroup1.indexOf(item.label);
      });
      let b = this.del(this.basicData, this.checkboxGroup1);
      console.log(a, "aaaa", b);
    },
    handleCancel(formName) {
      this.$parent.$parent.dialogVisible = false;
      this.form = this.$options.data().form;
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.tips {
  margin-bottom: 20px;
  .content {
    user-select: none;
    .icon-warp {
      font-size: 16px;
    }
    .circle {
      width: 14px;
      height: 14px;
      display: inline-block;
      border-radius: 50%;
      background: #fff;
      border: 1px solid #cecece;
      position: relative;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
.basic-info-warp {
  margin-bottom: 10px;
  .el-checkbox {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .el-checkbox.is-bordered + .el-checkbox.is-bordered {
    margin-left: 0px;
  }
  .el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__inner {
    border-radius: 100%;
  }
}
</style>