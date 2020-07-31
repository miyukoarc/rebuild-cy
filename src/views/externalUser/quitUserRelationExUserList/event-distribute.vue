<template>
  <div>
    <el-form :model="form" ref="form" :rules="rules" label-width="120px">
      <!-- <el-form-item label="分配人员:" prop="departmentsUuid">
        <el-select v-model="form.departmentsUuid">
          <el-option
            v-for="item in userListSelect"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid"
          ></el-option>
        </el-select>
      </el-form-item>-->
      <div>
        <complex-select v-model="selects" :options="departmentList"></complex-select>
      </div>
      <!-- {{user.uuid}} -->
      <div class="text-align-center">
        <el-button size="small" @click="handleCancel">取消</el-button>
        <el-button size="small" type="primary" @click="handleConfrim('form')">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ComplexSelect from "@/components/ComplexSelect";
export default {
  inject: ['reload'],
  props: {
    selectData: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  components: {
    ComplexSelect
  },
  data() {
    return {
      selects: [],
      form: {
        departmentsUuid: ""
      },
      rules: {
        departmentsUuid: [
          {
            required: true,
            message: "请选择分配人员",
            trigger: ["change", "blur"]
          }
        ]
      }
    };
  },
  watch: {
    selectData(newValue, oldValue) {
      console.log(newValue, "33");
      newValue.forEach(item => {
        this.selects.push(item);
      });
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.currentRowUserList,
      departmentList: state => state.department.departmentList,
      userListSelect: state => state.user.listSelect,
      quitUserCurrentRow: state => state.externalUser.quitUserCurrentRow
    })
  },
  methods: {
    closeDialog() {
      this.$parent.$parent.dialogVisible = false;
    },
    handleCancel() {
      this.$refs["form"].resetFields();
      this.selects = this.$options.data().selects;
      this.closeDialog();
    },
    handleConfrim() {
      console.log(this.selects, "selects");
      let takeoverUserId = this.selects.map(item => {
        return item.uuid;
      });
      console.log(takeoverUserId, "a", "selectData");
      let handoverUuids = this.selectData.map(item => {
        return item.uuid;
      });
      // this.$refs["form"].validate(valid => {
      // if (valid) {
      let payload = {
        handoverUuids: handoverUuids,
        takeoverUserId: takeoverUserId.join()
      };
      console.log(payload, "payload");
      this.$store
        .dispatch("externalUser/redistributionExUser", payload)
        .then((res) => {
          console.log(res, "999");
              switch (res) {
                case 0:
                  this.$message({
                    type: "error",
                    message: "分配出现异常，部分未成功"
                  });
                  this.handleCancel();
                  break;
                case -1:
                  this.$message({
                    type: "error",
                    message: "分配失败"
                  });
                  this.handleCancel();
                  break;
                default:
                  this.$message({
                    type: "success",
                    message: "操作成功"
                  });
                  this.handleCancel();
                  this.handleRefresh();
                  break;
              }
          // this.$message({
          //   type: "success",
          //   message: "操作成功"
          // });
          // this.handleCancel();
          // this.$bus.$emit("handleRefresh");
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "操作失败"
          });
        });
      this.$refs["form"].resetFields();
      // } else {
      //   this.$message({
      //     type: "error",
      //     message: "请检查输入"
      //   });
      // }
      // });
    },
    handleRefresh(){
        this.$bus.$emit('handleRefresh')
    },
  }
};
</script>

<style>
</style>