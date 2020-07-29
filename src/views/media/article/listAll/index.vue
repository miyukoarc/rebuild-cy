<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <el-card class="content-spacing">
      <tool-bar :hasExport="false">
        <div slot="right">

          <el-t-button
            type="primary"
            :popAuth="true"
            :auth="permissionMap['media']['media_addMediaIsAudit']"
            @click="handleCreate"
          >新建文章</el-t-button>
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
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column label="文章标题" align="left" prop="title"></el-table-column>
          <el-table-column label="上传时间" align="left" prop="createdAt"></el-table-column>
          <el-table-column label="文章描述" align="left" prop="description"></el-table-column>
          <el-table-column label="操作" align="left">
            <template v-slot="scope">
              <el-t-button
                size="mini"
                type="text"
                @click.stop="handleEdit(scope.$index)"
                :popAuth="true"
                :auth="permissionMap['media']['media_article_update']"
              >编辑</el-t-button>
              <el-t-button
                size="mini"
                type="text"
                @click.stop="handleRecords(scope.$index)"
                :popAuth="true"
                :auth="permissionMap['media']['media_browsing_Records']"
              >记录</el-t-button>
              <el-t-button
                size="mini"
                type="text"
                @click.stop="handleDelete(scope.$index)"
                :popAuth="true"
                :auth="permissionMap['media']['media_delete']"
              >删除</el-t-button>
            </template>
          </el-table-column>
        </el-table>


        <customer-pagination :pageConfig="pageConfig" @current-change="changePage" @size-change="changeSize"></customer-pagination>
      </div>
    </el-card>

    <form-dialog ref="formDialog"></form-dialog>
  </div>
</template>

<script>
import ListHeader from './header.vue'
import FormDialog from './dialog'
import ToolBar from './tool-bar'
import CustomerPagination from '@/components/CustomerPagination'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  inject: ['reload'],
  components: {
    CustomerPagination,
    ListHeader,
    FormDialog,
    ToolBar
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
        title: ''
      }
    }
  },
  watch: {},
  computed: {
    ...mapState({
      //   tagListAll: state => state.tag.tagListAll,

      loading: state => state.media.loading,
      listAll: state => state.media.articleList,
      page: state => state.media.page,

      permissionMap: state => state.permission.permissionMap
    })
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
    initFilter() {
      this.$store
        .dispatch('batchSendTask/getListMy')
        .then(() => {})
        .catch(err => {
          this.$message({
            type: 'error',
            message: '初始化失败'
          })
        })

      this.$store
        .dispatch('user/getAllUserList')
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
        .dispatch('media/getArticleList', payload)
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
      const { title } = val
      this.query.title = title ? title : this.query.title
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
    handleCreate() {
      this.$router.push({
        path: '/media/article/detail/0'
      })
    },
    handleEdit(index) {
      const uuid = this.listAll[index].uuid
      this.$router.push({
        path: '/media/article/detail/' + uuid
      })
    },
    handleDelete(index) {
      const uuid = this.listAll[index].uuid
      this.$confirm('是否删除当前动态', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$store
            .dispatch('media/deleteMedia', { uuid })
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.initDataList()
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: err
              })
            })
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleRecords(index) {
      const uuid = this.listAll[index].uuid
      this.$router.push({
        path: '/media/browsingRecords/' + uuid
      })
    },
    changeSize(val){
        this.query.size = val
        this.initDataList(this.query)
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
</style>
