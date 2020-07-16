<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <div slot="header" class="clearfix">
        <span>任务详情</span>
      </div>
      <el-form label-width="100px">
        <el-form-item label="创建人：">
          <user-tag :hasPop="false" :user="detail.creator"></user-tag>
        </el-form-item>
        <el-form-item label="开始时间：">{{detail.startTime}}</el-form-item>
        <el-form-item label="邀请消息：">{{detail.content}}</el-form-item>
      </el-form>
    </el-card>

    <el-card class="content-spacing">
      <div slot="header" class="clearfix">
        <span>数据统计</span>
      </div>
    </el-card>

    <el-card class="content-spacing">
      <header-detail @handleSearch="handleSearch" @handleRefresh="handleRefresh"></header-detail>
    </el-card>

    <el-card>
      <el-table
        v-loading="loading"
        :data="result_list"
        style="width: 100%"
        row-key="uuid"
        stripe
        lazy
        highlight-current-row
      >
        <el-table-column label="客户名" prop="potentialCustomer.name"></el-table-column>
        <el-table-column label="手机号" prop="potentialCustomer.mobile"></el-table-column>
        <el-table-column label="预设标签">
          <template slot-scope="scope">
            <tags-drawer
              v-if="Object.keys(scope.row.potentialCustomer.potentialCustomerTags).length"
              :tags="scope.row.potentialCustomer.potentialCustomerTags"
            ></tags-drawer>
          </template>
        </el-table-column>
        <el-table-column label="添加次数" prop="potentialCustomer.tryCount"></el-table-column>
        <el-table-column label="入库时间" prop="createdAt"></el-table-column>
        <el-table-column label="所属员工">
          <template slot-scope="scope">
            <user-tag :hasPop="false" :user="scope.row.potentialCustomer.belong"></user-tag>
          </template>
        </el-table-column>
        <el-table-column label="添加员工">
          <template slot-scope="scope">
            <user-tag :hasPop="false" :user="scope.row.potentialCustomer.creator"></user-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scoped">
            <div :class="addStatus(scoped.row.addResult)">{{batchAddTaskEnum[scoped.row.addResult]}}</div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import EventDialog from "./dialog";
import headerDetail from "./header-detail";
import UserTag from "@/components/UserTag";
import TagsDrawer from "@/components/TagsDrawer";
import {
  getBatchAddTaskDetail,
  getBatchAddTaskResult
} from "@/api/potentialCustomer";
import { mapState } from "vuex";

export default {
  components: {
    EventDialog,
    UserTag,
    headerDetail,
    TagsDrawer
  },
  data() {
    return {
      pageConfig: {
        total: 0,
        pageNumber: 1,
        pageSize: 20
      },
      detail: {
        creator: {
          name: "",
          uuid: "",
          userId: ""
        },
        startTime: ""
      },
      query: {
        mobile: null,
        name: null,
        page: null,
        size: null,
        status: null,
        uuid: null
      }
    };
  },
  created() {
    this.getDetail();

    this.query.uuid = this.$route.params.uuid;
    this.initDataList(this.query);
  },
  computed: {
    ...mapState({
      userDetail: state => state.userManage.userDetail,
      loading: state => state.externalUser.loading,
      batchAddTaskEnum: state => state.enum.batchAddTask,

      result_list: state => state.externalUser.result_list,
      result_page: state => state.externalUser.result_page
    }),
    addStatus() {
      return function(val) {
        switch (val) {
          case "NOTSTARTED":
            return "color-primary";
          case "INTERRUPT":
            return "color-danger";
          case "PROCESSING":
            return "color - success";
          case "CANCELED":
            return "";
          case "FINISHED":
            return "";
        }
      };
    }
  },
  mounted() {
    this.$bus.$on("handleRefresh", () => {
      this.initDataList(this.query);
    });
  },
  beforeDestroy() {
    this.$bus.$off("handleRefresh");
  },
  methods: {
    initDataList(payload) {
      console.log(payload);
      this.$store
        .dispatch("externalUser/getResultList", payload)
        .then(() => {
          // 初始化分页
          this.pageConfig.pageNumber = this.result_page.pageNumber + 1;
          this.pageConfig.total = this.result_page.total;
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "初始化失败"
          });
        });
    },
    getDetail() {
      getBatchAddTaskDetail(this.$route.params.uuid).then(res => {
        this.detail = res;
      });
    },
    handleRefresh() {
      console.log("handleRefresh");
      this.query = this.$options.data().query;
      this.query.uuid = this.$route.params.uuid;
      this.initDataList(this.query);
    },
    handleSearch(val) {
      const { name, mobile, status } = val;
      this.query.name = name ? name : name;
      this.query.mobile = mobile ? mobile : mobile;
      this.query.status = status ? status : status;

      console.log(val, "handleSearch");
      this.initDataList(this.query);
    }
  }
};
</script>

<style>
</style>