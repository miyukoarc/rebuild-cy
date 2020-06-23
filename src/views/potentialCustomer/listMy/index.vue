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
          >添加客户</el-t-button>
          <el-t-button
            type="primary"
            :auth="permissionMap['potentialCustomer']['potentialCustomer_add']"
            :popAuth="true"
          >新增用户</el-t-button>
          <el-t-button :auth="permissionMap['potentialCustomer']['potentialCustomer_allocation']">分配</el-t-button>
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
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="客户名" align="left">
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
          <el-table-column label="手机号" align="left"></el-table-column>
          <el-table-column label="批量添加次数" align="left"></el-table-column>
          <el-table-column label="入库时间" align="left"></el-table-column>
          <el-table-column label="所属员工" align="left"></el-table-column>
          <el-table-column label="添加员工" align="left"></el-table-column>
          <el-table-column label="操作" align="left">
            <template slot-scope="scope">
              <el-t-button size="mini" @click.stop="handleEdit(scope.$index)">编辑</el-t-button>
              <el-t-button size="mini" @click.stop="handleDelete(scope.$index)">删除</el-t-button>
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
import UserDetail from './detail.vue'
import ListHeader from './header.vue'
import FormDialog from './dialog'
import ToolBar from './tool-bar'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
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
        name: '',
        mobile: '',
        endTime: '',
        startTime: '',
        tryCount: ''
      }
    }
  },
  watch: {},
  computed: {
    ...mapState({
      tagListAll: state => state.tag.tagListAll,

      loading: state => state.potentialCustomer.loading,
      listAll: state => state.potentialCustomer.listMy,
      page: state => state.potentialCustomer.listMyPage,

      permissionMap: state => state.permission.permissionMap
    }),
    routesData() {
      return this.routes
    }
  },
  created() {
    this.initDataList(this.query)
    // this.initFilter()
  },
  methods: {
    doExport(val) {
      console.log(val)
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

    //   this.$store
    //     .dispatch('user/getUserListSelect')
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
        .dispatch('potentialCustomer/getListMy', payload)
        .then(() => {
          //初始化分页
          this.pageConfig.pageNumber = this.page.pageNumber + 1
          this.pageConfig.total = this.page.total
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: '初始化失败'
          })
        })
    },
    handleDetail(val) {
      const payload = this.userList[val].uuid
      this.$router.push({
        path: '/user/detail',
        query: { uuid: payload }
      })
    },
    handleSearch(val) {
      const { name, mobile, endTime, startTime, tryCount } = val
      this.query.name = name ? name : this.query.name
      this.query.mobile = mobile ? mobile : this.query.mobile
      this.query.endTime = endTime ? endTime : this.query.endTime
      this.query.startTime = startTime ? startTime : this.query.startTime
      this.query.tryCount = tryCount ? tryCount : this.query.tryCount
      console.log(val, 'handleSearch')
      this.initDataList(this.query)
    },
    handleRefresh() {
      console.log('handleRefresh')
      this.query = this.$options.data().query
      this.initDataList(this.query)
    },
    changePage(key) {
      this.query.page = key - 1
      this.pageConfig.pageNumber = key - 1
      this.initDataList(this.query)
    },
    handleEdit() {},
    handleDelete() {}
  }
}
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
