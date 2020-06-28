<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <list-header></list-header>
    </el-card>

    <!-- <el-card class="content-spacing">
      <tool-bar @handleExport="doExport" :msg="`共${pageConfig.total}个客户`"></tool-bar>
    </el-card>-->

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
              <div class="user-card" v-if="scope.row.externalUser">
                <el-image
                  :src="scope.row.externalUser.avatar"
                  lazy
                  style="width:30px;height:30px;margin-right:10px"
                ></el-image>
                <!-- <img :src="scope.row.externalUser.avatar" alt=""  style="width:30px;height:30px;margin-right:10px"> -->
                <span>{{scope.row.externalUser.name}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="所属客服" align="left">
            <template v-slot="scope">
              <div>{{scope.row.user.name}}</div>
            </template>
          </el-table-column>
          <el-table-column label="标签" align="left">
            <template v-slot="scope">
              <div>
                <div v-if="scope.row.tags.length">
                  <el-tag
                    style="margin-left:5px;"
                    type="primary"
                    v-for="item in scope.row.tags"
                    :key="item.uuid"
                  >{{item.tagName}}</el-tag>
                </div>
                <span v-else>--</span>
              </div>
              <!-- <div>{{scope.row.role.name}}</div> -->
            </template>
          </el-table-column>
          <el-table-column label="流失时间" align="left" prop="createtime"></el-table-column>

          <!-- <el-table-column label="渠道来源" align="left">
            <template v-slot="scope">
            </template>
          </el-table-column>-->
          <el-table-column label="操作" align="left">
            <template slot-scope="scope">
              <el-button
                type="primary"
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

export default {
  name: "runWayListAll",
  components: {
    ListHeader,
    UserDetail,
    FormDialog,
    ToolBar
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
        flag: true,
        name: "",
        tagIds: "",
        userId: "",
        roleUuid: ""
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
    }),
    routesData() {
      return this.routes;
    }
  },
  created() {
    this.initDataList(this.query);
    // this.initFilter()
  },
  methods: {
    doExport(val) {
      console.log(val);
    },
    /**
     * 初始化筛选信息
     */
    // initFilter() {
    //   this.$store
    //     .dispatch('tag/getListSelect')
    //     .then(() => {})
    //     .catch(err => {
    //       this.$message({
    //         type: 'error',
    //         message: '初始化失败'
    //       })
    //     })

    //     this.$store
    //     .dispatch('user/getAllUserList')
    //     .then(() => {})
    //     .catch(err => {
    //       this.$message({
    //         type: 'error',
    //         message: '初始化失败'
    //       })
    //     })

    // },
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
    handleDetail(index, row) {
      this.$router.push({
        path: `/externalUser/detail/${row.uuid}`,
        query: { userId: row.user.userId }
      });
    },
    // handleSearch(val) {
    //   const { tagIds, name } = val
    //   this.query.tagIds = tagIds ? tagIds : this.query.tagIds
    //   this.query.name = name ? name : this.query.name
    //   console.log(val, 'handleSearch')
    //   this.initDataList(this.query)
    // },
    // handleRefresh() {
    //   console.log('handleRefresh')
    //   this.query = this.$options.data().query
    //   this.initDataList(this.query)
    // },
    changePage(key) {
      this.query.page = key - 1;
      this.pageConfig.pageNumber = key - 1;
      this.initDataList(this.query);
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
