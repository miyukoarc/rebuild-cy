<template>
  <el-form :model="form" ref="form" label-position="left" :rules="rules" label-width="100px">
    <el-form-item label="客户名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="持有人">
      <el-select v-model="form.belongUuid" style="width:100%">
        <el-option
          v-for="item in userListAll"
          :key="item.userId"
          :label="item.name"
          :value="item.uuid"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="form.mobile"></el-input>
    </el-form-item>

    <el-form-item label="预设标签">
      <label slot="label" class="tag-label">
        预设标签
        <el-tooltip class="item" effect="dark" content="添加成为用户后，将自动打上预设标签" placement="right">
          <i class="el-icon-question tip"></i>
        </el-tooltip>
      </label>
    </el-form-item>
    <div>
      <tags-selected
        @change="handleCheckedTagsChange"
        :tagListSelect="tagListSelect"
        :checkboxGroup="form.tagId"
      ></tags-selected>
      <!-- <tag-select v-model="form.tagsUuid" :options="tagListSelect"></tag-select> -->
    </div>

    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
    </div>
  </el-form>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import TagsSelected from "@/components/TagsSelected";

import { isMobilePhone } from "@/utils/validate.js";

export default {
  inject: ["reload"],
  components: {
    TagsSelected
  },
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
      form: {
        belongUuid: "",
        mobile: "",
        name: "",
        tagId: []
      },
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: validatePhone,
            trigger: ["blur", "change"]
          }
        ]
      },
      result: []
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
    ...mapGetters(["uuid"]),
    ...mapState({
      userListAll: state => state.user.listSelect,
      tagListSelect: state => state.tag.tagListSelect
    })
  },
  created() {
    this.initFilter();
  },
  mounted() {
    this.form.belongUuid = this.uuid;
  },
  methods: {
    /**
     * 初始化筛选信息
     */
    initFilter() {
      this.$store
        .dispatch("tag/getListSelect")
        .then(() => {})
        .catch(err => {
          this.$message({
            type: "error",
            message: "初始化失败"
          });
        });
    },
    // 选择标签
    handleCheckedTagsChange(tag, index) {
      this.checkboxGroup = tag;
    },
    handleConfirm() {
      this.form.tagId = this.checkboxGroup;
      this.$refs["form"].validate(valid => {
        if (valid) {
          // console.log(payload, "8888");
          // let tagsUuids = Array.prototype.concat.apply([], payload.tagId);
          // payload.tagId = tagsUuids;
          this.$store
            .dispatch("potentialCustomer/batchAdd", this.form)
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
          // this.reload();
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

<style lang="scss" scoped>
.tag-label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
