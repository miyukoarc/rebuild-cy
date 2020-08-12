<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <el-card class="content-spacing">
      <tool-bar @handleExport="doExport" :msg="`共${pageConfig.total}个客户`">
        <div slot="right">
          <el-t-button
            type="primary"
            v-permission="'potentialCustomer,potentialCustomer_add'"
            :auth="'potentialCustomer,potentialCustomer_add'"
            :popAuth="true"
            @click.stop="handleCreate"
          >新增用户</el-t-button>
          <el-t-button
            :popAuth="true"
            v-permission="'potentialCustomer,potentialCustomer_allocation'"
            :auth="'potentialCustomer,potentialCustomer_allocation'"
            @click.native="handleDistribute"
          >分配</el-t-button>
        </div>
      </tool-bar>
    </el-card>

    <el-card class="content-spacing">
      <div>
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="listAll"
          style="width: 100%"
          stripe
          lazy
          fit
          highlight-current-row
          @selection-change="handleSelectionChange"
          header-row-class-name="el-table-header"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="客户名" align="left" prop="name"></el-table-column>
          <el-table-column label="手机号" align="left" prop="mobile"></el-table-column>
          <el-table-column align="left" width="250">
            <template slot="header">
              <span>
                预设标签
                <el-tooltip placement="right">
                  <div slot="content">
                    <span class="font-exs ">添加成为用户后，将自动打上预设标签。</span>
                  </div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </span>
            </template>
            <template v-slot="{row}">
              <tags-drawer :tags="row.potentialCustomerTags"></tags-drawer>
            </template>
          </el-table-column>
          <el-table-column label="批量添加次数" align="left" prop="tryCount"></el-table-column>

          <el-table-column label="所属员工" align="left">
            <template v-slot="{row}">
              <div v-if="Object.keys(row.belong).length">
                <async-user-tag :uuid="row.belong.uuid" size="small" type="info">
                  <i class="el-icon-user-solid"></i>
                  {{row.belong.name}}
                </async-user-tag>
              </div>
              <div v-else>--</div>
            </template>
            <!-- <template v-slot="{row}">
              <user-tag :user="row.belong"></user-tag>
            </template>-->
          </el-table-column>
          <el-table-column label="添加员工" align="left">
            <template v-slot="{row}">
              <div v-if="Object.keys(row.creator).length">
                <async-user-tag :uuid="row.creator.uuid" size="small" type="info">
                  <i class="el-icon-user-solid"></i>
                  {{row.creator.name}}
                </async-user-tag>
              </div>
              <div v-else>--</div>
            </template>

            <!-- <template v-slot="{row}">
              <div v-if="Object.keys(row.belong).length">
                <async-user-drawer :hasPop="true" :users="[row.creator]"></async-user-drawer>
              </div>
              <div v-if="Object.keys(row.toRole).length">
                <role-drawer :roles="row.toRole"></role-drawer>
              </div>
            </template>-->
            <!-- <template v-slot="{row}">
              <user-tag :user="row.creator"></user-tag>
            </template>-->
          </el-table-column>
          <el-table-column label="入库时间" align="left" prop="importTime"></el-table-column>
          <el-table-column label="操作" align="left">
            <template slot-scope="scope">
              <el-t-button
                type="text"
                size="mini"
                :popAuth="true"
                v-permission="'potentialCustomer,potentialCustomer_allocation'"
                :auth="'potentialCustomer,potentialCustomer_allocation'"
                @click.native="handleAllocation(scope.row)"
              >分配</el-t-button>
              <el-t-button
                type="text"
                size="mini"
                :popAuth="true"
                v-permission="'potentialCustomer,potentialCustomer_update'"
                :auth="'potentialCustomer,potentialCustomer_update'"
                @click.native="handleEdit(scope.row)"
              >编辑</el-t-button>
              <el-t-button
                type="text"
                :popAuth="true"
                v-permission="'potentialCustomer,potentialCustomer_delete'"
                :auth="'potentialCustomer,potentialCustomer_delete'"
                size="mini"
                @click.native="handleDelete(scope.row)"
              >删除</el-t-button>
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
import AsyncUserTag from "@/components/AsyncUserTag";
import TagsDrawer from "@/components/TagsDrawer";
import FormDialog from "./dialog";
import ToolBar from "@/components/ToolBar";
import CustomerPagination from "@/components/CustomerPagination";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  components: {
    ListHeader,
    FormDialog,
    ToolBar,
    TagsDrawer,
    AsyncUserTag,
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
        name: "",
        belongUuid: "",
        creatorUuid: "",
        startTime: "",
        endTime: "",
        flag: "",
        min: "",
        max: "",
      },

      selects: [],
    };
  },
  watch: {},
  computed: {
    ...mapState({
      tagListAll: (state) => state.tag.tagListAll,
      loading: (state) => state.potentialCustomer.loading,
      listAll: (state) => state.potentialCustomer.listAll,
      page: (state) => state.potentialCustomer.listAllPage,
      permissionMap: (state) => state.permission.permissionMap,
    }),
  },
  created() {
    this.initDataList(this.query);
    this.initFilter();
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
    doExport(val) {
      
    },
    /**
     * 初始化筛选信息
     */
    initFilter() {
      this.$store
        .dispatch("tag/getListSelect")
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: "error",
            message: "初始化失败",
          });
        });

      this.$store
        .dispatch("department/getDepartmentListAll")
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: "error",
            message: err || "初始化失败",
          });
        });

      this.$store
        .dispatch("user/getUserListSelect")
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: "error",
            message: "初始化失败",
          });
        });
    },
    /**
     * 初始化表格信息
     */
    initDataList(payload) {
      this.$store
        .dispatch("potentialCustomer/getList", payload)
        .then(() => {
          //初始化分页
          this.pageConfig.pageNumber = this.page.pageNumber + 1;
          this.pageConfig.total = this.page.total;
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "初始化失败",
          });
        });
    },
    handleDetail(val) {
      const payload = this.userList[val].uuid;
      this.$router.push({
        path: "/user/detail",
        query: { uuid: payload },
      });
    },
    handleSearch(val) {
      if (val.max < val.min) {
        let tmp;
        tmp = val.max;
        val.max = val.min;
        val.min = tmp;
      }
      const {
        belongUuid,
        creatorUuid,
        endTime,
        flag,
        max,
        min,
        name,
        startTime,
      } = val;
      if (val.flag == 2) {
        this.query.flag = true;
        this.query.min = min;
        this.query.max = max;
      } else if (val.flag == 1) {
        this.query.flag = "";
        this.query.min = "";
        this.query.max = "";
      } else {
        this.query.flag = false;
        this.query.min = 0;
        this.query.max = 0;
      }
      this.query.name = name ? name : "";
      this.query.belongUuid = belongUuid ? belongUuid : "";
      this.query.creatorUuid = creatorUuid ? creatorUuid : "";
      this.query.endTime = endTime ? endTime : "";
      this.query.startTime = startTime ? startTime : "";
      this.query.page = 0;
      this.initDataList(this.query);
    },
    sortNumber(max, min) {
      return max - min;
    },
    handleRefresh() {
      this.query = this.$options.data().query;
      this.initDataList(this.query);
    },
    changePage(key) {
      this.query.page = key - 1;
      this.pageConfig.pageNumber = key - 1;
      this.initDataList(this.query);
    },
    handleCreate() {
      this.$refs["formDialog"].event = "CreateTemplate";
      this.$refs["formDialog"].eventType = "create";
      this.$refs["formDialog"].dialogVisible = true;
    },
    handleDistribute() {
      const uuid = this.selects.map((item) => {
        return item.uuid;
      });

      const payload = { uuid };
      if (this.selects.length) {
        this.$refs["formDialog"].event = "DistributeTemplate";
        this.$refs["formDialog"].eventType = "distribute";
        this.$refs["formDialog"].dialogVisible = true;
        this.$refs["formDialog"].transfer = payload;
      } else {
        this.$message({
          type: "warning",
          message: "请至少选择一个客户",
        });
      }
    },
    handleAllocation(row) {
      console.log(row,'dddadfasdfasd======')
      row.uuid = [row.uuid];
      this.$refs.multipleTable.clearSelection();
      this.handleSelectionChange([row]);
      this.selects.forEach((row) => {
        this.$refs.multipleTable.toggleRowSelection(row);
      });
      this.$refs["formDialog"].event = "DistributeTemplate";
      this.$refs["formDialog"].eventType = "distribute";
      this.$refs["formDialog"].dialogVisible = true;
      this.$refs["formDialog"].transfer = row;
    },
    handleEdit(row) {
      const { belong, uuid, mobile, name } = row;
      let selectedTag = [];
      row.potentialCustomerTags.map((item) => {
        item.tags.map((tag) => {
          selectedTag.push(tag.tagId);
        });
      });
      const payload = { belong, uuid, selectedTag, mobile, name };
      this.$refs["formDialog"].event = "EditTemplate";
      this.$refs["formDialog"].eventType = "edit";
      this.$refs["formDialog"].dialogVisible = true;
      this.$refs["formDialog"].transfer = payload;
    },
    handleDelete(row) {
      const { uuid } = row;
      const payload = { uuid: [uuid] };
      this.$confirm("是否删除当前客户", "删除潜在客户", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$store
            .dispatch("potentialCustomer/deletePotentialCustomer", payload)
            .then(() => {
              this.$message({
                type: "success",
                message: "操作成功",
              });
              this.initDataList();
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err,
              });
            });
        })
        .catch((err) => {});
    },
    handleSelectionChange(val) {
      this.selects = val;
    },
    changeSize(val) {
      this.query.size = val;
      this.initDataList(this.query);
    },
  },
};
</script>

<style lang="scss" scoped>
.user-card {
  display: flex;
  align-items: center;
}
</style>

<style lang="scss">
.pager {
  padding: 20px 0;
  text-align: center;
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
