<template>
  <div class="app-container">
    <el-card class="content-spacing" style="overflow:initial">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <el-card class="content-spacing">
      <tool-bar
        :hasRefresh="true"
        @handleRefresh="handleRequest"
        @handleExport="handleExport"
        :msg="`共${pageConfig.total}个客户`"
      ></tool-bar>
    </el-card>
    <el-card class="content-spacing">
      <div>
        <el-table
          v-loading="loading"
          :data="list"
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
                  style="width:32px;height:32px;margin-right:10px"
                ></el-image>
                <div class="client-info">
                  <div>
                    {{scope.row.wxNickName}}
                    <span
                      class="ml-5"
                      :class="scope.row.wxType == 'WX'?'wx-color':'other-color'"
                    >{{scope.row.wxType == 'WX'?'@微信':'@企业微信'}}</span>
                  </div>
                  <span
                    class="remark"
                  >昵称：{{scope.row.remarkName?scope.row.remarkName:scope.row.wxNickName}}</span>
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
                v-if="scope.row.externalUserDetailCorpTagsList.corpTags !=null"
                :tags="scope.row.externalUserDetailCorpTagsList.corpTags"
              ></tags-drawer-obj>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label="添加时间" align="left" prop="createdAt"></el-table-column>

          <!-- <el-table-column label="来源渠道" align="left">
            <template v-slot="scope">
              <div
                v-if="Object.keys(scope.row.externalUser.contactWay).length"
              >{{scope.row.externalUser.contactWay.state}}</div>
              <div v-else>--</div>
            </template>
          </el-table-column>-->
          <el-table-column label="操作" align="center" width="80">
            <template slot-scope="scope">
              <el-t-button
                :popAuth="true"
                :auth="'externalUser,externalUser_detail'"
                v-permission="'externalUser,externalUser_detail'"
                type="text"
                size="mini"
                @click.stop.native="handleDetail(scope.row)"
              >详情</el-t-button>
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

    <!-- <form-dialog ref="formDialog"></form-dialog> -->
  </div>
</template>

<script>
import ListHeader from './header.vue'
import ToolBar from '@/components/ToolBar'

import AsyncUserDrawer from '@/components/AsyncUserDrawer'
import UserDrawer from '@/components/UserDrawer'
import TagsDrawerObj from '@/components/TagsDrawerObj'

import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'externalUser_listMy',
  components: {
    AsyncUserDrawer,
    ListHeader,
    ToolBar,
    UserDrawer,
    TagsDrawerObj,
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
    }
  },
  watch: {},
  computed: {
    ...mapState({
      tagListAll: (state) => state.tag.tagListAll,
      loading: (state) => state.externalUser.loading,
      list: (state) => state.externalUser.list,
      page: (state) => state.externalUser.page,
      permissionMap: (state) => state.permission.permissionMap,
    }),
  },
  created() {
    this.initDataList(this.query)
    this.initFilter()
  },
  mounted() {},
  methods: {
    /**
     * 初始化表格信息
     */
    initDataList(payload) {
      this.$store
        .dispatch('externalUser/getExternalUserListMy', payload)
        .then(() => {
          //初始化分页
          this.pageConfig.pageNumber = this.page.pageNumber + 1
          this.pageConfig.total = this.page.total
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
      console.log(row, 'row')
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
    handleRequest() {
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
    handleExport(val) {},
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
