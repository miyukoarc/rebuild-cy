<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <el-card class="content-spacing">
      <tool-bar @handleExport="doExport" :msg="`共${pageConfig.total}个客户`"></tool-bar>
    </el-card>

    <el-card class="content-spacing">
      <div>
        <el-table
          v-loading="loading"
          :data="runWayListAll"
          style="width: 100%"
          row-key="uuid"
          stripe
          lazy
          highlight-current-row
        >
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column label="流失客户" align="left">
            <template v-slot="scope">
              <div class="user-card">
                <el-image
                  :src="scope.row.externalUser.avatar"
                  lazy
                  style="width:30px;height:30px;margin-right:10px"
                ></el-image>
                <div class="client-info">
                  <span class="remark">
                    {{scope.row.remark}}
                    <span
                      class="main-color"
                    >{{scope.row.externalUser.type==1?"@微信":'@企业微信' }}</span>
                  </span>
                  <div>{{scope.row.externalUser.name}}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="所属员工" align="left">
            <template v-slot="scope">
              <user-tag :user="scope.row.user" :hasPop="hasPop"></user-tag>
            </template>
          </el-table-column>
          <el-table-column label="标签" align="left">
            <template v-slot="scope">
              <tags-drawer v-if="scope.row.tags" :tags="scope.row.tags.corpTags"></tags-drawer>
            </template>
          </el-table-column>
          <el-table-column label="流失时间" align="left" prop="updatedAt"></el-table-column>
          <el-table-column label="流失类型" align="left">
            <template v-slot="scope">{{scope.row.delFollow?'被客户删除':'主动删除客户'}}</template>
          </el-table-column>
          <!-- <el-table-column label="渠道来源" align="left">
            <template v-slot="scope">
            </template>
          </el-table-column>-->
          <el-table-column label="操作" align="left">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click.stop="handleDetail(scope.$index,scope.row)"
              >详情</el-button>
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
import FormDialog from "./dialog";
import ToolBar from "./tool-bar";
import { mapState, mapMutations, mapActions } from "vuex";

// import UserDrawer from "@/components/UserDrawer";
import TagsDrawer from "@/components/TagsDrawer";
import UserTag from "@/components/UserTag";

export default {
  name: "runWayListAll",
  components: {
    ListHeader,
    UserDetail,
    FormDialog,
    ToolBar,
    // UserDrawer,
    TagsDrawer,
    UserTag
    // mHeadedr
  },
  data() {
    return {
      hasPop: false,
      pageConfig: {
        total: 0,
        pageNumber: 0,
        pageSize: 10
      },

      query: {
        page: 0,
        size: 10,
        flag: true,
        name: "",
        tagIds: "",
        userUuid: "",
        startTime: "",
        endTime: "",
        delFollow: ""
      }
    };
  },
  watch: {},
  computed: {
    ...mapState({
      tagListAll: state => state.tag.tagListAll,
      loading: state => state.externalUser.loading,
      runWayListAll: state => state.externalUser.runWayListAll,
      runWayListAllPage: state => state.externalUser.runWayListAllPage
    })
  },
  created() {
    this.initDataList(this.query);
    this.initFilter();
  },
  methods: {
    /**
     * 初始化表格信息
     */
    initDataList(payload) {
      this.$store
        .dispatch("externalUser/getRunWayListAll", payload)
        .then(() => {
          //初始化分页
          this.pageConfig.pageNumber = this.runWayListAllPage.pageNumber + 1;
          this.pageConfig.total = this.runWayListAllPage.total;
        })
        .catch(err => {
          console.error(err);
          this.$message({
            type: "error",
            message: "初始化失败"
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

    handleDetail(index, row) {
      this.$router.push({
        path: `/externalUser/detail/${row.uuid}`,
        query: { userId: row.user.userId }
      });
    },
    handleSearch(val) {
      const {
        name,
        contractWayId,
        userUuid,
        tagIds,
        flag,
        startTime,
        endTime,
        delFollow
      } = val;
      if(delFollow === ''){
        this.query.delFollow = ''
      }else if(delFollow === true){
        this.query.delFollow = true
      }else{
        this.query.delFollow = false
      }
      this.query.flag = flag ? true : false;
      this.query.name = name ? name : this.query.name;
      this.query.tagIds = tagIds ? tagIds + "" : this.query.tagIds;
      this.query.userUuid = userUuid ? userUuid : this.query.userUuid;
      this.query.startTime = startTime ? startTime : this.query.startTime;
      this.query.endTime = endTime ? endTime : this.query.endTime;
      // this.query.delFollow = delFollow ? delFollow : this.query.delFollow;
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
    doExport(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped>
.user-card {
  display: flex;
  align-items: center;
  .main-color {
    font-size: 13px;
    color: #409eff;
  }
}
</style>

<style lang="scss">
.pager {
  padding: 20px 0;
  text-align: center;
}
</style>
