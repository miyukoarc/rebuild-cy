<template>
  <div class="app-container">
    <el-card class="content-spacing" style="overflow:initial">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <el-card class="content-spacing">
      <div class="mb-10">
        <div class="flex-alinecenter display-flex align-items-center">
          <el-t-button
            type="text"
            size="mini"
            style="padding:0 15px 0 0"
            :popAuth="true"
            v-permission="'automatic,automatic_switchReply'"
            :auth="'automatic,automatic_switchReply'"
          >
            <div class="display-flex align-items-center">
              <span class="font-s mr-10">自动回复开关</span>
              <el-switch v-model="isReplySwitch" @change="handleClickReplySwitch"></el-switch>
            </div>
          </el-t-button>
          <span class="mr-10 font-es">自动回复是针对客户的常见问题而设置的标准回复内容,可快速响应客户的问题。</span>
          <el-t-button
            type="primary"
            size="mini"
            :popAuth="true"
            v-permission="'automatic,automatic_add'"
            :auth="'automatic,automatic_add'"
            @click.stop="handleClickSetAutoReplay"
          >设置</el-t-button>
        </div>
      </div>
      <tool-bar
        @handleExport="doExport"
        :msg="`共${pageConfig.total}条记录`"
        :hasRefresh="true"
        @handleRefresh="handleRequest"
      >
        <div slot="right">
          <el-t-button
            type="primary"
            :popAuth="true"
            v-permission="'automatic,automatic_add'"
            :auth="'automatic,automatic_add'"
            @click.stop="handleCreate"
          >新建回复</el-t-button>
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
        >
          <el-table-column label="规则名称" align="left" prop="ruleWord"></el-table-column>
          <el-table-column label="关键词" align="left" prop="keyWord"></el-table-column>
          <el-table-column label="回复内容" align="left" prop="replyWord">
            <template v-slot="{row}">
              <div>
                <span
                  v-if="row.autoReplyType !='CONTENT' && row.mediaId"
                >{{autoReplyContentType[row.autoReplyType]}}</span>
                <p>{{tableReplyWord(row)}}</p>
                <div class="text-align-center" v-if="row.replyWord.length>20">
                  <el-button type="text" size="mini" @click="curly = !curly">
                    {{curly?'展开':'收起'}}
                    <i
                      :class="[curly?'el-icon-caret-bottom':'el-icon-caret-top']"
                    ></i>
                  </el-button>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="适用标签" align="left">
            <template v-slot="{row}">
              <div v-if="row.autoReplyTags.length>0">
                <strong>{{row.autoReplyTagType=='CONTAIN'?'包含其一':'完全匹配'}}</strong>
                <tags-drawer v-if="row.autoReplyTags.length>0" :tags="row.autoReplyTags"></tags-drawer>
              </div>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label="创建人" align="left">
            <template v-slot="{row}">
              <div v-if="Object.keys(row.creator).length" style="cursor: pointer;">
                <async-user-tag
                  size="small"
                  v-for="item in [row.creator]"
                  type="info"
                  :key="item.uuid"
                  :uuid="item.uuid"
                  effect="plain"
                >
                  <i class="el-icon-user-solid color-primary"></i>
                  {{item.name}}
                </async-user-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
              <el-t-button
                type="text"
                :popAuth="true"
                v-permission="'automatic,automatic_update'"
                :auth="'automatic,automatic_update'"
                size="mini"
                @click.stop.native="handleEdit(scope.row)"
              >编辑</el-t-button>

              <el-t-button
                type="text"
                :popAuth="true"
                v-permission="'automatic,automatic_delete'"
                :auth="'automatic,automatic_delete'"
                size="mini"
                @click.stop.native="handleDelete(scope.row)"
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
// import mHeadedr from "./header";

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
  name: "automatic_listAll",
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
      curly: true,
      isReplySwitch: false,
      pageConfig: {
        total: 0,
        pageNumber: 0,
        pageSize: 10,
      },

      query: {
        page: 0,
        size: 10,
        ruleName: "",
        keyWord: "",
        replyWord: "",
        // userId: "",
        tagIds: [],
        flag: true,
        startTime: "",
        endTime: "",
      },
      rowSelects: [],
    };
  },
  watch: {},
  computed: {
    ...mapState({
      loading: (state) => state.automatic.loading,
      listAll: (state) => state.automatic.listAll,
      page: (state) => state.automatic.page,
      permissionMap: (state) => state.permission.permissionMap,
      autoReplyContentType: (state) => state.enum.autoReplyContentType,
      replySwitch: (state) => state.automatic.replySwitch,
    }),
    tableReplyWord: function () {
      return function (row) {
        if (row.replyWord.length > 20) {
          if (this.curly) {
            return row.replyWord.substring(0, 20);
          } else {
            return row.replyWord;
          }
        } else {
          return row.replyWord;
        }
      };
    },
  },
  created() {
    this.initDataList(this.query);
    this.initFilter();
  },
  mounted(){
      this.$bus.$on('handleRefresh',()=>{
          this.initDataList(this.query)
      })
      this.$once('hook:beforeDestroy',()=>{
          this.$bus.$off('handleRefresh')
      })
  },
  methods: {
    doExport(val) {},
    /**
     * 初始化表格信息
     */
    initDataList(payload) {
      this.$store
        .dispatch("automatic/getListAll", payload)
        .then(() => {
          //初始化分页
          this.pageConfig.pageNumber = this.page.pageNumber + 1;
          this.pageConfig.total = this.page.total;
          this.isReplySwitch = this.replySwitch;
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err || "初始化失败",
          });
        });
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
            message: err || "初始化失败",
          });
        });
    },

    handleClickReplySwitch() {
      let payload = {
        flag: this.isReplySwitch,
      };
      this.$store
        .dispatch("automatic/automaticSwitchReply", payload)
        .then(() => {})
        .catch((err) => {});
    },
    // showMore(row) {
    //   console.log(row, "row");
    //   // this.curly = !this.curly
    //   if (row.replyWord.length > 20) {
    //     console.log(row.replyWord.length, "row.replyWord.length");
    //     this.curly = true;
    //     this.tableReplyWord = row.replyWord.substring(0, 20);
    //   } else {
    //     this.curly = false;
    //     this.tableReplyWord = row.replyWord;
    //   }
    // },
    handleEdit(row) {
      const payload = row.uuid;
      console.log(row, "row");
      this.$refs["formDialog"].event = "EditTemplate";
      this.$refs["formDialog"].eventType = "edit";
      this.$refs["formDialog"].dialogVisible = true;
      this.$store
        .dispatch("automatic/automaticDetail", payload)
        .then((res) => {
          this.$refs["formDialog"].transfer = res;
        })
        .catch((err) => {});
      // this.$refs["formDialog"].transfer = row;
      // this.$router.push({
      //   path: "/user/detail",
      //   query: { uuid: payload },
      // });
    },
    handleSearch(val) {
      const {
        ruleName,
        keyWord,
        replyWord,
        tagIds,
        flag,
        startTime,
        endTime,
      } = val;
      this.query.ruleName = ruleName ? ruleName : "";
      this.query.keyWord = keyWord ? keyWord : "";
      this.query.replyWord = replyWord ? replyWord : "";
      this.query.tagIds = tagIds ? tagIds + "" : [];
      this.query.flag = flag ? true : false;
      this.query.startTime = startTime ? startTime : "";
      this.query.endTime = endTime ? endTime : "";
      this.query.page = 0;
      this.initDataList(this.query);
    },
    handleRequest(){
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
    handleClickSetAutoReplay() {
      this.$refs["formDialog"].event = "CreateSetTemplate";
      this.$refs["formDialog"].eventType = "createSet";
      this.$refs["formDialog"].dialogVisible = true;
    },
    handleCreate() {
      this.$refs["formDialog"].event = "CreateTemplate";
      this.$refs["formDialog"].eventType = "create";
      this.$refs["formDialog"].dialogVisible = true;
    },
    handleDelete(row) {
      const payload = { uuid: row.uuid };
      this.$confirm("是否删除当前自动回复", "Warning", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$store
            .dispatch("automatic/doDelete", payload)
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
    // handleEdit(index) {
    //   let {
    //     uuid,
    //     type,
    //     informType,
    //     tagType,
    //     sensitiveSetTag,
    //     toUser,
    //     toRole,
    //     word,
    //   } = this.listAll[index];
    //   sensitiveSetTag = JSON.parse(JSON.stringify(sensitiveSetTag));
    //   toUser = JSON.parse(JSON.stringify(toUser));
    //   toRole = JSON.parse(JSON.stringify(toRole));

    //   const transfer = {
    //     uuid,
    //     type,
    //     informType,
    //     tagType,
    //     sensitiveSetTag,
    //     toUser,
    //     toRole,
    //     word,
    //   };
    //   const payload = this.listAll[index];
    //   this.$store.commit("sensitive/SAVE_CURRENTWORD", payload);
    //   this.$refs["formDialog"].event = "EditTemplate";
    //   this.$refs["formDialog"].eventType = "edit";
    //   this.$refs["formDialog"].dialogVisible = true;
    //   this.$refs["formDialog"].transfer = transfer;
    // },
    // handleBatchChange() {
    //   if (this.rowSelects.length) {
    //     let sensitiveUuid = this.rowSelects.map((item) => {
    //       return item.uuid;
    //     });
    //     // sensitiveUuid = JSON.parse(JSON.stringify(sensitiveUuid))
    //     const transfer = { sensitiveUuid };
    //     this.$refs["formDialog"].event = "ChangeTemplate";
    //     this.$refs["formDialog"].eventType = "change";
    //     this.$refs["formDialog"].dialogVisible = true;
    //     this.$refs["formDialog"].transfer = transfer;
    //   } else {
    //     this.$message({
    //       type: "warning",
    //       message: "请至少选择一项",
    //     });
    //   }
    // },
    // handleSelectionChange(val) {
    //   this.rowSelects = val;
    // },
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
