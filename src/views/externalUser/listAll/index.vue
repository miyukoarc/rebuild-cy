<template>
  <div class="app-container">
    <el-card class="content-spacing" style="overflow:initial">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <el-card class="content-spacing">
      <tool-bar
        @handleExport="handleExport"
        :loading="downloadLoading"
        :msg="`共${pageConfig.total}个客户`"
      ></tool-bar>
    </el-card>
    <el-card class="content-spacing">
      <div>
        <el-table
          v-loading="loading"
          :data="externalUserListAll"
          style="width: 100%"
          row-key="uuid"
          stripe
          lazy
          highlight-current-row
          header-row-class-name="el-table-header"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="客户名" align="left">
            <template v-slot="scope">
              <div class="user-card">
                <el-image
                  :src="scope.row.avatar"
                  lazy
                  style="width:30px;height:30px;margin-right:10px"
                ></el-image>
                <div class="client-info">
                  <span class="remark">{{scope.row.remarkName}}</span>
                  <div>{{scope.row.wxNickName}}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="所属员工" align="left">
            <template v-slot="scope">
              <async-user-drawer :hasPop="true" :users="scope.row.user"></async-user-drawer>
            </template>
          </el-table-column>

          <el-table-column label="企业标签" align="left">
            <template v-slot="scope">
              <tags-drawer-obj
                v-if="scope.row.externalUserDetailCorpTagsList.corpTags !==null"
                :tags="scope.row.externalUserDetailCorpTagsList.corpTags"
              ></tags-drawer-obj>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label="添加时间" align="left" prop="createdAt"></el-table-column>

          <el-table-column label="操作" align="center" width="80px">
            <template v-slot="scope">
              <el-t-button
                v-permission="'externalUser,externalUser_detail'"
                :popAuth="true"
                :auth="'externalUser,externalUser_detail'"
                type="text"
                size="mini"
                @click.native.stop="handleDetail(scope.row)"
              >详情</el-t-button>
              <!-- <i class="el-icon-circle-close color-info" v-else></i> -->
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
  </div>
</template>

<script>
import ListHeader from './header.vue'
import ToolBar from '@/components/ToolBar'
import AsyncUserDrawer from '@/components/AsyncUserDrawer'
import UserDrawer from '@/components/UserDrawer'
import TagsDrawerObj from '@/components/TagsDrawerObj'
import CustomerPagination from '@/components/CustomerPagination'
import { mapState, mapMutations, mapActions } from 'vuex'

import { getExternalUserListAll } from '@/api/externalUser'

export default {
  components: {
    AsyncUserDrawer,
    ListHeader,
    ToolBar,
    UserDrawer,
    TagsDrawerObj,
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
        flag: true,
        name: '',
        tagIds: [],
        userId: '',
        startTime: '',
        endTime: '',
        contractWayId: '',
      },

      downloadLoading: false,
    }
  },
  watch: {},
  computed: {
    ...mapState({
      tagListAll: (state) => state.tag.tagListAll,
      loading: (state) => state.externalUser.loading,
      externalUserListAll: (state) => state.externalUser.externalUserListAll,
      listAllPage: (state) => state.externalUser.listAllPage,
      permissionMap: (state) => state.permission.permissionMap,
    }),
  },
  created() {
    this.initDataList(this.query)
    this.initFilter()
  },
  methods: {
    /**
     * 初始化表格信息
     */
    initDataList(payload) {
      this.$store
        .dispatch('externalUser/getExternalUserListAll', payload)
        .then(() => {
          console.log(this.externalUserListAll)
          //初始化分页
          this.pageConfig.pageNumber = this.listAllPage.pageNumber + 1
          this.pageConfig.total = this.listAllPage.total
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err || '初始化失败',
          })
        })
    },

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
        .dispatch('user/getUserListSelect')
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: 'error',
            message: '初始化失败',
          })
        })
    },

    handleDetail(row) {
      const uuid = row.externalUuid
      this.$router.push({
        path: '/externalUser/detail/' + uuid,
      })
    },
    handleSearch(val) {
      const {
        tagIds,
        name,
        userId,
        startTime,
        endTime,
        contractWayId,
        flag,
      } = val
      this.query.tagIds = tagIds ? tagIds + '' : this.query.tagIds
      this.query.name = name ? name : ''
      this.query.userId = userId ? userId : ''
      this.query.startTime = startTime ? startTime : ''
      this.query.flag = flag ? true : false
      this.query.endTime = endTime ? endTime : ''
      this.query.page = 0

      // this.query.contractWayId = contractWayId
      //   ? contractWayId
      //   : this.query.contractWayId;

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
    handleExport(val) {
      //   const payload = this.query
      //   const total = this.pageConfig.total
      //   const list = await getExternalUserListAll({
      //     ...payload,
      //     total,
      //   })
      //     .then((res) => Promise.resolve(res.items))
      //     .catch((err) => {
      //       console.error(err)
      //       Promise.reject(err)
      //     })
      //   this.downloadLoading = true
      //   import('@/vendor/Export2Excel').then((excel) => {
      //     const tHeader = ['客户', '所属员工', '企业标签', '添加时间']
      //     console.log(excel)
      //     const filterVal = ['wxNickName', 'title', 'user', 'externalUserDetailCorpTagsList', 'createdAt']
      //     // const list = this.list
      //     const data = this.formatJson(filterVal, list)
      //     excel.export_json_to_excel({
      //       header: tHeader,
      //       data,
      //       filename: 'ceshi',
      //       autoWidth: true,
      //       bookType: 'xlsx',
      //     })
      //     this.downloadLoading = false
      //   })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.user-card {
  display: flex;
  align-items: center;
  .client-info {
    .remark {
      min-height: 16px;
    }
  }
}
</style>

<style lang="scss">
.pager {
  padding: 20px 0;
  text-align: center;
}
</style>
