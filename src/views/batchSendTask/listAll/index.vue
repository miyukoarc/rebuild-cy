<template>
  <div class="app-container">
    <el-card class="content-spacing" style="overflow:initial">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>
    <el-card class="content-spacing">
      <tool-bar
        @handleExport="doExport"
        :msg="`共${pageConfig.total}条记录`"
        :hasRefresh="true"
        @handleRefresh="handleRequest"
      >
        <div slot="right">
          <el-t-button
            type="primary"
            v-permission="'batchSendTask,batchSendTask_add'"
            :popAuth="true"
            :auth="'batchSendTask,batchSendTask_add'"
            @click="actionDepartment"
          >新建群发</el-t-button>
        </div>
      </tool-bar>
    </el-card>

    <el-card class="content-spacing">
      <div>
        <el-table
          v-loading="loading"
          :data="batchSendTaskListAll"
          style="width: 100%"
          row-key="uuid"
          stripe
          lazy
          highlight-current-row
          header-row-class-name="el-table-header"
        >
          <!-- <el-table-column type="selection"></el-table-column> -->
          <!-- <el-table-column label="id" align="left" prop="msgId"></el-table-column> -->
          <el-table-column label="发送者" align="left">
            <template v-slot="scope">
              <div>{{scope.row.sender.name}}</div>
            </template>
          </el-table-column>
          <el-table-column label="群发类型" align="left" prop="sendType" :formatter="sendTypeFormatter"></el-table-column>
          <el-table-column label="内容" align="left" prop="textContent"></el-table-column>
          <el-table-column label="修改时间" align="left" prop="updatedAt"></el-table-column>
          <el-table-column label="创建时间" align="left" prop="createdAt"></el-table-column>
          <el-table-column label="内容审查" align="left">
            <template v-slot="{row}">
              <el-button type="text" @click="handlePermissionLessDetail(row)">
                  {{row.reviewed?'已审查':'未审查'}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="80px">
            <template slot-scope="scope">
              <el-t-button
                v-permission="'batchSendTask,batchSendTask_detail'"
                :popAuth="true"
                :auth="'batchSendTask,batchSendTask_detail'"
                type="text"
                @click.stop.native="handleDetail(scope.row)"
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

    <form-dialog ref="formDialog"></form-dialog>
  </div>
</template>

<script>
import ListHeader from './header.vue'
import FormDialog from './dialog'
import ToolBar from '@/components/ToolBar'
import CustomerPagination from '@/components/CustomerPagination'

import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'batchSendTask_listAll',
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
      },
    }
  },
  watch: {},
  computed: {
    ...mapState({
      tagListAll: (state) => state.tag.tagListAll,

      loading: (state) => state.batchSendTask.loading,
      batchSendTaskListAll: (state) => state.batchSendTask.batchSendTaskListAll,
      page: (state) => state.batchSendTask.listAllPage,

      permissionMap: (state) => state.permission.permissionMap,
    }),
  },
  created() {
    this.initDataList(this.query)
    this.initFilter()
  },
  mounted() {
    this.$bus.$on('handleRefresh', () => {
      this.initDataList(this.query)
    })

    this.$once('hook:beforeDestroy', () => {
      this.$bus.$off('handleRefresh')
    })
  },
  methods: {
    sendTypeFormatter(row, column) {
      return row.sendType == 'MY' ? '超盈群发' : '企业微信群发'
    },
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
    },
    /**
     * 初始化表格信息
     */
    initDataList(payload) {
      this.$store
        .dispatch('batchSendTask/getBatchSendTaskListAll', payload)
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
      this.$router.push(`/batchSendTask/detail/${val.uuid}`)
    },
    handleSearch(val) {
      const { state, sendType, senderUuid, startTime, endTime } = val
      this.query.state = state ? state : this.query.state
      this.query.sendType = sendType ? sendType : this.query.sendType
      this.query.senderUuid = senderUuid ? senderUuid : this.query.senderUuid
      this.query.startTime = startTime ? startTime : ''
      this.query.endTime = endTime ? endTime : ''
      this.query.page = 0
      this.initDataList(this.query)
    },
    handleRequest() {
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

    actionDepartment() {
      this.$refs.formDialog.dialogVisible = true
      this.$refs.formDialog.event = 'addBatchSendTaskTemplate'
      this.$refs.formDialog.eventType = 'addBatchSendTask'
      this.$refs.formDialog.dialogWidth = '70%'
    },
    changeSize(val) {
      this.query.size = val
      this.initDataList(this.query)
    },
    handlePermissionLessDetail(row){
        const uuid = row.uuid
        this.$router.push({path: '/batchSendTask/changeSendTaskReviewed',query:{uuid}})
    }
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
