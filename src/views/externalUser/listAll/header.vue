<template>
  <el-form ref="searchForm" inline label-width="120px" class="external-user-list-all-header">
    <el-form-item label="客户名称：">
      <el-input v-model.trim="query.name" clearable></el-input>
    </el-form-item>

    <el-form-item label="添加渠道：">
      <el-select v-model="query.userId" clearable @change="handleSelectedChange">
        <el-option
          v-for="item in userListAll"
          :key="item.userId"
          :label="item.name"
          :value="item.userId"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="所属员工：">
      <el-select v-model="query.userId" clearable @change="handleSelectedChange">
        <el-option
          v-for="item in userListAll"
          :key="item.userId"
          :label="item.name"
          :value="item.userId"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="添加时间：">
      <el-date-picker
        v-model="value"
        type="daterange"
        :value-format="'yyyy-MM-dd HH-mm-ss'"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="handleSelectedTime"
      ></el-date-picker>
    </el-form-item>

    <!-- <div class="tag-warp"> -->
    <el-form-item label="客户标签：">
      <div class="tag-border">
        <el-select
          v-model="query.tagIds"
          clearable
          @change="handleSelectedChange"
          size="mini"
          multiple
        >
          <el-option-group v-for="item in tagListAll" :key="item.groupId" :label="item.groupName">
            <el-option
              v-for="child in item.tagList"
              :key="child.uuid"
              :label="child.tagName"
              :value="child.tagId"
            ></el-option>
          </el-option-group>
        </el-select>
        <span class="tag-warp">
          <el-radio-group v-model="query.flag">
            <el-radio :label="true">包含任一</el-radio>
            <el-radio :label="false">完全匹配</el-radio>
          </el-radio-group>
          <el-tooltip placement="right">
            <div slot="content">
              包含任一：有任意一个选择的标签的用户;
              <br />完全匹配：必须拥有全部选择的标签的用户。
            </div>
            <i class="el-icon-question tip"></i>
          </el-tooltip>
        </span>
      </div>
    </el-form-item>

    <!-- </div> -->

    <div class="handle-warp">
      <el-form-item label=" ">
        <el-t-button size="mini" type="primary" @click="handleSearch">搜索</el-t-button>
        <el-t-button size="mini" @click="handleRefresh">重置</el-t-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      value: [],
      query: {
        name: "",
        contractWayId: "",
        userId: "",
        tagIds: [],
        flag: true,
        startTime: "",
        endTime: ""
      }
    };
  },
  computed: {
    ...mapState({
      tagListAll: state => state.tag.tagListSelect,
      userListAll: state => state.user.listSelect
      //   departments: state => state.department.departments
    })
  },
  methods: {
    handleSelectedTime(val) {
      console.log(val);
      this.query.startTime = this.value[0];
      this.query.endTime = this.value[1];
      this.$emit("handleSearch", this.query);
    },
    handleSelectedChange(val) {
      console.log(val);
      this.$emit("handleSearch", this.query);
    },
    handleSearch() {
      this.$emit("handleSearch", this.query);
    },
    handleRefresh() {
      this.$emit("handleRefresh");
      this.query = this.$options.data().query;
    }
  }
};
</script>

<style lang="scss" scoped>
.external-user-list-all-header {
  .tag-border {
    border: 1px solid #dcdfe6;
    padding: 1px 5px;
    border-radius: 4px;
  }
  .tag-warp {
    margin-left: 10px;
    // border: 1px solid #dcdfe6;
    i.tip {
      margin-left: 5px;
    }
    .el-form-item {
      margin-bottom: 0px;
    }
  }
  .handle-warp .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
