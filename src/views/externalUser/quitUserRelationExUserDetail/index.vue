<template>
  <div class="app-container">
    <!-- <el-card class="content-spacing">
      <list-header></list-header>
    </el-card>-->

    <el-card class="content-spacing">
      <tool-bar @handleExport="doExport" >
        <div slot="right">
          <el-t-button
            type="primary"
            @click="handleDistribute"
            :popAuth="true"
            :auth="permissionMap['externalUser']['externalUser_redistributionExUser']"
          >分配给其他员工</el-t-button>
        </div>
      </tool-bar>
    </el-card>

    <el-card class="content-spacing">
      <div>
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="listAll"
          style="width: 100%"
          row-key="uuid"
          stripe
          lazy
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="客户名称" prop="externalUserName" align="left"></el-table-column>

          <el-table-column label="原添加人" prop="userName" align="left"></el-table-column>
          <el-table-column label="原添加人所属部门" prop="departName" align="left"></el-table-column>
          <el-table-column label="离职时间" align="left" prop="quitDate"></el-table-column>

          <!-- <el-table-column label="渠道来源" align="left">
            <template v-slot="scope">
            </template>
          </el-table-column>-->
          <el-table-column label="操作" align="left">
            <template slot-scope="scope">
              <el-t-button
                type="primary"
                size="mini"
                :popAuth="true"
                :auth="permissionMap['externalUser']['externalUser_redistributionExUser']"
                @click.stop="handleDistributeSingle(scope.$index)"
              >分配</el-t-button>
              <!-- <el-t-button :popAuth="true" :auth="permissionMap['externalUser']['externalUser_quitUserRelationExUserList']" type="primary" size="mini" @click.stop="handleDetail(scope.$index)">详情</el-t-button> -->
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
        />-->
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
      selectedAllData:[]
    }
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        console.log(this.$route.query)
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      //   tagListAll: state => state.tag.tagListAll,

      loading: state => state.externalUser.loading,
      listAll: state => state.externalUser.quitUserRelationExUserListDetail,
      permissionMap: state => state.permission.permissionMap
    })
  },
  created() {
    this.initDataList(this.$route.query)
    // this.initFilter()
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
        .dispatch('department/getDepartmentListSelect')
        .then(() => {})
        .catch(err => {
          this.$message({
            type: 'error',
            message: '初始化失败'
          })
        })

    //   this.$store
    //     .dispatch('user/getUserListSelect')
    //     .then(() => {})
    //     .catch(err => {
    //       this.$message({
    //         type: 'error',
    //         message: '初始化失败'
    //       })
    //     })
    },
    /**
     * 初始化表格信息
     */
    initDataList(payload) {
      this.$store
        .dispatch('externalUser/getQuitUserRelationExUserDetail', payload)
        .then(() => {
          //初始化分页
          //   this.pageConfig.pageNumber = this.runWayListAllPage.pageNumber + 1
          //   this.pageConfig.total = this.runWayListAllPage.total
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
    handleDistribute() {
      if(this.selectedAllData.length>0){
        this.$refs['formDialog'].event = 'DistributeTemplate'
        this.$refs['formDialog'].eventType = 'distribute'
        this.$refs['formDialog'].dialogVisible = true
        this.$refs['formDialog'].selectedAllData = this.selectedAllData
      }else{
        this.$message({
          type:'warning',
          message:'请勾选分配人员!'
        })
      }
    },
    handleDistributeSingle(index) {
      // let that = this
      // let single = []
      // const a = this.quitUserRelationExUserList[index]
      // single.push(a)
      // console.log(single,'s')
      // this.handleSelectionChange(single)
      // if (this.selectedAllData.length>0) {
      //     this.selectedAllData.forEach(row => {
      //       this.$refs.multipleTable.toggleRowSelection(row);
      //     });
      //   } else {
      //     this.$refs.multipleTable.clearSelection();
      //   }
      this.$refs['formDialog'].event = 'DistributeTemplate'
      this.$refs['formDialog'].eventType = 'distribute'
      this.$refs['formDialog'].dialogVisible = true
      this.$store.commit('externalUser/SAVE_QUITUSERCURRENTROW',this.quitUserRelationExUserList[index])
    },
    changePage(key) {
      this.query.page = key - 1
      this.pageConfig.pageNumber = key - 1
      this.initDataList(this.query)
    },
    handleSelectionChange(val) {
      this.selectedAllData = val
      console.log(val, "selected");
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
