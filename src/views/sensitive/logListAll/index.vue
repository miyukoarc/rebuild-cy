<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <el-card class="content-spacing">
      <tool-bar @handleExport="doExport" :msg="`共${pageConfig.total}条记录`" :hasRefresh="true" @handleRefresh="handleRequest"></tool-bar>
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
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column label="所属模块" align="left" prop="entity"></el-table-column>
          <el-table-column label="事件" align="left" prop="event"></el-table-column>
          <el-table-column label="操作员工" align="left">
            <template v-slot="scope">
              <div>{{scope.row.operator.name}}</div>
            </template>
          </el-table-column>
          <el-table-column label="时间" align="left" prop="createdAt"></el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <el-button type="text" disabled>详情</el-button>
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
import CustomerPagination from '@/components/CustomerPagination'
import ListHeader from './header.vue'
import FormDialog from './dialog'
import ToolBar from '@/components/ToolBar'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'riskManagement_logListAll',
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
        startTime: '',
        endTime: '',
        // flag: true,
        // name: '',
        // tagIds: '',
        // userId: '',
        // roleUuid: ''
      },
    }
  },
  watch: {},
  computed: {
    ...mapState({
      tagListAll: (state) => state.tag.tagListAll,

      loading: (state) => state.logRecords.loading,
      listAll: (state) => state.logRecords.logListAll,
      page: (state) => state.logRecords.logListPage,
    }),
  },
  created() {
    this.initDataList(this.query)
    // this.initFilter()
  },
  methods: {
    //   ...mapActions('log',['getLogListAll']),
    doExport(val) {},
    /**
     * 初始化筛选信息
     */
    initFilter() {
      this.$store
        .dispatch('tag/getListSelect')
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: 'error',
            message: '初始化失败',
          })
        })

      this.$store
        .dispatch('user/getAllUserList')
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: 'error',
            message: '初始化失败',
          })
        })
    },
    /**
     * 初始化表格信息
     */
    initDataList(payload) {
      this.$store
        .dispatch('logRecords/getLogListAll', payload)
        .then(() => {
          //初始化分页
          this.pageConfig.pageNumber = this.page.pageNumber + 1
          this.pageConfig.total = this.page.total
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: '初始化失败',
          })
        })
    },
    handleDetail(val) {
      const payload = this.userList[val].uuid
      this.$router.push({
        path: '/user/detail',
        query: { uuid: payload },
      })
    },
    handleRequest(){
        this.initDataList(this.query)
    },
    handleSearch(val) {
      const { tagIds, name, endTime, startTime } = val
      this.query.tagIds = tagIds ? tagIds : this.query.tagIds
      this.query.name = name ? name : this.query.name
      this.query.endTime = endTime ? endTime : this.query.endTime
      this.query.startTime = startTime ? startTime : this.query.startTime
      console.log(this.query)
      this.initDataList(this.query)
    },
    handleRefresh() {
      console.log('handleRefresh')
      this.query = this.$options.data().query
      this.initDataList()
    },
    changePage(key) {
      this.query.page = key - 1
      this.pageConfig.pageNumber = key - 1
      this.initDataList(this.query)
    },
    changeSize(val) {
      this.query.size = val
      this.initDataList(this.query)
    },
  },
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
