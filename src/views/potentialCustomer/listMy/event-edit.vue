<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="100px">
    <el-form-item label="客户名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="form.mobile" disabled></el-input>
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
        :packUp="true"
        :isShow="true"
      ></tags-selected>
    </div>

    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from "vuex";
import TagsSelected from "@/components/TagsSelected";
export default {
  inject: ["reload"],
  props: {
    transfer: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    TagsSelected,
  },
  data() {
    return {
      checkboxGroup: [],
      hasParent: false,
      changeTag: false,
      form: {
        mobile: "",
        name: "",
        tagId: [],
        belongUuid: "",
        uuid: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        remark: [
          { required: true, message: "请输入备注", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    transfer: {
      handler(newVal, oldVal) {
        console.log(newVal, "newVal");
        const { belong, uuid, selectedTag, mobile, name } = newVal;
        this.form.name = name;
        this.form.belongUuid = belong.uuid;
        this.form.uuid = uuid;
        this.form.mobile = mobile;
        if (selectedTag.length > 0) {
          selectedTag.map((item) => {
            this.form.tagId.push(item);
          });
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      tagListSelect: (state) => state.tag.tagListSelect,
    }),
  },
  mounted() {},
  methods: {
    // 选择标签
    handleCheckedTagsChange(tag, index) {
      this.changeTag = true;
      this.checkboxGroup = tag;
    },
    // 确认提交潜在客户
    handleConfirm() {
      if (this.changeTag) {
        this.form.tagId = this.checkboxGroup;
      }
      // console.log(this.form, "99",this.checkboxGroup);
      this.$store
        .dispatch("potentialCustomer/potentialCustomerUpdate", this.form)
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功"
          });
          this.handleCancel();
          this.$bus.$emit('handleRefresh')
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "操作失败"
          });
        });
    },
    // handleConfirm() {
    //   const payload = this.form;

    //   this.$refs["form"].validate(valid => {
    //     if (valid) {
    //       console.log(payload);
    //       this.$store
    //         .dispatch("potentialCustomer/batchAdd", payload)
    //         .then(() => {
    //           this.$message({
    //             type: "success",
    //             message: "操作成功"
    //           });
    //           this.handleCancel();
    //           this.refresh();
    //         })
    //         .catch(err => {
    //           console.error(err);
    //           this.$message({
    //             type: "error",
    //             message: "操作失败"
    //           });
    //         });
    //     } else {
    //       this.$message({
    //         type: "error",
    //         message: "请检查输入"
    //       });
    //     }
    //   });
    // },
    handleCancel() {
      this.$parent.$parent.dialogVisible = false;
    },
    refresh() {
      this.$store
        .dispatch("potentialCustomer/getListMy")
        .then(() => {
          this.reload();
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });
    },
  },
};
</script>

<style>
</style>