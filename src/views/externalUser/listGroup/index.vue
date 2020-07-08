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
              <div>{{scoped.row.countNum}}</div>
            </template>
          </el-table-column>
          <el-table-column label="昨日退群" align="left">
            <template v-slot="scoped">
              <div>{{scoped.row.countNum}}</div>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createdAt"></el-table-column>
          <el-table-column label="操作" align="left" width="240">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click.stop="handleDetail(scope.$index)">详情</el-button>
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
        externalUuid: '',
        userId: ''
      }
    }
  },
  watch: {},
  computed: {
    ...mapState({
      //   roleList: state => state.role.roleList,
      listOwner: state => state.externalUser.departmentList,

      loading: state => state.externalUser.loading,
      listGroup: state => state.externalUser.listGroup,
      listGroupPage: state => state.externalUser.listGroupPage
    })
  },
  created() {
    this.initDataList(this.query)
    this.initFilter()
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    doExport(val) {
      console.log(val)
    },
    initFilter() {
      this.$store
        .dispatch('externalUser/getListOwner')
        .then(() => {})
        .catch(err => {
          this.$message({
            type: 'error',
            message: '初始化失败'
          })
        })
    },
    initDataList(payload) {
      this.$store
        .dispatch('externalUser/getListGroup', payload)
        .then(() => {
          //初始化分页
          this.pageConfig.pageNumber = this.listGroupPage.pageNumber + 1
          this.pageConfig.total = this.listGroupPage.total
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
      const { externalUuid, userId } = val
      this.query.externalUuid = externalUuid
        ? externalUuid
        : this.query.externalUuid
      this.query.userId = userId ? userId : this.query.userId
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
