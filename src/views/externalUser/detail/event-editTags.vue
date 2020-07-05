<!--
 * @Author: your name
 * @Date: 2020-06-30 17:39:37
 * @LastEditTime: 2020-07-05 18:06:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\externalUser\detail\event-editTags.vue
--> 
<template>
  <el-form :model="form" ref="form">
    <div class="tag-warp">
      <div v-for="(tagGroup,index) in tagListSelect" :key="index" class="tag-list-warp">
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="8">
            <span class="lg-42">{{ tagGroup.groupName }}</span>
          </el-col>
          <el-col :span="16">
            <div class="tag-list display-flex align-items-center flex-wrap">
              <el-checkbox-group
                v-model="checkboxGroup"
                size="small"
                @change="handleCheckedTagsChange(tagGroup,index)"
              >
                <el-checkbox
                  v-for="(tag,idx) in tagGroup.tagList"
                  :key="idx"
                  :label="tag.uuid"
                  border
                  style="margin-bottom:5px"
                >{{ tag.tagName }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="text-align-center">
      <el-t-button size="small" @click="handleCancel">取消</el-t-button>
      <el-t-button type="primary" size="small" @click="handleConfirm">确定</el-t-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    transfer: {
      type: Object
    }
  },
  data() {
    return {
      form: {},
      checkboxGroup: [],
      delTags: [],
      addTags: []
    };
  },
  computed: {
    ...mapState({
      tagListSelect: state => state.tag.tagListSelect,
      editTagsUuid: state => state.externalUser.editTagsUuid
    })
    // checkboxGroup: {
    //   get: function() {
    //     return this.editTagsUuid;
    //   },
    //   set: function(val) {
    //     console.log(val, "val");
    //     return val;
    //   }
    // }
  },
  watch: {},
  created() {
    this.editTagsUuid.map(item => {
      this.checkboxGroup.push(item);
    });
  },
  mounted() {},
  methods: {
    // 选择标签
    handleCheckedTagsChange(tag, index) {
      this.handleConfirm();
    },
    del(arr1, arr2) {
      return arr1.filter(v => {
        return arr2.indexOf(v) == -1; //第一个数组在第二个数组中不同的项
      });
    },
    add(arr2, arr1) {
      return arr2.filter(v => {
        return arr1.indexOf(v) == -1; //第二个数组在第一个数组中不同的项
      });
    },
    // 确认提交修改标签
    handleConfirm() {
      this.delTags = this.del(this.editTagsUuid, this.checkboxGroup);
      this.addTags = this.add(this.checkboxGroup, this.editTagsUuid);
      console.log("删除", this.delTags, "新增", this.addTags);
      // const payload = this.form;

      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log(payload);
          this.$store
            .dispatch("externalUser/updateExTrends", payload)
            .then(() => {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              this.handleCancel();
              this.refresh();
            })
            .catch(err => {
              ;
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
    // 取消关闭弹框
    handleCancel() {
      this.$parent.$parent.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0;
}
.tag-warp {
  position: relative;
  min-height: 50px;
  padding: 14px 18px;
  .is-show {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  .tag-list-warp {
    .lg-42 {
      line-height: 32px;
    }
    .el-tag + .el-tag {
      // margin-left: 10px;
    }
    .button-new-tag {
      margin-right: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 100px;
      margin-left: 10px;
      vertical-align: bottom;
    }
    .tag-list {
      .add-tag {
        margin-right: 10px;
      }
    }
    .deit-tag {
      font-size: 16px;
    }
  }
}
</style>