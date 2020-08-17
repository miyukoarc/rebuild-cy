<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <tool-bar :hasExport="true" :hasImport="false" @handleExport="doExport">
        <div slot="left">
          <span class="font-l">{{corpInfo.name}}</span>
          <el-t-button
            :popAuth="true"
            v-permission="'role,role_add'"
            :auth="'role,role_add'"
            size="small"
            type="text"
          >切换企业</el-t-button>
        </div>
      </tool-bar>
    </el-card>
    <el-card class="content-spacing">
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
        <el-table-column prop="moduleName" label="审核类型" align="left"></el-table-column>
        <el-table-column label="审批角色" align="left">
          <template v-slot="{row}">
            <div>
              <span v-if="row.auditUsers.length===0">--</span>
              <auditor-drawer v-else :levels="row.auditUsers"></auditor-drawer>
              <!-- <async-user-drawer v-else :hasPop="true" :users="row.auditUsers[0].userList"></async-user-drawer> -->
            </div>
          </template>
        </el-table-column>

        <el-table-column label="开启状态" align="left">
          <template v-slot="{row}">
            <div>
              <span class="font-exs color-success" v-if="row.openState">开启</span>
              <span class="font-exs color-danger" v-else>关闭</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left">
          <template v-slot="{row,$index}">
            <el-t-button
              type="text"
              size="mini"
              :popAuth="true"
              v-permission="'role,role_update'"
              :auth="'role,role_update'"
              @click.stop.native="handleDetail(row)"
            >详情</el-t-button>

            <el-t-button
              type="text"
              size="mini"
              :popAuth="true"
              v-permission="'role,role_update'"
              :auth="'role,role_update'"
              @click.stop.native="handleSetting(row)"
            >设置流程</el-t-button>

            <el-t-button
              type="text"
              size="mini"
              :popAuth="true"
              v-permission="'role,role_delete'"
              :auth="'role,role_delete'"
              @click.stop.native="handleChange($index)"
            >
              <span v-if="row.openState" class="color-danger">关闭</span>
              <span v-else class="color-success">开启</span>
            </el-t-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <form-dialog ref="formDialog"></form-dialog>
  </div>
</template>

<script>
import FormDialog from './dialog'
import ToolBar from './tool-bar'
import AuditUser from './components/audit-user'
import AuditorDrawer from './components/auditor-drawer'
import AsyncUserTag from '@/components/AsyncUserTag'
import AsyncUserDrawer from '@/components/AsyncUserDrawer'
import TagsDrawer from '@/components/TagsDrawer'
import RoleDrawer from '@/components/RoleDrawer'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'riskManagement_auditPropertylistAll',
  components: {
    FormDialog,
    ToolBar,
    AsyncUserTag,
    AsyncUserDrawer,
    AuditorDrawer,
    RoleDrawer,
    TagsDrawer,
    AuditUser,
    // mHeadedr
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
        // startTime: '',
        // endTime: '',
        // word: ''
      },

      form: {},

      rowSelects: [],
    }
  },
  watch: {},
  computed: {
    ...mapState({
      //   tagListAll: state => state.tag.tagListAll,

      loading: (state) => state.sensitive.loading,
      listAll: (state) => state.sensitive.propertyListAll,
      page: (state) => state.sensitive.propertyPage,
      corpInfo: (state) => state.auth.corpInfo,
      permissionMap: (state) => state.permission.permissionMap,
    }),
  },
  created() {
    this.initDataList(this.query)
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
    doExport() {},
    /**
     * 初始化表格信息
     */
    initDataList(payload) {
      this.$store
        .dispatch('sensitive/auditPropertylistAll', payload)
        .then(() => {
          //初始化分页
          this.listAll.forEach((item) => {
            this.$set(this.form, item.moduleName, item.openState)
          })
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
    handleChange(index) {
      // console.log(index)
      let { openState, moduleName, uuid, auditUsers } = this.listAll[index]
      this.$confirm(
        `是否${openState ? '关闭' : '开启'}${moduleName}审核？`,
        'Warning',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(async () => {
          //是否未设置审批人
          const emptyFlag = !!auditUsers.length

          //   console.log(emptyFlag,val.auditUsers)

          if (emptyFlag) {
            const payload = {
              openState: !openState,
              uuid,
            }
            this.$store
              .dispatch('sensitive/setAuditCloseOrOpen', payload)
              .then(() => {
                this.initDataList()
              })
              .catch((err) => {
                this.$message({
                  type: 'error',
                  message: err,
                })
              })
          } else {
            this.$confirm('请先设置审批流程', '设置审批流程', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            })
              .then(async () => {})
              .catch((err) => {
                console.error(err)
              })
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    handleSetting(val) {
      const uuid = val.uuid
      this.$refs['formDialog'].event = 'SettingTemplate'
      this.$refs['formDialog'].eventType = 'setting'
      this.$refs['formDialog'].dialogVisible = true
      this.$refs['formDialog'].transfer = { uuid }
    },
    handleDetail(val) {
      const uuid = val.uuid

      this.$refs['formDialog'].event = 'DetailTemplate'
      this.$refs['formDialog'].eventType = 'detail'
      this.$refs['formDialog'].dialogVisible = true
      this.$refs['formDialog'].transfer = { uuid }
    },
    //parseJSON
    parse(str) {
      return JSON.parse(str)[0]?.userList || []
    },
  },
}
</script>

<style lang="scss" scoped>
.switch-container {
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
</style>