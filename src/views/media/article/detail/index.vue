<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-form>
          <el-form-item label="封面图">
            <el-upload
              class="avatar-uploader"
              action="/api/upload"
              :show-file-list="false"
              :on-success="onSuccess"
              :before-upload="beforeUpload"
            >
              <el-image
                fit="contain"
                v-if="form.imgId"
                :src="`/api/public/file/${form.imgId}`"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item
            label="选择分类"
            :rules="[
              { required: true, message: '*分类不能为空', trigger: ['blur','change'] },
            ]"
          >
            <el-select v-model="groupUuid" placeholder="请选择活动区域">
              <el-option
                v-for="item in mediaGroupListAll"
                :key="item.uuid"
                :label="item.groupName"
                :value="item.uuid"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="符合标签">
            <div>
              <el-radio v-model="form.matchFormat" label="CONTAINS_ANY">包含其一</el-radio>
              <el-radio v-model="form.matchFormat" label="PERFECT_MATCH">完全匹配</el-radio>
            </div>
            <div class="select-zoom">
              <tag-multi-select v-model="form.tagUuids"></tag-multi-select>
            </div>
          </el-form-item>

          <el-form-item style="margin-bottom:24px;">
            <MDinput v-model="form.title" :maxlength="20" name="name">文章标题</MDinput>
            <MDinput v-model="form.description" :maxlength="100" name="name">文章描述</MDinput>
          </el-form-item>
        </el-form>
      </div>
      <div class="fix">
        <el-t-button
          size="small"
          :popAuth="true"
          v-permission="'media,media_article/update'"
          :auth="'media,media_article/update'"
          type="primary"
          @click="handleConfirm"
          :throat="5000"
        >保存文章</el-t-button>
      </div>
      <div>
        <Tinymce ref="editor" v-model="form.content" :height="400" />
      </div>
    </el-card>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import TagSelect from '@/components/TagSelect'
import TagMultiSelect from '@/components/TagMultiSelect'
import defaultCover from '@/assets/2.jpg'
import { mapState } from 'vuex'
export default {
  name: 'media_article_detail',
  components: {
    Tinymce,
    MDinput,
    TagSelect,
    TagMultiSelect,
  },
  data() {
    return {
      mode: 'CREATE', //CREATE/UPDATE
      coverUrl: null,
      form: {
        title: '',
        description: '',
        content: '',
        imgId: '',
        matchFormat: 'CONTAINS_ANY',
        tagUuids: [],
      },
      tagSelects: [],
      groupUuid: '',
      flag: false,
      type: 'ARTICLE',
    }
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        const uuid = newVal.params.uuid
        if (-uuid) {
          this.mode = 'UPDATE'
          this.$set(this.form, 'uuid', uuid)
          this.initDetail(uuid)
        } else {
          console.log('create')
          Object.assign(this.$data, this.$options.data())
          this.mode = 'CREATE'
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      articleDetail: (state) => state.media.articleDetail,
      mediaGroupListAll: (state) => state.media.mediaGroupListAll,
      permissionMap: (state) => state.permission.permissionMap,
      auditSetting: (state) => state.sensitive.auditSetting,
      //   tagListSelect: state => state.tag.tagListSelect
    }),
    defaultCover() {
      return defaultCover()
    },
  },
  created() {
    this.initFilter()
  },
  mounted() {},
  methods: {
    initDetail(uuid) {
      this.$store
        .dispatch('media/getArticleDetail', uuid)
        .then((res) => {
          const {
            imgId,
            imgUrl,
            articleContent,
            description,
            title,
            matchFormat,
            toTags,
          } = res
          this.form.tagUuids = res.toTags.map((item) => {
            return item.uuid
          })
          const groupUuid = res?.mediaGroup?.uuid
          this.form.imgId = imgId
          this.coverUrl = imgUrl
          this.form.content = articleContent
          this.form.description = description
          this.form.title = title
          this.groupUuid = groupUuid
        })
        .catch((err) => {
          console.error(err)
          this.$message({
            type: 'error',
            message: '初始化失败',
          })
        })
    },
    initFilter() {
      this.$store
        .dispatch('media/getMediaGroupListAll')
        .then(() => {})
        .catch((err) => {
          console.error(err)
          this.$message({
            type: 'error',
            message: '初始化失败',
          })
        })

      //   this.$store
      //     .dispatch('tag/getListSelect')
      //     .then(() => {})
      //     .catch(err => {
      //       console.error(err)
      //       this.$message({
      //         type: 'error',
      //         message: err || '初始化失败'
      //       })
      //     })
    },
    beforeUpload() {},
    onSuccess(res, file) {
      this.form.imgId = res.id
      this.coverUrl = URL.createObjectURL(file.raw)
    },
    beforeup(file) {
      // 图片上传
      const types = ['image/jpeg', 'image/gif', 'image/png']
      const isimg = types.includes(file.type)
      const isLtSize = file.size / 1024 / 1024 < 5
      if (!isimg) {
        this.$message({
          message: '只能上传JPG,GIF,PNG格式的图片！',
          type: 'error',
        })
        return false
      }
      if (!isLtSize) {
        this.$message({
          message: '大小不能超过2M！',
          type: 'error',
        })
        return false
      }
      return true
    },
    handleConfirm() {
      if (this.mode === 'UPDATE') {
        const payload = this.form
        const groupUuid = this.groupUuid
        const uuid = this.$route.params.uuid
        const tagUuids = this.form.tagUuids

        if (this.auditSetting['media']) {
          this.handleUpdate({
            data: {
              ...payload,
              uuid,
              tagUuids,
              groupUuid,
              auditState: 'TO_BE_REVIEWED',
            },
          })
        } else {
          this.handleUpdate({ data: { ...payload, uuid, tagUuids, groupUuid } })
        }
      }
      if (this.mode === 'CREATE') {
        const payload = this.form
        const type = this.type
        const groupUuid = this.groupUuid
        const tagUuids = this.form.tagUuids.join(',')

        this.handleCreate({
          data: { ...payload, tagUuids },
          params: { type, groupUuid },
        })
      }
      this.flag = true
    },
    handleUpdate(payload) {
      const message = this.auditSetting['media'] ? '已提交审核' : '已完成'

      this.$store
        .dispatch('media/updataArticle', payload)
        .then(() => {
          this.$message({
            type: 'success',
            message: message,
            duration: 1000,
            onClose: () => {
              this.$router.go(-1)
              this.flag = false
            },
          })
        })
        .catch((err) => {
          console.error(err)
          this.$message({
            type: 'error',
            message: err,
          })
        })
    },
    handleCreate(payload) {
      this.$store
        .dispatch('media/addArticleIsAudit', payload)
        .then(() => {
          this.$message({
            type: 'success',
            message: '操作成功',
            duration: 1000,
            onClose: () => {
              this.$router.go(-1)
              this.flag = false
            },
          })
        })
        .catch((err) => {
          console.error(err)
          this.$message({
            type: 'error',
            message: err,
          })
        })
    },
  },
}
</script>

<style scoped>
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.avatar-uploader-icon:hover {
  border-color: #409eff;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.fix {
  position: fixed;
  top: 130px;
  right: 42px;
  z-index: 999999;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.select-zoom {
  padding: 15px;
}
</style>
