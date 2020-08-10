<template>
  <div>
    <el-form ref="form" label-width="120px">
      <el-form-item label="名称" prop="name">
        <el-select v-model="roleUuid">
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
      // 变更为的角色
      roleUuid: "",
      // 单人修改角色
      form: {
        alias: "",
        departmentUuids: [],
        name: "",
        position: "",
        uuid: ""
      },
      // 多人修改角色
      forms: [],
      // 是否为多人修改角色，默认为否，即单人
      isBatchUpdate: false
    };
  },
  watch: {
    user: {
      handler(newVal, oldVal) {
        if (Object.keys(newVal) != 0) {
          this.roleUuid = newVal.role.uuid;
          this.isBatchUpdate = false;

          this.form.alias = newVal.alias;
          this.form.name = newVal.name;
          this.form.position = newVal.position;
          this.form.uuid = newVal.uuid;
        }
      },
      immediate: true
    },
    users: {
      handler(newVal, oldVal) {
        if (newVal.length > 0) {
          this.isBatchUpdate = true;
          this.roleUuid = newVal[0].role.uuid;
          newVal.map((obj, index) => {
            this.forms[index] = {
              alias: obj.alias,
              name: obj.name,
              position: obj.position,
              uuid: obj.uuid
            };
          });
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      // 修改单个角色
      user: state => state.user.currentRowUserList,
      // 批量修改多个角色
      users: state => state.user.currentRowUsers,
      roleList: state => state.role.roleListSelect
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
      if (!this.isBatchUpdate) {
        const payload = { ...this.form, roleUuid: this.roleUuid };
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
      } else {
        let promiseList = [];
        this.forms.map((payload, index) => {
          promiseList[index] = this.$store.dispatch("user/user_update", {
            ...payload,
            roleUuid: this.roleUuid
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