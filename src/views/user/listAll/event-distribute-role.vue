<template>
  <div>
    <el-form :model="form" ref="form" label-width="120px">
      <el-form-item label="名称" prop="name">
        <el-select v-model="form.roleUuid">
          <el-option
            v-for="item in roleList"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid"
          ></el-option>
        </el-select>
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
      form: {
        alias: "",
        departmentUuids: [],
        name: "",
        position: "",
        roleUuid: "",
        uuid: ""
      }
    };
  },
  watch: {
    user: {
      handler(newVal, oldVal) {
        this.form.alias = newVal.alias;
        this.form.departmentUuids[0] =
          newVal.departments[newVal.departments.length - 1].uuid;
        this.form.name = newVal.name;
        this.form.position = newVal.position;
        this.form.roleUuid = newVal.roleUuid;
        this.form.uuid = newVal.uuid;
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.currentRowUserList,
      roleList: state => state.role.roleList
    })
  },
  methods: {
    closeDialog() {
      this.$parent.$parent.dialogVisible = false;
    },
    handleCancel() {
      this.closeDialog();
    },
    handleConfrim() {
      const payload = this.form;
      this.$store
        .dispatch("user/user_update", payload)
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
    }
  }
};
</script>

<style>
</style>