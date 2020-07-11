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
            :auth="permissionMap['potentialCustomer']['potentialCustomer_add']"
            :popAuth="true"
            @click.stop="handleCreate"
          >新增用户</el-t-button>
          <el-t-button
            :auth="permissionMap['potentialCustomer']['potentialCustomer_allocation']"
            @click.stop="handleDistribute"
          >分配</el-t-button>
        </div>
      </tool-bar>
    </el-card>

    <el-card class="content-spacing">
      <div>
        <el-table
          v-loading="loading"
          :data="listAll"
          style="width: 100%"
          row-key="uuid"
          stripe
          lazy
          highlight-current-row
          @selection-change="handleSelectionChange"
          header-row-class-name="el-table-header"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="客户名" align="left" prop="name"></el-table-column>
          <el-table-column label="手机号" align="left" prop="mobile"></el-table-column>
          <el-table-column>
            <template slot="header">
              <span>
                预设标签
                <el-tooltip placement="right">
                  <div slot="content">
                    <span class="font-exs color-info">添加成为用户后，将自动打上预设标签。</span>
                  </div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </span>
            </template>
            <template v-slot="{row}">
              <!-- <div>{{row}}</div> -->
              <tags-drawer :tags="row.potentialCustomerTags"></tags-drawer>
            </template>
          </el-table-column>
          <el-table-column label="批量添加次数" align="left" prop="tryCount"></el-table-column>
          <el-table-column label="入库时间" align="left" prop="importTime"></el-table-column>
          <el-table-column label="所属员工" align="left">
            <template v-slot="scope">
              <!-- <user-tag :user="scope.row.user" :hasPop="hasPop"></user-tag> -->
            </template>
          </el-table-column>
          <el-table-column label="添加员工" align="left">
            <template v-slot="scope">
              <!-- <user-tag :user="scope.row.user" :hasPop="hasPop"></user-tag> -->
            </template>
          </el-table-column>
          <el-table-column label="操作" align="left">
            <template slot-scope="scope">
              <el-t-button
                size="mini"
                :popAuth="true"
                :auth="permissionMap['potentialCustomer']['potentialCustomer_update']"
                @click.stop="handleEdit(scope.row)"
              >编辑</el-t-button>
              <el-t-button
                type="danger"
                :popAuth="true"
                :auth="permissionMap['potentialCustomer']['potentialCustomer_delete']"
                size="mini"
                @click.stop="handleDelete(scope.$index)"
              >删除</el-t-button>
              <!-- <el-button type="primary" size="mini" @click.stop="handleDetail(scope.$index)">详情</el-button> -->
              <!-- <el-button type="primary" size="mini">分配部门</el-button> -->
              <!-- <el-button type="primary" size="mini" @click.stop="handleEdit(scope.row)">编辑</el-button> -->
              <!-- <el-button type="danger" size="mini" @click.stop="handleDelete(scope.row)">删除</el-button> -->
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
// import mHeadedr from "./header";
import UserDetail from "./detail.vue";
import ListHeader from "./header.vue";
import TagsDrawer from "@/components/TagsDrawer";
import FormDialog from "./dialog";
import ToolBar from "./tool-bar";
import { mapState, mapMutations, mapActions } from "vuex";
import { truncate } from "fs";

export default {
  components: {
    ListHeader,
    UserDetail,
    FormDialog,
    ToolBar,
    TagsDrawer
    // mHeadedr
  },
  data() {
    return {
      pageConfig: {
        total: 0,
        pageNumber: 0,
        pageSize: 10
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
        max: ""
      },

      selects: []
    };
  },
  watch: {},
  computed: {
    ...mapState({
      tagListAll: state => state.tag.tagListAll,
      loading: state => state.potentialCustomer.loading,
      listAll: state => state.potentialCustomer.listAll,
      page: state => state.potentialCustomer.listAllPage,
      permissionMap: state => state.permission.permissionMap
    })
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
      console.log(val);
    },
    /**
     * 初始化筛选信息
     */
    initFilter() {
      this.$store
        .dispatch("tag/getListSelect")
        .then(() => {})
        .catch(err => {
          this.$message({
            type: "error",
            message: "初始化失败"
          });
        });

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
        .catch(err => {
          this.$message({
            type: "error",
            message: "初始化失败"
          });
        });
    },
    handleDetail(val) {
      const payload = this.userList[val].uuid;
      this.$router.push({
        path: "/user/detail",
        query: { uuid: payload }
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
        startTime
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
      console.log(this.query, "query");
      this.initDataList(this.query);
    },
    sortNumber(max, min) {
      return max - min;
    },
    handleRefresh() {
      console.log("handleRefresh");
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
      const uuid = this.selects;
      const payload = { uuid };
      if (this.selects.length) {
        this.$refs["formDialog"].event = "DistributeTemplate";
        this.$refs["formDialog"].eventType = "distribute";
        this.$refs["formDialog"].dialogVisible = true;
        this.$refs["formDialog"].transfer = payload;
      } else {
        this.$message({
          type: "warning",
          message: "请至少选择一个客户"
        });
      }
    },
    handleEdit(row) {
      console.log(row, "row");
      const { belong, uuid } = row;
      let selectedTag = [];
      row.potentialCustomerTags.map(item => {
        item.tags.map(tag => {
          selectedTag.push(tag.uuid);
        });
      });
      console.log(selectedTag, "aaaa");
      const payload = { belong, uuid, selectedTag };
      console.log(payload, "88");
      this.$refs["formDialog"].event = "EditTemplate";
      this.$refs["formDialog"].eventType = "edit";
      this.$refs["formDialog"].dialogVisible = true;
      this.$refs["formDialog"].transfer = payload;
    },
    handleDelete(index) {
      const { uuid } = this.listAll[index];
      const payload = { uuid };
      this.$confirm("是否删除当前客户", "Warning", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$store
            .dispatch("potentialCustomer/deletePotentialCustomer", payload)
            .then(() => {
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
        })
        .catch(err => {});
    },
    handleSelectionChange(val) {
      console.log(val);
      const arr = val;
      this.selects = arr.map(item => {
        return item.uuid + "";
      });
    }
  }
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
