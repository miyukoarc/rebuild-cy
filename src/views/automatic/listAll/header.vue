<template>
  <el-form ref="searchForm" inline label-width="120px" class="external-user-list-all-header">
    <el-form-item label="规则名称：">
      <el-input v-model.trim="query.ruleName" clearable placeholder="请输入规则名称"></el-input>
    </el-form-item>

    <!-- <el-form-item label="添加渠道：">
      <el-select v-model="query.contractWayId"  @change="handleSelectedChange">
        <el-option
          v-for="(item,index) in contractWay"
          :key="index"
          :label="item.type"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>-->

    <el-form-item label="关键词：">
      <el-input v-model.trim="query.keyWord" clearable placeholder="请输入关键词"></el-input>
    </el-form-item>
    <el-form-item label="回复内容：">
      <el-input v-model.trim="query.replyWord" clearable placeholder="请输入回复内容"></el-input>
    </el-form-item>

    <!-- <el-form-item label="创建员工：">
      <el-select v-model="query.userId" clearable filterable @clear="handleClearable('userId')">
        <el-option
          v-for="item in userListAll"
          :key="item.userId"
          :label="item.name"
          :value="item.userId"
        ></el-option>
      </el-select>
    </el-form-item>-->

    <!-- <el-form-item label="客户标签：">
      <div class="tag-border">
        <el-select filterable v-model="query.tagIds" @change="handleChangeSecond" size="mini" multiple>
          <el-option-group v-for="(item,key) in tagListAll" :key="key" :label="item.groupName">
            <el-option
              v-for="(child,index) in item.tagList"
              :key="index"
              :label="child.tagName"
              :value="child.uuid"
            ></el-option>
          </el-option-group>
        </el-select>
        <span class="tag-warp">
          <el-radio-group v-model="query.flag">
            <el-radio :label="true">包含其一</el-radio>
            <el-radio :label="false">完全匹配</el-radio>
          </el-radio-group>
          <el-tooltip placement="right">
            <div slot="content">
              包含其一：有任意一个选择的标签的用户;
              <br />完全匹配：必须拥有全部选择的标签的用户。
            </div>
            <i class="el-icon-question tip"></i>
          </el-tooltip>
        </span>
      </div>
    </el-form-item>-->

    <el-form-item label="创建时间：">
      <el-date-picker
        :append-to-body="false"
        v-model="value"
        type="daterange"
        :value-format="'yyyy-MM-dd HH:mm:ss'"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="handleSelectedTime"
        :default-time="['00:00:00', '23:59:59']"
      ></el-date-picker>
    </el-form-item>

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
      contractWay: [
        {
          type: "员工主动添加",
          id: "1",
        },
        {
          type: "员工被动添加",
          id: "2",
        },
        {
          type: "二维码扫码添加",
          id: "3",
        },
      ],
      query: {
        ruleName: "",
        keyWord: "",
        replyWord: "",
        // userId: "",
        tagIds: [],
        flag: true,
        startTime: "",
        endTime: "",
      },
      timer: null,
    };
  },
  computed: {
    ...mapState({
      tagListAll: (state) => state.tag.tagListSelect,
      userListAll: (state) => state.user.listSelect,
      //   departments: state => state.department.departments
    }),
  },
  methods: {
    handleSelectedTime(val) {
      if (val) {
        this.query.startTime = this.value[0];
        this.query.endTime = this.value[1];
      } else {
        this.query.startTime = "";
        this.query.endTime = "";
      }
      // this.$emit('handleSearch', this.query)
    },
    handleChangeSecond(val) {
      // if (this.timer) {
      //   clearTimeout(this.timer);
      // }
      // this.timer = setTimeout(() => {
      //   this.$emit("handleSearch", this.query);
      // }, 1000);
    },
    handleSearch() {
      this.$emit("handleSearch", this.query);
    },
    handleRefresh() {
      this.$emit("handleRefresh");
      this.value = this.$options.data().value;
      this.query = this.$options.data().query;
    },
    handleClearable(val) {
      this.query[val] = "";
      // this.$emit("handleSearch", this.query);
    },
  },
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
<style>
.el-date-range-picker {
  width: 520px;
}
</style>