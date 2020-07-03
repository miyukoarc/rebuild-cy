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
            :popAuth="true"
            :auth="permissionMap['riskManagement']['riskManagement_add']"
            @click.stop="handleCreate"
          >新建</el-t-button>
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
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column label="敏感词" align="left" prop="word"></el-table-column>
          <el-table-column label="通知人" align="left">
            <template v-slot="scope">
              <div>
                <span v-for="item in scope.row.toUser" style="margin-left:5px;" :key="item.uuid">{{item.name}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="left" prop="createdAt"></el-table-column>
          <el-table-column label="状态" align="left">
            <template v-slot="scope">
              <div>{{scope.row.deleted?'无效':'有效'}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="left">
            <template slot-scope="scope">
              <!-- <el-button type="primary" size="mini" @click.stop="handleDetail(scope.$index)">详情</el-button> -->
              <el-t-button
                type="primary"
                :popAuth="true"
                :auth="permissionMap['riskManagement']['riskManagement_update']"
                size="mini"
                @click.stop="handleEdit(scope.$index)"
              >编辑</el-t-button>

              <el-t-button
                type="danger"
                :popAuth="true"
                :auth="permissionMap['riskManagement']['riskManagement_delete']"
                size="mini"
                @click.stop="handleDelete(scope.$index)"
              >删除</el-t-button>
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
        startTime: '',
        endTime: '',
        word: ''
      }
    }
  },
  watch: {},
  computed: {
    ...mapState({
      //   tagListAll: state => state.tag.tagListAll,

      loading: state => state.sensitive.loading,
      listAll: state => state.sensitive.sensitiveListAll,
      page: state => state.sensitive.sensitivePage,

      permissionMap: state => state.permission.permissionMap
    })
  },
  created() {
    this.initDataList(this.query)
    this.initFilter()
  },
  methods: {
    doExport(val) {
      console.log(val)
    },
    /**
     * 初始化筛选信息
     */
    initFilter() {
      //   this.$store
      //     .dispatch('sensitive/getSensitiveListAll')
      //     .then(() => {})
      //     .catch(err => {
      //       this.$message({
      //         type: 'error',
      //         message: '初始化失败'
      //       })
      //     })

      this.$store
        .dispatch('user/getUserListSelect')
        .then(() => {})
        .catch(err => {
          this.$message({
            type: 'error',
            message: '初始化失败'
          })
        })
    },
    /**
     * 初始化表格信息
     */
    initDataList(payload) {
      this.$store
        .dispatch('sensitive/getSensitiveListAll', payload)
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
      const { startTime, endTime, word } = val
      this.query.startTime = startTime ? startTime : this.query.startTime
      this.query.endTime = endTime ? endTime : this.query.endTime
      this.query.word = word ? word : this.query.word
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
    handleCreate() {
      this.$refs['formDialog'].event = 'CreateTemplate'
      this.$refs['formDialog'].eventType = 'create'
      this.$refs['formDialog'].dialogVisible = true
    },
    handleDelete(index) {
      const payload = { uuid: this.listAll[index].uuid }
      this.$confirm('是否删除当前敏感词', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$store
            .dispatch('sensitive/deleteSensitive', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.initDataList(this.query)
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: err
              })
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleEdit(index) {
        let {toUser,type,uuid,word} = this.listAll[index]
        toUser = toUser.map(item=>{return item.userId})
        // console.log(toUser)
        const payload = {toUser,type,uuid,word}
      this.$refs['formDialog'].event = 'EditTemplate'
      this.$refs['formDialog'].eventType = 'edit'
      this.$refs['formDialog'].dialogVisible = true
      this.$refs['formDialog'].transfer = payload
    }
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
