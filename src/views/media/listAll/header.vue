<template>
  <el-form ref="searchForm" inline label-width="120px" class="external-user-list-all-header">
    <el-form-item label="创建人：">
      <!-- <el-input v-model.trim="query.cratorUuid" clearable placeholder="请输入创建人名称"></el-input> -->
      <el-select
        v-model="query.cratorUuid"
        filterable
        placeholder="请选择"
        :popper-append-to-body="false"
      >
        <el-option
          v-for="item in userListAll"
          :key="item.uuid"
          :value="item.uuid"
          :label="item.name"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="时间：">
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

    <!-- <el-form-item label="关键字：">
      <el-input v-model.trim="query.fileName" clearable placeholder="请输入关键字"></el-input>
    </el-form-item>-->

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
        fileName: "",
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
  created() {
    this.initFilter();
  },
  methods: {
    initFilter() {
      this.$store
        .dispatch("user/getUserListSelect")
        .then(() => {})
        .catch((err) => {
          console.error(err);
          this.$message({
            type: "error",
            message: err || "初始化失败",
          });
        });
    },
    handleSelectedTime(val) {
      if (val) {
        this.query.startTime = this.value[0];
        this.query.endTime = this.value[1];
      } else {
        this.query.startTime = "";
        this.query.endTime = "";
      }
      //   this.$emit('handleSearch', this.query)
    },
    handleChangeSecond(val) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.$emit("handleSearch", this.query);
      }, 1000);
    },
    handleSelectedChange(val) {
      this.$emit("handleSearch", this.query);
    },
    handleSearch() {
      this.$emit("handleSearch", this.query);
    },
    handleRefresh() {
      this.$bus.$emit("handleMediaRefresh");
      this.value = this.$options.data().value;
      this.query = this.$options.data().query;
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
