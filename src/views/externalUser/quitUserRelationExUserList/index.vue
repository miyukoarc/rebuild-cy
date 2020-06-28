<template>
  <div class="app-container">
    <!-- <el-card class="content-spacing">
      <list-header></list-header>
    </el-card> -->

    <el-card class="content-spacing">
      <tool-bar @handleExport="doExport" >
          <div slot="right">
              <!-- <el-t-button type="primary" @click="handleDistribute" :popAuth="true" :auth="permissionMap['externalUser']['externalUser_redistributionExUser']">分配给其他员工</el-t-button> -->
          </div>
      </tool-bar>
    </el-card>

    <el-card class="content-spacing">
      <div>
        <el-table
          v-loading="loading"
          :data="quitUserRelationExUserList"
          style="width: 100%"
          row-key="uuid"
          stripe
          lazy
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column label="离职员工" prop="name" align="left">
          </el-table-column>

          <el-table-column label="部门" prop="departments[0].name" align="left">
          </el-table-column>
          <el-table-column label="待分配人数" prop="toBeAllocatedGroupCount" align="left">
          </el-table-column>
          <el-table-column label="离职时间" align="left" prop="updatedAt"></el-table-column>

          <!-- <el-table-column label="渠道来源" align="left">
            <template v-slot="scope">
            </template>
          </el-table-column>-->
          <el-table-column label="操作" align="left">
            <template slot-scope="scope">
              <el-t-button type="primary" size="mini" :popAuth="true" :auth="permissionMap['externalUser']['externalUser_redistributionExUser']" @click.stop="handleDistributeSingle(scope.$index)">分配</el-t-button>
              <el-t-button :popAuth="true" :auth="permissionMap['externalUser']['externalUser_quitUserRelationExUserList']" type="primary" size="mini" @click.stop="handleDetail(scope.$index)">详情</el-t-button>
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
  name: 'runWayListAll',
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
        // page: 0,
        // size: 10,
        // flag: true,
        // name: '',
        // tagIds: '',
        // userId: '',
        // roleUuid: ''
      },
      // 选择勾选
      selectedAllData:[],
    }
  },
  watch: {},
  computed: {
    ...mapState({
    //   tagListAll: state => state.tag.tagListAll,
    

      loading: state => state.externalUser.loading,
      quitUserRelationExUserList: state => state.externalUser.quitUserRelationExUserList,
      permissionMap: state => state.permission.permissionMap
    }),
  },
  created() {
    this.initDataList(this.query)
    this.initFilter()
  },
  mounted(){
    this.$bus.$on('handleRefresh',()=>{
        this.initDataList(this.query)
    })
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
        .dispatch('externalUser/getQuitUserRelationExUserList', payload)
        .then(() => {
          //初始化分页
          // this.pageConfig.pageNumber = this.runWayListAllPage.pageNumber + 1
          // this.pageConfig.total = this.runWayListAllPage.total
        })
        .catch(err => {
            console.error(err)
          this.$message({
            type: 'error',
            message: '初始化失败'
          })
        })
    },
    handleDetail(index) {
      const userId = this.quitUserRelationExUserList[index].userId
      this.$router.push({
        path: '/externalUser/quitUserRelationExUserDetail',
        query: { userId: userId }
      })
    },
    handleDistribute(){
        this.$refs['formDialog'].event = 'DistributeTemplate'
        this.$refs['formDialog'].eventType = 'distribute'
        this.$refs['formDialog'].dialogVisible = true
        this.$refs['formDialog'].selectedAllData = this.selectedAllData
    },
    handleDistributeSingle(index){
      console.log('index',this.quitUserRelationExUserList[index])
      const payload = {}
        this.$refs['formDialog'].event = 'DistributeTemplate'
        this.$refs['formDialog'].eventType = 'distribute'
        this.$refs['formDialog'].dialogVisible = true
        this.$refs['formDialog'].transfer = payload
        this.$store.commit('externalUser/SAVE_QUITUSERCURRENTROW',this.quitUserRelationExUserList[index])
    },
    changePage(key) {
      this.query.page = key - 1
      this.pageConfig.pageNumber = key - 1
      this.initDataList(this.query)
    },
    handleSelectionChange(val){
      this.selectedAllData = val
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
