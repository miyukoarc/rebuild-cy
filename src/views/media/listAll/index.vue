<template>
  <div class="app-container">
    <!-- <el-card class="content-spacing">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>-->

    <el-row>
      <el-col :span="5">
        <el-card class="content-spacing" style="min-height:84vh;margin-right:20px;">
          <el-form label-position="left" label-width="60px">
            <el-form-item label="搜索：">
              <el-input v-model="groupName" @keypress.enter="handleSearchGroup">
                <el-button slot="append" icon="el-icon-search" @click="handleSearchGroup"></el-button>
              </el-input>
            </el-form-item>
          </el-form>
          <div class="text-align-center" style="margin-bottom:20px;">
            <el-t-button
              type="text"
              :popAuth="true"
              :auth="permissionMap['mediaGroup']['mediaGroup_add']"
              size="mini"
              @click.stop="handleCreateGroup"
            >
              <i class="el-icon-plus"></i>添加分组
            </el-t-button>
          </div>
          <el-table
            v-loading="loading"
            :data="groupListAll"
            ref="mediaGroupTable"
            style="width: 100%"
            @row-click="handleRowClick"
            lazy
            highlight-current-row
            :show-header="false"
            header-row-class-name="el-table-header"
          >
            <!-- <el-table-column type="selection"></el-table-column> -->
            <el-table-column prop="groupName"></el-table-column>
            <el-table-column align="right">
              <template v-slot="scope">
                <div>
                  <el-t-button
                    type="text"
                    size="mini"
                    :popAuth="true"
                    :auth="permissionMap['mediaGroup']['mediaGroup_rename']"
                    @click.stop="handleEditGroup(scope.$index)"
                  >修改</el-t-button>
                  <el-t-button
                    type="text"
                    size="mini"
                    :popAuth="true"
                    :auth="permissionMap['mediaGroup']['mediaGroup_delete']"
                    @click.stop="handleDeleteGroup(scope.$index)"
                  >删除</el-t-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="19">
        <el-card class="content-spacing" style="min-height:84vh;">
          <list-header @handleSearch="handleSearch"></list-header>

          <el-divider></el-divider>
          <el-tabs v-model="activeName">
            <el-tab-pane lazy label="全部" name="zero">
              <all-board
                ref="allBoard"
                @handleDelete="handleDelete"
                @handleTransfer="(payload)=>handleTransfer('allBoard',payload)"
              ></all-board>
            </el-tab-pane>
            <el-tab-pane lazy label="文本" name="first">
              <text-board
                ref="textBoard"
                @handleCreateText="handleCreateText"
                @handleDelete="handleDelete"
                @handleTransfer="(payload)=>handleTransfer('textBoard',payload)"
              ></text-board>
            </el-tab-pane>
            <el-tab-pane lazy label="图片" name="second">
              <image-board
                ref="imageBoard"
                @handleDelete="handleDelete"
                @handleCreateImage="handleCreateImage"
                @handleTransfer="(payload)=>handleTransfer('imageBoard',payload)"
              ></image-board>
            </el-tab-pane>
            <el-tab-pane lazy label="视频" name="third">
              <video-board
                ref="videoBoard"
                @handleDelete="handleDelete"
                @handleCreateVideo="handleCreateVideo"
                @handleTransfer="(payload)=>handleTransfer('videoBoard',payload)"
              ></video-board>
            </el-tab-pane>
            <el-tab-pane lazy label="文章" name="fourth">
              <article-board
                ref="articleBoard"
                @handleEditArticle="handleEditArticle"
                @handleCreateArticle="handleCreateArticle"
                @handleDelete="handleDelete"
                @handleTransfer="(payload)=>handleTransfer('articleBoard',payload)"
              ></article-board>
            </el-tab-pane>
            <el-tab-pane lazy label="文件" name="fifth">
              <file-board
                ref="fileBoard"
                @handleDelete="handleDelete"
                @handleCreateFile="handleCreateFile"
                @handleTransfer="(payload)=>handleTransfer('videoBoard',payload)"
              ></file-board>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

    <form-dialog ref="formDialog"></form-dialog>
  </div>
</template>

<script>
import FormDialog from './dialog'
import ListHeader from './header'
import TextBoard from './components/text-board'
import ImageBoard from './components/image-board'
import VideoBoard from './components/video-board'
import ArticleBoard from './components/article-board'
import FileBoard from './components/file-board'
import AllBoard from './components/all-board'
import { mapState } from 'vuex'
export default {
  name: 'MediaListAll',
  components: {
    ListHeader,
    FormDialog,
    TextBoard,
    ImageBoard,
    VideoBoard,
    ArticleBoard,
    FileBoard,
    AllBoard,
  },
  data() {
    return {
      query: {
        startTime: '',
        endTime: '',
        fileName: '',
        groupUuid: '',
      },
      groupName: '',
      activeName: 'zero',
      currentGroup: {},
      uploadImage: {
        groupUuid: '',
        type: 'IMAGE',
      },
      uploadVideo: {
        groupUuid: '',
        type: 'VIDEO',
      },
      uploadFile: {
        groupUuid: '',
        type: 'FILE',
      },
      imageTypes: ['image/jpeg', 'image/gif', 'image/png'],
      timer: null,
    }
  },
  watch: {
    groupListAll: {
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          this.$refs['mediaGroupTable'].setCurrentRow(this.groupListAll[0])
          const groupUuid = this.groupListAll[0]?.uuid
          const payload = { groupUuid }
          this.initMediaList(payload)
          this.currentGroup = this.groupListAll[0]
          //   this.query.groupUuid = this.groupListAll[0].uuid//初始化
        })
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      groupListAll: (state) => state.media.mediaGroupListAll,
      loading: (state) => state.media.loading,

      permissionMap: (state) => state.permission.permissionMap,
    }),
  },
  created() {
    this.initDataList()
  },
  mounted() {
    this.$bus.$on('handleRefresh', () => {
      this.handleRefresh(this.query)
    })

    this.$once('hook:beforeDestroy', () => {
      this.$bus.$off('handleRefresh')
    })
  },
  methods: {
    handleSearchGroup() {
      const groupName = this.groupName
      this.initDataList({ groupName })
    },
    handleSearch(val) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.query.groupUuid = this.currentGroup?.uuid
        const groupUuid = this.currentGroup?.uuid
        this.initMediaList({ ...val, groupUuid })
        this.activeName = 'zero'
      }, 1000)
    },
    initDataList(payload) {
      this.$store
        .dispatch('media/getMediaGroupListAll', payload)
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: 'error',
            message: '初始化失败' || err,
          })
        })
    },
    initMediaList(payload) {
      this.$store
        .dispatch('media/getMediaListAll', payload)
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: 'error',
            message: '初始化失败' || err,
          })
        })
    },
    handleEditGroup(index) {
      const payload = this.groupListAll[index]
      this.$refs['formDialog'].dialogVisible = true
      this.$refs['formDialog'].event = 'EditGroupTemplate'
      this.$refs['formDialog'].eventType = 'editGroup'
      this.$refs['formDialog'].transfer = payload
    },
    handleCreateGroup() {
      this.$refs['formDialog'].dialogVisible = true
      this.$refs['formDialog'].event = 'CreateGroupTemplate'
      this.$refs['formDialog'].eventType = 'createGroup'
    },
    handleCreateVideo() {
      this.$refs['formDialog'].dialogVisible = true
      this.$refs['formDialog'].event = 'CreateVideoTemplate'
      this.$refs['formDialog'].eventType = 'createVideo'
      this.$refs['formDialog'].transfer = this.currentGroup
    },
    handleCreateFile() {
      this.$refs['formDialog'].dialogVisible = true
      this.$refs['formDialog'].event = 'CreateFileTemplate'
      this.$refs['formDialog'].eventType = 'createFile'
      this.$refs['formDialog'].transfer = this.currentGroup
    },
    handleDeleteGroup(index) {
      const { uuid } = this.groupListAll[index]
      const payload = { uuid }
      this.$confirm('是否删除当前分组', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await this.$store
            .dispatch('media/deleteMediaGroup', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功',
              })
              this.initDataList()
            })
            .catch((err) => {
              this.$message({
                type: 'error',
                message: err,
                duration: 3000
              })
              
            })
        })
        .catch((err) => {})
    },
    handleRowClick(val) {
      console.log(val)
      this.currentGroup = val
      this.query.groupUuid = val.uuid
      const payload = { groupUuid: val.uuid }
      this.initMediaList(payload)
    },
    handleCreateText() {
      this.$refs['formDialog'].dialogVisible = true
      this.$refs['formDialog'].event = 'CreateTextTemplate'
      this.$refs['formDialog'].eventType = 'createText'
      this.$refs['formDialog'].transfer = this.currentGroup
    },
    handleEditText(val) {
      console.log(val)
      const { uuid } = val
      const payload = { uuid }
      this.$refs['formDialog'].dialogVisible = true
      this.$refs['formDialog'].event = 'EditTextTemplate'
      this.$refs['formDialog'].eventType = 'editText'
    },
    handleCreateImage() {
      this.$refs['formDialog'].dialogVisible = true
      this.$refs['formDialog'].event = 'CreateImageTemplate'
      this.$refs['formDialog'].eventType = 'createImage'
      this.$refs['formDialog'].transfer = this.currentGroup
    },
    handleTransfer(target, payload) {
      this.$store
        .dispatch('media/moveMedieToGroup', payload)
        .then(() => {
          this.$message({
            type: 'success',
            message: '操作成功',
          })
          this.initMediaList(this.query)
          this.$refs[target].closeDialog()
          //   Object.assign(this.$data, this.$options.data())
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err || '操作失败',
          })
        })
    },
    handleDelete(val) {
      const payload = { mediaUuids: val }
      this.$confirm('是否删除当前素材', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await this.$store
            .dispatch('media/batchDeleteMedia', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功',
              })
              this.handleRefresh()
              //   Object.assign(this.$data, this.$options.data())
            })
            .catch((err) => {
              this.$message({
                type: 'error',
                message: err,
              })
            })
        })
        .catch((err) => {})
    },
    handleCreateArticle(val) {
      this.$router.push({
        path: '/media/article/detail/0',
      })
    },
    handleEditArticle(val) {
      val
      this.$router.push({
        path: '/media/article/detail/' + val,
      })
    },
    handleRefresh() {
      const groupUuid = this.currentGroup.uuid
      this.query.groupUuid = groupUuid
      this.initMediaList({ ...this.query, groupUuid })
    },
  },
}
</script>

<style lang="scss" scoped>
.operater-container {
  margin-bottom: 15px;
}
</style>