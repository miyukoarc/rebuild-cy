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
          row-key="uuid"
          stripe
          lazy
          highlight-current-row
          header-row-class-name="el-table-header"
        >
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column label="触发内容" align="left">
            <template v-slot="{row}">
              <div>{{row.sensitiveWord}}</div>
            </template>
          </el-table-column>
          <el-table-column label="触发员工" align="left">
            <template v-slot="{row}">
              <async-user-tag size="small" type="info" :uuid="row.triggerUser.uuid">
                <i class="el-icon-user-solid color-primary"></i>
                {{row.triggerUser.name}}
              </async-user-tag>
            </template>
          </el-table-column>
          <el-table-column label="触发时间" align="left" prop="createdAt"></el-table-column>
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
import ListHeader from './header.vue'
import { mapState, mapMutations, mapActions } from 'vuex'

import CustomerPagination from '@/components/CustomerPagination'
import AsyncUserTag from '@/components/AsyncUserTag'
import ToolBar from '@/components/ToolBar'

export default {
    name: 'riskManagement_sensitiveLogListAll',
  components: {
    ListHeader,
    AsyncUserTag,
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
        word: '',
        userUuid: '',
        startTime: '',
        endTime: '',
      },
    }
  },
  watch: {},
  computed: {
    ...mapState({
      loading: (state) => state.sensitive.loading,
      listAll: (state) => state.sensitive.logListAll,
      page: (state) => state.sensitive.logListAllPage,
    }),
  },
  created() {
    this.initDataList(this.query)
    this.initFilter()
  },
  methods: {
    doExport(val) {
      
    },
    /**
     * 初始化筛选信息
     */
    initFilter() {
      this.$store
        .dispatch('user/getUserListSelect')
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
        .dispatch('sensitive/getLog', payload)
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
      const { startTime, endTime, userUuid, word } = val
      this.query.startTime = startTime ? startTime : this.query.startTime
      this.query.endTime = endTime ? endTime : this.query.endTime
      this.query.userUuid = userUuid ? userUuid : this.query.userUuid
      this.query.word = word ? word : this.query.word
      this.query.page = 0
      this.initDataList(this.query)
    },
    handleRefresh() {
      this.query = this.$options.data().query
      this.initDataList(this.query)
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
