<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <el-card class="content-spacing">
      <tool-bar @handleExport="doExport" :msg="`共${pageConfig.total}个客户`">
          <el-button type="primary">添加标签组</el-button>
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
          <el-table-column label="标签组名" align="left" prop="groupName" width="100"></el-table-column>
          <el-table-column label="标签" align="left">
              <template v-slot="scope">
                  <div v-if="Object.keys(scope.row.tags).length">

                    <el-tag v-for="item in scope.row.tags" :key="item.uuid" style="margin-right:5px;">{{item.tagName}}</el-tag>
                  </div>
                  <div v-else>--</div>
              </template>
          </el-table-column>
          <!-- <el-table-column label="文章描述" align="left"></el-table-column> -->
          <el-table-column label="操作" align="left">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click.stop="handleDetail(scope.$index)">详情</el-button>
              <!-- <el-button type="primary" size="mini">分配部门</el-button> -->
              <!-- <el-button type="primary" size="mini" @click.stop="handleEdit(scope.row)">编辑</el-button> -->
              <!-- <el-button type="danger" size="mini" @click.stop="handleDelete(scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>

        <!-- <el-pagination
          background
          class="pager"
          layout="total,prev, pager, next,jumper"
          :total="pageConfig.total"
          :current-page.sync="pageConfig.pageNumber"
          :page-size="pageConfig.pageSize"
          @current-change="changePage"
        /> -->
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
        groupName: '',
        tagName: ''
      }
    }
  },
  watch: {},
  computed: {
    ...mapState({
      loading: state => state.tag.loading,
      listAll: state => state.tag.tagListAll,
      page: state => state.tag.tagListPage
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
        .dispatch('tag/getListSelect')
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
        .dispatch('tag/getTagList', payload)
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
      const { tagIds, name } = val
      this.query.tagIds = tagIds ? tagIds : this.query.tagIds
      this.query.name = name ? name : this.query.name
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
