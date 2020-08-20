<template>
  <div class="app-container">
    <el-row>
      <el-col :span="16">
        <div>
          <el-card class="content-spacing">
            <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
          </el-card>

          <el-card class="content-spacing">
            <tool-bar
              @handleRefresh="handleRefresh"
              :hasRefresh="true"
              :hasExport="false"
              :msg="`共${pageConfig.total}条记录`"
            >
              <div slot="right">
                <!-- <el-t-button type="primary">新建文章</el-t-button> -->
                <!-- <el-t-button
            type="primary"
            :popAuth="true"
            :auth="permissionMap['media']['media_addMediaIsAudit']"
            @click="handleCreate"
                >新建文章</el-t-button>-->
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
                @row-click="handleRowClick"
              >
                <el-table-column label="阅读客户" align="left">
                  <template v-slot="{row}">
                    <div style="display:flex;align-items:center;">
                      <el-image :src="row.externalUser.avatar" style="width:36px;height:36px;"></el-image>
                      <div style="margin-left:10px;">
                        <span>{{row.externalUser.name}}</span>
                        <!-- <span></span> -->
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="首次阅读" align="left" prop="createdAt"></el-table-column>
                <el-table-column label="最近阅读" align="left" prop="updatedAt"></el-table-column>
                <el-table-column label="阅读时长" align="left">
                  <template v-slot="{row}">{{row.readTime}} 秒</template>
                </el-table-column>
                <el-table-column label="阅读次数" align="left" prop="readCount"></el-table-column>
                <!-- <el-table-column label="阅读时长" align="left" >
                    <span>{{Math.floor(Math.random()*10) +'min'}}</span>
                </el-table-column>-->
              </el-table>

              <customer-pagination :pageConfig="pageConfig" @currentChange="changePage"></customer-pagination>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="margin-left: 10px;">
          <el-card class="content-spacing">
            <div>
              <div style="margin-bottom:20px;">
                <h3 style="display:inline-block;">文章详情</h3>
                <el-t-button
                  style="margin-left:50px"
                  size="mini"
                  type="primary"
                  @click="handleEdit"
                >编辑</el-t-button>
              </div>
              <h4 style="margin-bottom:20px;">
                <span>标题：</span>
                <span>{{articleDetail.title}}</span>
              </h4>
              <h5 style="margin-bottom:10px;">描述</h5>
              <div style="margin-bottom:20px;">
                <span class="font-exs color-info">{{articleDetail.description}}</span>
              </div>
              <h5 style="margin-bottom:20px;">正文</h5>
              <div class="cover-image" v-if="articleDetail.imgId">
                <el-image fit="contain" :src="`/api/public/file/${articleDetail.imgId}`"></el-image>
              </div>
              <div class="article-container">
                <div v-html="articleDetail.articleContent"></div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ListHeader from './header.vue'
import ToolBar from './tool-bar'
import CustomerPagination from '@/components/CustomerPagination'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    CustomerPagination,
    ListHeader,
    ToolBar,
  },
  data() {
    return {
      showDrawer: false,
      pageConfig: {
        total: 0,
        pageNumber: 0,
        pageSize: 10,
      },

      query: {
        page: 0,
        size: 10,
        name: '',
      },
      articleUuid: '',
    }
  },
  watch: {},
  computed: {
    ...mapState({
      loading: (state) => state.media.loading,
      listAll: (state) => state.media.browsingRecords,
      page: (state) => state.media.recordsPage,
      permissionMap: (state) => state.permission.permissionMap,
      articleDetail: (state) => state.media.articleDetail,
    }),
  },
  activated() {},
  created() {
    const uuid = this.$route?.params?.articleUuid
    this.articleUuid = this.$route?.params?.articleUuid
    const data = this.query
    this.initDataList({ uuid, data })
    this.initArticle(uuid)
  },
  methods: {
    doExport(val) {},
    /**
     * 初始化筛选信息
     */
    initFilter() {
      this.$store
        .dispatch('batchSendTask/getListMy')
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
    initArticle(uuid) {
      this.$store
        .dispatch('media/getArticleDetail', uuid)
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
        .dispatch('media/browsingRecords', payload)
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
    handleSearch(val) {
      const { name } = val
      this.query.name = name
      const uuid = this.articleUuid
      const data = this.query
      console.log('sousuo', data)
      this.initDataList({ uuid, data })
    },
    handleRefresh() {
      //   this.query = this.$options.data().query
      const uuid = this.articleUuid
      const data = this.query
      this.initDataList({ uuid, data })
    },
    changePage(key) {
      this.query.page = key - 1
      this.pageConfig.pageNumber = key - 1
      const uuid = this.articleUuid
      const data = this.query
      this.initDataList({ uuid, data })
    },
    handleCreate() {
      this.$router.push({
        path: '/media/article/detail/0',
      })
    },
    handleEdit(index) {
      const uuid = this.$route.params.articleUuid
      this.$router.push({
        path: '/media/article/detail/' + uuid,
      })
    },
    handleDelete(index) {
      const uuid = this.listAll[index].uuid
      this.$confirm('是否删除当前动态', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await this.$store
            .dispatch('media/deleteMedia', { uuid })
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功',
              })
              this.reload()
            })
            .catch((err) => {
              this.$message({
                type: 'error',
                message: err,
              })
            })
        })
        .catch((err) => {
          console.error(err)
        })
    },
    handleRowClick(val) {},
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
.cover-image {
  height: 150px;
  width: 100px;
}
.article-container {
  height: 400px;
  overflow-y: scroll;
}
</style>
