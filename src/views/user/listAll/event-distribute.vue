<template>
  <div>
    <el-form ref="form" label-width="120px">
      <el-form-item label="名称" prop="name">
        <el-select-tree
          v-model="depUuid"
          placeholder="请选择部门"
          :defaultExpandAll="true"
          :checkStrictly="true"
          :data="departmentList"
          :props="departmentProps"
        ></el-select-tree>
      </el-form-item>

      <div class="text-align-center">
        <el-button size="small" @click="handleCancel">取消</el-button>
        <el-button size="small" type="primary" @click="handleConfrim">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      depUuid: "",
      departmentProps: {
        value: "uuid",
        label: "name",
        children: "children"
      },
      form: {
        userId: ""
      },
      forms: [],
      isBatchUpdate: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.currentRowUserList,
      users: state => state.user.currentRowUsers,
      departmentList: state => state.department.listSelect
    })
  },
  watch: {
    user: {
      handler(newVal, oldVal) {
        if (Object.keys(newVal) != 0) {
          this.depUuid = newVal.departments[0].uuid;
          this.isBatchUpdate = false;

          this.form.userId = newVal.userId;
        }
      },
      immediate: true
    },
    users: {
      handler(newVal, oldVal) {
        if (newVal.length > 0) {
          this.depUuid = newVal[0].departments[0].uuid;
          this.isBatchUpdate = true;

          newVal.map((obj, index) => {
            this.forms[index] = {
              userId: obj.userId
            };
          });
        }
      },
      immediate: true
    }
  },
  methods: {
    closeDialog() {
      this.$parent.$parent.dialogVisible = false;
    },
    handleCancel() {
      this.closeDialog();
    },
    handleConfrim() {
      if (!this.isBatchUpdate) {
        const payload = { ...this.form, depUuid: this.depUuid };
        this.$store
          .dispatch("department/allocation", payload)
          .then(res => {
            this.$message({
              type: "success",
              message: "操作成功"
            });
            this.$bus.$emit("handleRefresh");
            this.closeDialog();
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: err
            });
          });
      } else {
        let promiseList = [];
        this.forms.map((payload, index) => {
          promiseList[index] = this.$store.dispatch("department/allocation", {
            ...payload,
            depUuid: this.depUuid
          });
        });

        Promise.all(promiseList)
          .then(res => {
            this.$message({
              type: "success",
              message: "操作成功"
            });
            this.$bus.$emit("handleRefresh");
            this.closeDialog();
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: err
            });
            this.$bus.$emit("handleRefresh");
            this.closeDialog();
          });
      }
    }
  }
};
</script>

<style>
</style>