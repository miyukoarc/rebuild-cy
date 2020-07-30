<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <list-header ref="listHeader" @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <el-card class="content-spacing">
      <tool-bar :usersNumber="userPage.total" @handleExport="doExport" @handleUpdate="handleUpdate"></tool-bar>
    </el-card>

    <el-card class="content-spacing">
      <div>
        <el-table
          v-loading="loading"
          :data="batchTaskListmy"
          style="width: 100%"
          row-key="uuid"
          stripe
          lazy
          highlight-current-row
        >
          <el-table-column label="进度" align="left">
            <template v-slot="scoped">
              <div v-if="scoped.row.count">{{scoped.row.addCount}} / {{scoped.row.count}}</div>
              <div v-else>-</div>
            </template>
          </el-table-column>

          <el-table-column label="生效时间" prop="startTime" align="left"></el-table-column>
          <el-table-column label="创建员工" align="left">
            <template v-slot="scoped">
              <div v-if="Object.keys(scoped.row.creator).length">{{scoped.row.creator.name}}</div>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" prop="createdAt" align="left"></el-table-column>
          <el-table-column label="状态" align="left">
            <template v-slot="scoped">
              <div
                :class="addStatus(scoped.row.addStatus)"
              >{{batchAddTaskEnum[scoped.row.addStatus]}}</div>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="left" width="240">
            <template slot-scope="scope">
              <!-- :popAuth="true"
              :auth="permissionMap['user']['user_detail']"-->
              <el-t-button type="text" size="mini" @click.stop="handleDetail(scope.$index)">详情</el-t-button>
              <el-t-button
                v-if="scope.row.addStatus == 'INTERRUPT'"
                type="text"
                size="mini"
                @click.stop="handleContinue(scope.$index)"
              >继续</el-t-button>
              <el-t-button
                v-if="scope.row.addStatus != 'CANCELED'"
                type="text"
                size="mini"
                @click.stop="handleCancel(scope.$index)"
              >取消</el-t-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          class="pager"
          layout="total,prev, pager, next,jumper"
          :total="pageConfig.total"
          :current-page.sync="pageConfig.pageNumber"
          :page-size="pageConfig.pageSize"
          @current-change="changePage"
        />
      </div>
    </el-card>

    <form-dialog ref="formDialog"></form-dialog>
  </div>
</template>

<script>
import ListHeader from "./header.vue";
import FormDialog from "./dialog";
import ToolBar from "./tool-bar";
import { mapState } from "vuex";
import { cancelBatchAddTask } from "@/api/potentialCustomer";

export default {
  components: {
    ListHeader,
    FormDialog,
    ToolBar
  },
  data() {
    return {
      pageConfig: {
        total: 0,
        pageNumber: 1,
        pageSize: 20
      },

      query: {
        page: 0,
        size: 20,
        status: "",
        creatorUuid: "",
        starttime: "",
        endtime: ""
      }
    };
  },
  watch: {},
  computed: {
    ...mapState({
      loading: state => state.externalUser.loading,
      batchTaskListmy: state => state.externalUser.batchTaskListmy,
      userPage: state => state.externalUser.batchTaskListmyPage,

      permissionMap: state => state.permission.permissionMap,

      batchAddTaskEnum: state => state.enum.batchAddTask
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
  created() {
    this.initDataList(this.query);
    this.initFilter();
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
    doExport(val) {
      console.log("请求接口导出全部");
    },

    initFilter() {
      this.$store
        .dispatch("user/getUserListSelect")
        .then(() => {})
        .catch(err => {
          this.$message({
            type: "error",
            message: "初始化失败"
          });
        });
    },

    handleUpdate() {
      this.initDataList(this.query);
    },

    initDataList(payload) {
      this.$store
        .dispatch("externalUser/getListMy", payload)
        .then(() => {
          // 初始化分页
          this.pageConfig.pageNumber = this.userPage.pageNumber + 1;
          this.pageConfig.total = this.userPage.total;
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "初始化失败"
          });
        });
    },
    handleDetail(val) {
      const uuid = this.batchTaskListmy[val].uuid;
      this.$router.push({
        path: "/batchAddTask/detail/" + uuid
      });
    },
    handleCancel(val) {
      this.$confirm("是否取消当前项", "Warning", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        cancelBatchAddTask({
          uuid: this.batchTaskListmy[val].uuid
        })
          .then(res => {
            this.$message({
              type: "success",
              message: "操作成功"
            });
            this.initDataList();
          })
          .catch(err => {
            this.$message({
              type: "error",
              message: err
            });
          });
      });
    },
    handleContinue(val) {},
    handleSearch(val) {
      const { creatorUuid, endtime, starttime, status } = val;
      this.query.creatorUuid = creatorUuid ? creatorUuid : creatorUuid;
      this.query.endtime = endtime ? endtime : endtime;
      this.query.starttime = starttime ? starttime : starttime;
      this.query.status = status ? status : status;

      console.log(val, "handleSearch");
      this.initDataList(this.query);
    },
    handleRefresh() {
      console.log("handleRefresh");
      this.query = this.$options.data().query;
      this.initDataList(this.query);
    },
    changePage(key) {
      console.log(this.query);
      this.query.page = key - 1;
      this.pageConfig.pageNumber = key;
      this.initDataList(this.query);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
.pager {
  padding: 20px 0;
  text-align: center;
}
</style>