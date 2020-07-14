<!--
 * @Author: your name
 * @Date: 2020-07-11 11:14:09
 * @LastEditTime: 2020-07-13 17:32:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\components\tagsSelected\index.vue
--> 
<template>
  <div class="tag-warp">
    <div v-for="(tagGroup,index) in newTagsList" :key="index" class="tag-list-warp">
      <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="8">
          <span class="lg-42">{{ tagGroup.groupName }}</span>
        </el-col>
        <el-col :span="16">
          <div class="tag-list display-flex align-items-center flex-wrap">
            <el-checkbox-group
              v-model="checkedGroup"
              size="small"
              @change="handleCheckedTagsChange"
            >
              <el-checkbox-button
                v-for="(tag,idx) in tagGroup.tagList"
                :key="idx"
                :label="tag.tagId"
                border
                style="margin-bottom:5px;margin-right:5px"
              >{{ tag.tagName }}</el-checkbox-button>
            </el-checkbox-group>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    tagListSelect: {
      type: Array,
      default: () => {
        return [];
      }
    },
    checkboxGroup: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    ...mapState({
      // tagListSelect: state => state.tag.tagListSelect,
      // editTagsUuid: state => state.externalUser.editTagsUuid
    })
  },
  data() {
    return {
      checkedGroup: [],
      newTagsList: []
    };
  },
  created() {},
  mounted() {
    this.checkedGroup = this.checkboxGroup;
    if (this.checkedGroup.length > 0) {
      this.newTagsList = JSON.parse(JSON.stringify(this.tagListSelect));
      this.newTagsList.map((item, index) => {
        let isTrue = item.tagList.some(tag =>
          this.checkedGroup.includes(tag.tagId)
        );
        if (isTrue) {
          this.newTagsList.splice(index, 1);
          this.newTagsList.unshift(item);
        }
      });
    } else {
      this.newTagsList = JSON.parse(JSON.stringify(this.tagListSelect));
    }
  },
  methods: {
    handleCheckedTagsChange(val) {
      this.$emit("change", val);
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

<style lang="scss">
.tag-warp {
  .el-checkbox-button:first-child .el-checkbox-button__inner {
    border-radius: 0px;
  }
  .el-checkbox-button:last-child .el-checkbox-button__inner {
    border-radius: 0px;
  }
  .el-checkbox-button span.el-checkbox-button__inner {
    border-radius: 0px;
  }
  .el-checkbox-button.is-checked .el-checkbox-button__inner {
    border-color: #409eff;
  }
  .el-checkbox-button--small .el-checkbox-button__inner {
    padding: 5px 10px;
  }
  .el-checkbox-button__inner {
    border-left: 1px solid #dcdfe6;
  }
}
</style>