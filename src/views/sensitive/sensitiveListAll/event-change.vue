<template>
  <el-form :model="form" ref="form" label-width="80px" label-position="left">
    <el-form-item label="被通知人">
      <div class="display-flex align-items-center">
        <!-- <el-radio v-model="form.informType" label="USER">员工</el-radio> -->
        <el-radio v-model="form.informType" label="ROLE">角色</el-radio>
        <div>
          <strong class="font-es">推送上级：</strong>
          <el-switch v-model="form.noticeType"></el-switch>
          <span class="font-exs ml-5">开启开关后，上级部门将受到触发敏感词通知</span>
        </div>
      </div>
    </el-form-item>

    <el-form-item label=" ">
      <div class="mb-20">
        <keep-alive>
          <div class="role-container mb-20">
            <el-select v-model="roleSelects" multiple>
              <el-option
                v-for="item in listSelect"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid"
              ></el-option>
            </el-select>
          </div>
          <!-- <div v-else> -->
          <!-- <multi-tree-select v-model="userSelects" :section="'user'" :multiple="true"></multi-tree-select> -->
          <!-- <complex-select v-model="userSelects" :section="'user'" :options="departmentList"></complex-select> -->
          <!-- </div> -->
        </keep-alive>
        <span class="font-exs color-info">当员工触发敏感词后，除通知以上设置被通知人，触发的员工本人也将收到通知消息。</span>
      </div>
    </el-form-item>
    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-t-button type="primary" size="small" @click="handleConfirm">确定</el-t-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  inject: ["reload"],
  props: {
    transfer: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      roleSelects: [],
      userSelects: [],
      form: {
        informType: "ROLE", //USER//ROLE
        sensitiveUuid: [],
        noticeUuid: [],
        noticeType: false,
      },
    };
  },
  watch: {
    transfer: {
      handler(newVal, oldVal) {
        this.form.sensitiveUuid = newVal.sensitiveUuid;
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      //   departmentList: (state) => state.department.departmentList,
      listSelect: (state) => state.role.roleListSelect,
    }),
  },
  created() {
    this.initFilter();
  },
  methods: {
    initFilter() {
      this.$store
        .dispatch("role/getRoleListSelect")
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: "error",
            message: err || "初始化失败",
          });
        });

      //   this.$store
      //     .dispatch("department/getDepartmentListAll")
      //     .then(() => {})
      //     .catch((err) => {
      //       this.$message({
      //         type: "error",
      //         message: err || "初始化失败",
      //       });
      //     });
    },
    handleCancel() {
      this.$parent.$parent.dialogVisible = false;
    },
    handleConfirm() {
      const noticeUuid = this.userSelects.length
        ? this.userSelects.map((item) => {
            return item.uuid;
          })
        : this.roleSelects.map((item) => {
            return item;
          });
      const payload = { ...this.form, noticeUuid };
      this.$store
        .dispatch("sensitive/updateNoticeUser", payload)
        .then((res) => {
          if (res.length == 0) {
            this.$message({
              type: "success",
              message: "操作成功",
            });
            this.handleRefresh();
            this.handleCancel();
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err || "操作失败",
          });
        });
    },
    handleRefresh() {
      let payload = {
        page: 0,
        size: 10,
      };
      this.$store.dispatch("sensitive/getSensitiveListAll", payload);
    },
  },
};
</script>

<style>
</style>