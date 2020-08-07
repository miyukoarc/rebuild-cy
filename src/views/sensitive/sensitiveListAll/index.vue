<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <el-card class="content-spacing">
      <tool-bar
        @handleExport="doExport"
        :msg="`共${pageConfig.total}个敏感词`"
        :hasRefresh="true"
        @handleRefresh="handleRefresh"
      >
        <div slot="right">
          <el-t-button
            type="primary"
            :popAuth="true"
            :auth="permissionMap['riskManagement']['riskManagement_add']"
            @click.stop="handleCreate"
          >新建敏感词</el-t-button>
          <el-t-button
            type="primary"
            :popAuth="true"
            :auth="permissionMap['riskManagement']['riskManagement_add']"
            @click.stop="handleBatchChange"
          >设置通知人</el-t-button>
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
          header-row-class-name="el-table-header"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="敏感词" align="left" prop="word"></el-table-column>
          <el-table-column>
            <template slot="header">
              <span>
                通知人
                <el-tooltip placement="right">
                  <div slot="content">
                    <span class="font-exs color-info">除了发送者，设置人也会收到触发通知。</span>
                  </div>

                  <i class="el-icon-question"></i>
                </el-tooltip>
              </span>
            </template>
            <template v-slot="{row}">
              <div v-if="Object.keys(row.toUser).length">
                <async-user-drawer :hasPop="true" :users="row.toUser"></async-user-drawer>
              </div>
              <div v-if="Object.keys(row.toRole).length">
                <role-drawer :roles="row.toRole"></role-drawer>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="left">
            <template slot="header">
              <span>
                适用标签
                <el-tooltip placement="right">
                  <div slot="content">
                    <span class="font-exs color-info">员工与不满足该标签的人沟通时，不会被监控。</span>
                  </div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </span>
            </template>
            <template v-slot="{row}">
              <div v-if="row.sensitiveSetTag.length>0">
                <div >{{row.tagType=='INSET'?'包含其一':'全部满足'}}</div>
                <tags-drawer :tags="row.sensitiveSetTag"></tags-drawer>
              </div>
              <span v-else>--</span>
            </template>
          </el-table-column>

          <el-table-column label="创建时间" align="left" prop="createdAt"></el-table-column>
          <el-table-column label="创建人" align="left">
            <template v-slot="{row}">
              <div v-if="Object.keys(row.creator).length">
                <async-user-tag :uuid="row.creator.uuid" size="small" type="info">
                  <i class="el-icon-user-solid"></i>
                  {{row.creator.name}}
                </async-user-tag>
              </div>
              <div v-else>--</div>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
              <!-- <el-button type="primary" size="mini" @click.stop="handleDetail(scope.$index)">详情</el-button> -->
              <el-t-button
                type="text"
                :popAuth="true"
                :auth="permissionMap['riskManagement']['riskManagement_update']"
                size="mini"
                @click.stop="handleEdit(scope.$index)"
              >编辑</el-t-button>

              <el-divider direction="vertical"></el-divider>
              <el-t-button
                type="text"
                :popAuth="true"
                :auth="permissionMap['riskManagement']['riskManagement_delete']"
                size="mini"
                @click.stop="handleDelete(scope.$index)"
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
import FormDialog from "./dialog";
import ToolBar from "@/components/ToolBar";
import AsyncUserTag from "@/components/AsyncUserTag";
import AsyncUserDrawer from "@/components/AsyncUserDrawer";
import TagsDrawer from "@/components/TagsDrawer";
import RoleDrawer from "@/components/RoleDrawer";
import CustomerPagination from "@/components/CustomerPagination";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  components: {
    ListHeader,
    FormDialog,
    ToolBar,
    AsyncUserTag,
    AsyncUserDrawer,
    RoleDrawer,
    TagsDrawer,
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
        startTime: "",
        endTime: "",
        word: "",
      },
      rowSelects: [],
    };
  },
  watch: {},
  computed: {
    ...mapState({
      loading: (state) => state.sensitive.loading,
      listAll: (state) => state.sensitive.sensitiveListAll,
      page: (state) => state.sensitive.sensitivePage,

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
      console.log(val);
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
        .dispatch("sensitive/getSensitiveListAll", payload)
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
      const { startTime, endTime, word } = val;
      this.query.startTime = startTime ? startTime : this.query.startTime;
      this.query.endTime = endTime ? endTime : this.query.endTime;
      this.query.word = word ? word : this.query.word;
      console.log(val, "handleSearch");
      this.initDataList(this.query);
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
    handleDelete(index) {
      const payload = { uuid: this.listAll[index].uuid };
      this.$confirm("是否删除当前敏感词", "Warning", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$store
            .dispatch("sensitive/deleteSensitive", payload)
            .then(() => {
              this.$message({
                type: "success",
                message: "操作成功",
              });
              this.initDataList(this.query);
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
    handleEdit(index) {
      // let { toUser, type, uuid, word } = this.listAll[index]
      //   toUser = toUser.map(item => {
      //     return item.userId
      //   })
      // console.log(toUser)
      //   const payload = { toUser, type, uuid, word }
      let {
        uuid,
        type,
        informType,
        tagType,
        sensitiveSetTag,
        toUser,
        toRole,
        word,
      } = this.listAll[index];
      sensitiveSetTag = JSON.parse(JSON.stringify(sensitiveSetTag));
      toUser = JSON.parse(JSON.stringify(toUser));
      toRole = JSON.parse(JSON.stringify(toRole));

      const transfer = {
        uuid,
        type,
        informType,
        tagType,
        sensitiveSetTag,
        toUser,
        toRole,
        word,
      };
      const payload = this.listAll[index];
      this.$store.commit("sensitive/SAVE_CURRENTWORD", payload);
      this.$refs["formDialog"].event = "EditTemplate";
      this.$refs["formDialog"].eventType = "edit";
      this.$refs["formDialog"].dialogVisible = true;
      this.$refs["formDialog"].transfer = transfer;
    },
    handleBatchChange() {
      if (this.rowSelects.length) {
        let sensitiveUuid = this.rowSelects.map((item) => {
          return item.uuid;
        });
        // sensitiveUuid = JSON.parse(JSON.stringify(sensitiveUuid))
        const transfer = { sensitiveUuid };
        this.$refs["formDialog"].event = "ChangeTemplate";
        this.$refs["formDialog"].eventType = "change";
        this.$refs["formDialog"].dialogVisible = true;
        this.$refs["formDialog"].transfer = transfer;
      } else {
        this.$message({
          type: "warning",
          message: "请至少选择一项",
        });
      }
    },
    handleSelectionChange(val) {
      this.rowSelects = val;
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

.el-table-header {
  color: #000;
}
</style>
