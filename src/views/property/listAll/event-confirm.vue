<!--
 * @Author: your name
 * @Date: 2020-07-21 16:45:08
 * @LastEditTime: 2020-07-21 20:08:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\property\listAll\event-confirm.vue
--> 
<template>
  <div>
    <div style="margin-bottom:20px">
      确认删除【
      <span>{{transfer.label}}</span> 】？
    </div>
    <div style="text-align:center;">
      <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
      <el-button type="danger" size="small" @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    transfer: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      uuid: ""
    };
  },
  watch: {
    transfer: {
      handler(newVal, oldVal) {
        console.log(newVal, "77777");
        if (newVal) {
          const { uuid } = newVal;
          this.uuid = uuid;
        }
      },
      immediate: true
    }
  },
  methods: {
    handleCancel() {
      this.$parent.$parent.dialogVisible = false;
    },
    handleConfirm() {
      let payload = {
        uuid: this.uuid
      };

      this.$store
        .dispatch("externalUser/propertyDelete", payload)
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功"
          });
          this.handleCancel();
          this.reload();
        })
        .catch(err => {
          console.log(err);
        });
      // this.isShow = false;
      // let index = this.fieldData.indexOf(item);
      // if (index > -1) {
      //   this.fieldData.splice(index, 1);
      // }
    },
    reload() {
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

<style lang="scss" scoped>
</style>