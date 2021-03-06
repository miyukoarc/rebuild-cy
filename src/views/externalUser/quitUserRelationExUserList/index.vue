<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <el-card class="content-spacing">
      <tool-bar :hasRefresh="true" @handleRefresh="handleRequest" @handleExport="doExport">
        <div slot="right">
          <el-t-button
            v-permission="'externalUser,externalUser_redistributionExUser'"
            type="primary"
            @click="handleDistribute"
            :popAuth="true"
            :auth="'externalUser,externalUser_redistributionExUser'"
          >分配客户资源</el-t-button>
        </div>
      </tool-bar>
    </el-card>

    <el-card class="content-spacing">
      <div>
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="quitUserRelationExUserList"
          style="width: 100%"
          row-key="uuid"
          stripe
          lazy
          highlight-current-row
          :header-cell-class-name="cellClass"
          header-row-class-name="el-table-header"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" :selectable="selectable"></el-table-column>
          <el-table-column label="离职员工" align="left">
            <template v-slot="scope">
              <div class="user-card">
                <el-image
                  :src="scope.row.avatar"
                  lazy
                  style="width:30px;height:30px;margin-right:10px"
                ></el-image>
                <div class="client-info">
                  <span class="remark">{{scope.row.name}}</span>
                  <div>{{scope.row.role.name}}</div>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="公司" align="left">
            <template v-slot="scope">
              <div v-for="(item,index) in scope.row.departments" :key="index">
                <p>{{item.name}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="待分配人数" prop="externalUserNum" align="left"></el-table-column>
          <el-table-column label="待分配群数" prop="groupNum" align="left"></el-table-column>
          <el-table-column label="离职时间" align="left" prop="updatedAt"></el-table-column>

          <el-table-column label="状态" align="left">
            <template v-slot="scope">
              <el-tag
                :type="scope.row.userStatus === 'ALLOCATE'?'success':'info'"
              >{{quitUserRelationExUserListUserStatus[scope.row.userStatus]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120px">
            <template slot-scope="scope">
              <el-t-button
                type="text"
                size="mini"
                :popAuth="true"
                v-permission="'externalUser,externalUser_redistributionExUser'"
                :auth="'externalUser,externalUser_redistributionExUser'"
                @click.stop.native="handleDistributeSingle(scope.row)"
                :enable="scope.row.userStatus != 'ALLOCATED'"
              >分配</el-t-button>

              <el-t-button
                :popAuth="true"
                v-permission="'externalUser,externalUser_quitUserRelationExUserList'"
                :auth="'externalUser,externalUser_quitUserRelationExUserList'"
                type="text"
                size="mini"
                @click.stop.native="handleDetail(scope.row)"
              >详情</el-t-button>

              <!-- <i class="el-icon-circle-close color-info" v-if="!!permissionMap['externalUser']['externalUser_redistributionExUser']&&!!permissionMap['externalUser']['externalUser_quitUserRelationExUserList']"></i> -->
            </template>
          </el-table-column>
        </el-table>

        <customer-pagination
          :pageConfig="pageConfig"
          @current-change="changePage"
          @size-change="changeSize"
        ></customer-pagination>
      </div>
    </el-card>

    <form-dialog ref="formDialog"></form-dialog>
  </div>
</template>

<script>
import ListHeader from "./header.vue";
import FormDialog from "./dialog";
import ToolBar from "@/components/ToolBar";
import CustomerPagination from "@/components/CustomerPagination";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "externalUser_quitUserRelationExUserList",
  components: {
    ListHeader,
    FormDialog,
    ToolBar,
    CustomerPagination,
  },
  data() {
    return {
      pageConfig: {
        total: 0,
        pageNumber: 0,
        pageSize: 10,
      },

      query: {
        page: 0,
        size: 10,
        status: "",
        name: "",
        startTime: "",
        endTime: "",
      },
      // 选择勾选
      selectedAllData: [],
    };
  },
  watch: {},
  computed: {
    ...mapState({
      loading: (state) => state.externalUser.loading,
      quitUserRelationExUserListUserStatus: (state) =>
        state.enum.quitUserRelationExUserListUserStatus,
      quitUserRelationExUserList: (state) =>
        state.externalUser.quitUserRelationExUserList,
      quitListPage: (state) => state.externalUser.quitListPage,
      permissionMap: (state) => state.permission.permissionMap,
    }),
  },
  created() {
    this.initDataList(this.query);
  },
  mounted() {
    this.$bus.$on("handleRefresh", () => {
      this.initDataList(this.query);
    });

    this.$once("hook:beforeDestroy", () => {
      this.$bus.$off("handleRefresh");
    });
  },
  methods: {
    // 如果都已经分配 全选按钮 隐藏
    cellClass(row) {
      if (this.quitUserRelationExUserList.length > 0) {
        let isAllocated = this.quitUserRelationExUserList.every((item) => {
          return item.userStatus == "ALLOCATED";
        });
        if (isAllocated) {
          return "disabledCheck";
        }
      }
    },
    handleRequest() {},
    doExport(val) {},
    /**
     * 初始化筛选信息
     */
    // initFilter() {
    //   this.$store
    //     .dispatch('department/getDepartmentListAll')
    //     .then(() => {})
    //     .catch((err) => {
    //       this.$message({
    //         type: 'error',
    //         message: err || '初始化失败',
    //       })
    //     })
    // },
    /**
     * 初始化表格信息
     */
    initDataList(payload) {
      this.$store
        .dispatch("externalUser/getQuitUserRelationExUserList", payload)
        .then(() => {
          //初始化分页
          this.pageConfig.pageNumber = this.quitListPage.pageNumber + 1;
          this.pageConfig.total = this.quitListPage.total;
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            type: "error",
            message: err || "初始化失败",
          });
        });
    },
    handleSearch(val) {
      const { name, status, startTime, endTime } = val;
      this.query.name = name ? name : this.query.name;
      this.query.status = status ? status : this.query.status;
      this.query.startTime = startTime ? startTime : "";
      this.query.endTime = endTime ? endTime : "";
      this.query.page = 0;
      this.initDataList(this.query);
    },
    handleRefresh() {
      console.log("handleRefresh");
      this.query = this.$options.data().query;
      this.initDataList(this.query);
    },
    handleDetail(row) {
      console.log(row, "row");
      const uuid = row.uuid;
      this.$router.push({
        path: "/user/detail/" + uuid,
        // query: { uuid: payload }
      });
    },
    handleDistribute() {
      if (this.selectedAllData.length) {
        this.$refs["formDialog"].event = "DistributeTemplate";
        this.$refs["formDialog"].eventType = "distribute";
        this.$refs["formDialog"].dialogVisible = true;
        this.$refs["formDialog"].selectedAllData = this.selectedAllData;
      } else {
        this.$message({
          type: "warning",
          message: "请至少选择一个客户",
        });
      }
    },
    handleDistributeSingle(row) {
      if (row.userStatus == "ALLOCATED") return;
      this.$refs.multipleTable.clearSelection();
      this.handleSelectionChange([row]);
      this.selectedAllData.forEach((row) => {
        this.$refs.multipleTable.toggleRowSelection(row);
      });
      this.$refs["formDialog"].event = "DistributeTemplate";
      this.$refs["formDialog"].eventType = "distribute";
      this.$refs["formDialog"].dialogVisible = true;
      this.$refs["formDialog"].selectedAllData = this.selectedAllData;
      // this.$store.commit('externalUser/SAVE_QUITUSERCURRENTROW', row)
    },
    changePage(key) {
      this.query.page = key - 1;
      this.pageConfig.pageNumber = key - 1;
      this.initDataList(this.query);
    },
    handleSelectionChange(val) {
      this.selectedAllData = val;
    },
    changeSize(val) {
      this.query.size = val;
      this.initDataList(this.query);
    },
    //设置表格中勾选框是否是禁用状态
    selectable(row, index) {
      return row.userStatus != "ALLOCATED";
    },
  },
};
</script>

<style lang="scss" scoped>
.user-card {
  display: flex;
  align-items: center;
}
.success {
  color: #67c23a;
}
</style>

<style lang="scss">
.pager {
  padding: 20px 0;
  text-align: center;
}

.el-table /deep/.disabledCheck > .cell .el-checkbox__inner {
  display: none !important;
  position: relative;
}
.el-table /deep/.disabledCheck > .cell::before {
  display: block;
  content: "";
  position: absolute;
  text-align: center;
  width: 100%;
}

// .app-container {
//   border-top: 1px solid #e9e9e9;
//   background: white;
//   .roles-table {
//     margin-top: 30px;
//   }
//   .permission-tree {
//     margin-bottom: 30px;
//   }
// }
// header .el-header button {
//   margin-right: 5px;
// }
</style>
