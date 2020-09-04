<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>

    <el-card class="content-spacing">
      <tool-bar
        @handleImport="doImport"
        @handleExport="doExport"
        :msg="`共${pageConfig.total}个标签`"
        :hasExport="true"
        :hasImport="false"
        :hasRefresh="true"
        @handleRefresh="handleRequest"
      >
        <div slot="left">
          <el-upload
            action="/api/tag/uploadTagExcell"
            :show-file-list="false"
            :on-success="onSuccess"
            :before-upload="beforeUpload"
          >
            <el-button size="small" type="primary">导入Excel</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
        <div slot="right">
          <el-t-button
            v-permission="'tag,tag_addTagIsAudit'"
            @click.stop="handleCreate"
            :popAuth="true"
            :auth="'tag,tag_addTagIsAudit'"
            type="primary"
          >添加标签组</el-t-button>
        </div>
      </tool-bar>
    </el-card>

    <el-card class="content-spacing">
      <div>
        <el-table
          v-loading="loading"
          :data="list"
          style="width: 100%"
          row-key="uuid"
          ref="dragTable"
          lazy
          highlight-current-row
          header-row-class-name="el-table-header"
          :default-sort="sortConfig"
          @selection-change="handleSelection"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="标签组名" align="left" prop="groupName" width="200"></el-table-column>
          <el-table-column label="标签" align="left">
            <template v-slot="scope">
              <div v-if="Object.keys(scope.row.tags).length">
                <el-tag
                  v-for="item in scope.row.tags"
                  :key="item.uuid"
                  style="margin-right:5px;"
                >{{item.tagName}}</el-tag>
              </div>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="文章描述" align="left"></el-table-column> -->
          <el-table-column label="操作" align="center" width="80">
            <template slot-scope="scope">
              <span
                v-if="scope.row.auditStateForOperation==='UNDER_REVCIEW'"
                class="color-primary"
              >审核中</span>
              <el-t-button
                v-if="scope.row.auditStateForOperation!=='UNDER_REVCIEW'"
                v-permission="'tag,tag_updateTagIsAudit'"
                :popAuth="true"
                :auth="'tag,tag_updateTagIsAudit'"
                type="text"
                size="mini"
                @click.stop.native="handleEdit(scope.$index,scope.row)"
              >编辑</el-t-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <form-dialog ref="formDialog"></form-dialog>
  </div>
</template>

<script>
// import mHeadedr from "./header";
import ListHeader from './header.vue'
import FormDialog from './dialog'
import ToolBar from '@/components/ToolBar'
import { mapState, mapMutations, mapActions } from 'vuex'
import { downloadTagExcel, uploadTagExcell } from '@/api/excel'
import dayjs from 'dayjs'

import Sortable from 'sortablejs'

export default {
  name: 'tag_listAll',
  inject: ['reload'],
  components: {
    ListHeader,
    FormDialog,
    ToolBar,
  },
  name: 'TagListAll',
  data() {
    return {
      sortConfig: { prop: 'sort', order: 'ascending' },
      pageConfig: {
        total: 0,
        pageNumber: 0,
        pageSize: 1000,
      },

      query: {
        page: 0,
        size: 10,
        groupName: '',
        tagName: '',
      },
      sortable: null,
      list: [],
      oldList: [],
      newList: [],

      form: {
        tagSorts: [
          {
            sort: 0,
            tagGroupId: '',
          },
          {
            sort: 0,
            tagGroupId: '',
          },
        ],
      },

      selections: [],
    }
  },
  watch: {},
  computed: {
    ...mapState({
      loading: (state) => state.tag.loading,
      //   listAll: state => state.tag.tagListAll,
      page: (state) => state.tag.tagListPage,

      permissionMap: (state) => state.permission.permissionMap,
    }),
  },
  created() {
    this.initDataList(this.query)
    this.$bus.$on('handleRequest', () => {
      this.handleRequest()
    })
    this.$once('hook:beforeDestory', () => {
      this.$bus.$off('handleRequest')
    })
  },
  mounted() {
    this.setSort()
  },
  methods: {
    onSuccess(res, file, list) {
      if (res) {
        this.$message({
          type: 'success',
          message: '上传成功',
        })
        this.handleRequest()
      }
    },
    beforeUpload(file) {
      const type = file.type
      console.log(type)
      return true
    },
    doImport() {
      console.log('导入')
    },
    doExport(val) {
      if (this.selections.length) {
        const groupUuids = this.selections
        downloadTagExcel({ groupUuids })
          .then((res) => {
            // this.selections = []
            if (!res) {
              return
            }
            let url = window.URL.createObjectURL(new Blob([res]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.download =
              '导出标签 ' +
              dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss') +
              '.xls'
            document.body.appendChild(link)
            link.click()
            window.URL.revokeObjectURL(link.href)
          })
          .catch((err) => {
            this.$message({
              type: 'error',
              message: err,
            })
          })
      } else {
        this.$confirm('点击确定将导出所有数据')
          .then(() => {
            const groupUuids = this.list
              .map((item) => {
                return item.groupId
              })
              .join(',')
            downloadTagExcel({ groupUuids })
              .then((res) => {
                // console.log(res)
                this.selections = []

                if (!res) {
                  return
                }
                let url = window.URL.createObjectURL(new Blob([res]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.download =
                  '导出标签 ' +
                  dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss') +
                  '.xls'
                document.body.appendChild(link)
                link.click()
                window.URL.revokeObjectURL(link.href)
                console.log(url)
              })
              .catch((err) => {
                this.$message({
                  type: 'error',
                  message: err,
                })
              })
          })
          .catch((err) => {})
      }
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
        .dispatch('user/getAllUserList')
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
        .dispatch('tag/getTagList', payload)
        .then((res) => {
          //初始化分页
          this.list = JSON.parse(JSON.stringify(res))
          this.pageConfig.pageNumber = this.page.pageNumber + 1
          this.pageConfig.total = this.page.total
          this.oldList = this.list.map((v) => v.groupId)
          this.newList = this.oldList.slice()
          //   this.$nextTick(() => {
          // this.setSort()
          //   })
        })
        .catch((err) => {
          console.log(err)
          this.$message({
            type: 'error',
            message: err || '初始化失败',
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
      const { groupName, tagName } = val
      this.query.groupName = groupName ? groupName : this.query.groupName
      this.query.tagName = tagName ? tagName : this.query.tagName

      this.initDataList(this.query)
    },
    handleRefresh() {
      this.query = this.$options.data().query
      this.initDataList(this.query)
    },
    handleRequest() {
      this.initDataList(this.query)
    },
    handleEdit(index, row) {
      const payload = this.list[index]
      this.$store.commit('tag/SAVE_GROUP', payload)

      this.$refs['formDialog'].eventType = 'edit'
      this.$refs['formDialog'].event = 'EditTemplate'
      this.$refs['formDialog'].dialogVisible = true
    },
    changePage(key) {
      this.query.page = key - 1
      this.pageConfig.pageNumber = key - 1
      this.initDataList(this.query)
    },
    handleCreate() {
      this.$refs['formDialog'].eventType = 'create'
      this.$refs['formDialog'].event = 'CreateTemplate'
      this.$refs['formDialog'].dialogVisible = true
    },

    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        // setData: function(dataTransfer) {
        //   // to avoid Firefox bug
        //   // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        //   dataTransfer.setData('Text', '')
        // },
        onEnd: (evt) => {
          const { newIndex, oldIndex } = evt
          this.form.tagSorts[0].sort = this.list[newIndex].sort
          this.form.tagSorts[1].sort = this.list[oldIndex].sort
          this.form.tagSorts[1].tagGroupId = this.list[newIndex].groupId
          this.form.tagSorts[0].tagGroupId = this.list[oldIndex].groupId
          let temp = this.list[0].sort
          this.list[0].sort = this.list[1].sort
          this.list[1].sort = temp
          this.handleChangeSort()

          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.$nextTick(() => {
            this.list.splice(evt.newIndex, 0, targetRow)
          })

          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        },
      })
    },
    handleChangeSort() {
      this.$store
        .dispatch('tag/updateTagSort', this.form)
        .then(() => {
          this.initDataList()
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err,
          })
        })
    },

    //表格勾选
    handleSelection(val) {
      const uuids = val.map((item) => {
        return item.groupId
      })
      const groupUuids = uuids.join(',')
      console.log(groupUuids)

      this.selections = groupUuids

      //   downloadTagExcel({ groupUuids })
      //     .then((res) => {})
      //     .catch((err) => {
      //       console.error(err)
      //     })
    },
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
</style>

<style>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>
