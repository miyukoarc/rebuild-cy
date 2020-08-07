<template>
  <div class="app-container">
    <!-- <el-header height="auto" style="padding:0"> -->
    <el-card class="content-spacing">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <!-- </el-header> -->
    <el-card class="content-spacing">
      <tool-bar @handleExport="doExport" :msg="`共${pageConfig.total}个客户`"></tool-bar>
    </el-card>

    <el-card class="content-spacing">
      <div>
        <el-table
          v-loading="loading"
          :data="listGroup"
          style="width: 100%"
          row-key="uuid"
          stripe
          lazy
          highlight-current-row
          header-row-class-name="el-table-header"
        >
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column prop="name" label="群名称" align="left"></el-table-column>
          <el-table-column label="群主" align="left">
            <template v-slot="scoped">
              <div v-if="scoped.row.owner">{{scoped.row.owner.name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="countNum" label="群人数" align="left"></el-table-column>
          <el-table-column label="昨日入群" align="left">
            <template v-slot="scoped">
              <div>0</div>
            </template>
          </el-table-column>
          <el-table-column label="昨日退群" align="left">
            <template v-slot="scoped">
              <div>0</div>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createTime"></el-table-column>
          <el-table-column label="操作" align="center" width="80px">
            <template slot-scope="scope">
              <el-t-button
                type="text"
                size="mini"
                @click.stop="handleDetail(scope.row)"
                :popAuth="true"
                :auth="permissionMap['externalUser']['externalUser_groupDetail']"
              >详情</el-t-button>
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
  </div>
</template>

<script>
import ListHeader from "./header.vue";
import { mapState, mapMutations, mapActions } from "vuex";

import ToolBar from "@/components/ToolBar";
import CustomerPagination from "@/components/CustomerPagination";

export default {
  components: {
    ListHeader,
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
        name: "",
        userId: "",
      },
    };
  },
  watch: {},
  computed: {
    ...mapState({
      //   roleList: state => state.role.roleList,
      listOwner: (state) => state.externalUser.departmentList,

      loading: (state) => state.externalUser.loading,
      listGroup: (state) => state.externalUser.listGroup,
      listGroupPage: (state) => state.externalUser.listGroupPage,

      permissionMap: (state) => state.permission.permissionMap,
    }),
  },
  created() {
    this.initDataList(this.query);
    this.initFilter();
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    doExport(val) {
      ;
    },
    initFilter() {
      this.$store
        .dispatch("externalUser/getListOwner")
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: "error",
            message: "初始化失败",
          });
        });
    },
    initDataList(payload) {
      this.$store
        .dispatch("externalUser/getListGroup", payload)
        .then(() => {
          //初始化分页
          this.pageConfig.pageNumber = this.listGroupPage.pageNumber + 1;
          this.pageConfig.total = this.listGroupPage.total;
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "初始化失败",
          });
        });
    },
    handleDetail(row) {
      const uuid = row.uuid;
      this.$router.push({
        path: "/externalUser/groupDetail/"+uuid,
      });
    },
    handleSearch(val) {
      const { name, userId } = val;
      this.query.name = name ? name : "";
      this.query.userId = userId ? userId : "";
      this.query.page = 0;
      this.initDataList(this.query);
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
    changeSize(val) {
      this.query.size = val;
      this.initDataList(this.query);
    },
  },
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
