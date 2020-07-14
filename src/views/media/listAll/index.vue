<template>
  <div class="app-container">
    <!-- <el-card class="content-spacing">
      <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>
    </el-card>-->

    <el-row>
      <el-col :span="5">
        <el-card class="content-spacing" style="min-height:84vh;margin-right:20px;">
          <el-form label-position="left" label-width="100px">
            <el-form-item label="搜索：">
              <el-input v-model="search" @change="handleSearch"></el-input>
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
          <list-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></list-header>

          <el-divider></el-divider>
          <el-tabs v-model="activeName">
            <el-tab-pane lazy label="全部" name="zero">
              <!-- <div class="operater-container">
                <el-t-button type="primary" size="mini">占位按钮</el-t-button>
              </div> -->
              <all-board></all-board>
            </el-tab-pane>
            <el-tab-pane lazy label="文本" name="first">
              <!-- <div class="operater-container">
                <el-t-button
                  type="primary"
                  size="mini"
                  :popAuth="true"
                  :auth="permissionMap['media']['media_add']"
                  @click="handleCreateText"
                >新建文本</el-t-button>
              </div> -->
              <text-board @handleCreateText="handleCreateText" @handleEditText="handleEditText" @handleDeleteText="handleDeleteText"></text-board>
            </el-tab-pane>
            <el-tab-pane lazy label="图片" name="second">
              <div class="operater-container">
                <el-upload
                  action="/upload"
                  :show-file-list="true"
                  :before-upload="beforeImageUpload"
                  :on-success="onSuccess"
                  :headers="{
                      ContentType: 'multipart/form-data'
                  }"
                  :on-error="onError"
                  :data="uploadImage"
                >
                  <el-t-button
                    type="primary"
                    size="mini"
                    :popAuth="true"
                    :auth="permissionMap['media']['media_add']"
                  >上传素材</el-t-button>
                  <div slot="tip" class="el-upload__tip">图片支持png、jpg、jpeg，大小不超过2M。</div>
                </el-upload>
              </div>
              <image-board @handleCreateImage="handleCreateImage"></image-board>
            </el-tab-pane>
            <el-tab-pane lazy label="视频" name="third">
              <div class="operater-container">
                <el-upload
                  action="/media/add"
                  :show-file-list="false"
                  :before-upload="beforeVideoUpload"
                  :on-success="onSuccess"
                  :headers="{
                      ContentType: 'multipart/form-data'
                  }"
                  :on-error="onError"
                  :data="uploadVideo"
                >
                  <el-t-button
                    type="primary"
                    size="mini"
                    :popAuth="true"
                    :auth="permissionMap['media']['media_add']"
                  >上传素材</el-t-button>
                  <div slot="tip" class="el-upload__tip">视频支持MP4格式，大小不超过10M。</div>
                </el-upload>
              </div>
              <video-board></video-board>
            </el-tab-pane>
            <el-tab-pane lazy label="文章" name="fourth">
              <!-- <div class="operater-container">
                <el-t-button
                  type="primary"
                  size="mini"
                  :popAuth="true"
                  :auth="permissionMap['media']['media_add']"
                  @click="handleCreateArticle"
                >新建文章</el-t-button>
              </div> -->
              <article-board
                @handleEditArticle="handleEditArticle"
                @handleDeleteArticle="handleDeleteArticle"
              ></article-board>
            </el-tab-pane>
            <el-tab-pane lazy label="文件" name="fifth">
              <div class="operater-container">
                <el-upload
                  action="/media/add"
                  :show-file-list="false"
                  :before-upload="beforeFileUpload"
                  :on-success="onSuccess"
                  :headers="{
                      ContentType: 'multipart/form-data'
                  }"
                  :on-error="onError"
                  :data="uploadFile"
                >
                  <el-t-button
                    type="primary"
                    size="mini"
                    :popAuth="true"
                    :auth="permissionMap['media']['media_add']"
                  >上传素材</el-t-button>
                </el-upload>
              </div>
              <file-board></file-board>
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
  components: {
    ListHeader,
    FormDialog,
    TextBoard,
    ImageBoard,
    VideoBoard,
    ArticleBoard,
    FileBoard,
    AllBoard
  },
  data() {
    return {
      search: '',
      activeName: 'first',
      currentGroup: {},
      uploadImage: {
        groupUuid: '',
        type: 'IMAGE'
      },
      uploadVideo: {
        groupUuid: '',
        type: 'VIDEO'
      },
      uploadFile: {
        groupUuid: '',
        type: 'FILE'
      },
      imageTypes: ['image/jpeg', 'image/gif', 'image/png'],
      timer: null
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
        })
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      groupListAll: state => state.media.mediaGroupListAll,
      loading: state => state.media.loading,

      permissionMap: state => state.permission.permissionMap
    })
  },
  created() {
    this.initDataList()
  },
  mounted() {},
  methods: {
    handleSearch() {
        console.log('sousuo')
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
          const groupName = this.search
          const payload = {groupName}
        this.initDataList(payload)
        // this.$emit("handleSearch", this.query);
      }, 1000)
    },
    initDataList(payload) {
      this.$store
        .dispatch('media/getMediaGroupListAll', payload)
        .then(() => {})
        .catch(err => {
          this.$message({
            type: 'error',
            message: '初始化失败' || err
          })
        })
    },
    initMediaList(payload) {
      this.$store
        .dispatch('media/getMediaListAll', payload)
        .then(() => {})
        .catch(err => {
          this.$message({
            type: 'error',
            message: '初始化失败' || err
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
    handleDeleteGroup(index) {
      const { uuid } = this.groupListAll[index]
      const payload = { uuid }
      this.$confirm('是否删除当前分组', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$store
            .dispatch('media/deleteMediaGroup', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.initDataList()
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: err
              })
            })
        })
        .catch(err => {})
    },
    handleRowClick(val) {
      console.log(val)
      this.currentGroup = val
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
    handleCreateImage(){
        this.$refs['formDialog'].dialogVisible = true
      this.$refs['formDialog'].event = 'CreateImageTemplate'
      this.$refs['formDialog'].eventType = 'createImage'
      this.$refs['formDialog'].transfer = this.currentGroup
    },
    handleDeleteText(val) {
      console.log(val)
      const { uuid } = val
      const payload = { uuid }
      this.$confirm('是否删除当前文本', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$store
            .dispatch('media/deleteMedia', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.initDataList()
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: err
              })
            })
        })
        .catch(err => {})
    },
    beforeImageUpload(file) {
      const type = file.type
      const size = file.size
      if (size > 1024 * 1024 * 2) {
        this.$message({
          type: 'error',
          message: '文件大小超出限制'
        })
        return false
      }
      if (
        !this.imageTypes.some(item => {
          return item === type
        })
      ) {
        this.$message({
          type: 'error',
          message: '文件类型不支持'
        })
        return false
      }

      this.uploadImage.groupUuid = this.currentGroup.uuid

      return true
    },
    beforeFileUpload(file) {
      const type = file.type
      const size = file.size
      if (size > 1024 * 1024 * 10) {
        this.$message({
          type: 'error',
          message: '文件大小超出限制'
        })
        return false
      }
      //   if (
      //     !this.imageTypes.some(item => {
      //       return item === type
      //     })
      //   ) {
      //     this.$message({
      //       type: 'error',
      //       message: '文件类型不支持'
      //     })
      //     return false
      //   }

      this.uploadFile.groupUuid = this.currentGroup.uuid

      return true
    },
    beforeVideoUpload() {
      const type = file.type
      const size = file.size
      if (size > 1024 * 1024 * 10) {
        this.$message({
          type: 'error',
          message: '文件大小超出限制'
        })
        return false
      }
      if (type !== 'video/mp4') {
        this.$message({
          type: 'error',
          message: '文件类型不支持'
        })
        return false
      }

      this.uploadVideo.groupUuid = this.currentGroup.uuid

      return true
    },
    onSuccess(file) {
      console.log(file)
    },
    onError() {
      this.$message({
        type: 'error',
        message: '上传失败'
      })
    },
    handleCreateArticle(val) {
      this.$router.push({
        path: '/media/article/detail/0'
      })
    },
    handleEditArticle(val) {
      const uuid = val.uuid
      this.$router.push({
        path: '/media/article/detail/' + uuid
      })
    },
    handleDeleteArticle(val) {
      //   console.log(val)
      // alert('删除')
      const payload = {
        uuid: val.uuid
      }

      this.$confirm('是否删除当前动态', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$store
            .dispatch('media/deleteMedia', payload)
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
    },
    // handleSearch(val) {
    //   console.log(val)
    //   const groupUuid = this.currentGroup.uuid
    //   const fileName = val.fileName
    //   this.initMediaList({ groupUuid, fileName })
    // },
    handleRefresh(val) {
      const groupUuid = this.currentGroup.uuid
      this.initMediaList({ groupUuid })
    }
  }
}
</script>

<style lang="scss" scoped>
.operater-container {
  margin-bottom: 15px;
}
</style>