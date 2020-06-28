<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <el-card class="content-spacing">
      <tool-bar :hasExport="false">
        <div slot="right">
          <!-- <el-t-button type="primary">新建文章</el-t-button> -->
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
        >
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column label="文章标题" align="left" prop="title"></el-table-column>
          <el-table-column label="上传时间" align="left" prop="createdAt"></el-table-column>
          <el-table-column label="文章描述" align="left" prop="description"></el-table-column>
          <el-table-column label="操作" align="left">
            <template v-slot="scope">
              <el-t-button
                size="mini"
                @click.stop="handleEdit(scope.$index)"
                :popAuth="true"
                :auth="permissionMap['media']['media_article/update']"
              >编辑</el-t-button>
              <el-t-button
                size="mini"
                @click.stop="handleDelete(scope.$index)"
                :popAuth="true"
                :auth="permissionMap['media']['media_delete']"
              >删除</el-t-button>
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
      //   this.query.name = name ? name : this.query.name
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
              this.reload()
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
