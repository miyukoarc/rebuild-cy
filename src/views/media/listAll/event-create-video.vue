<template>
  <div>
    <el-form :model="form" ref="form" label-width="100px" label-position="left">
      <h3>添加素材</h3>
      <el-form-item label="内容">
        <el-upload
          ref="upload"
          multiple
          action="/api/media/addMediaIsAudit"
          :show-file-list="true"
          :file-list="fileList"
          :before-upload="beforeVideoUpload"
          :on-success="onSuccess"
          :auto-upload="false"
          :on-error="onError"
          list-type="text"
          :data="data"
        >
          <el-t-button
            slot="trigger"
            size="small"
            type="primary"
            :popAuth="true"
            :auth="'media,media_addMediaIsAudit'"
            v-permission="'media,media_addMediaIsAudit'"
          >选取文件</el-t-button>
          <!-- <el-t-button
            size="small"
            type="success"
            :popAuth="true"
            :auth="permissionMap['media']['media_add']"
            @click="submitUpload"
          >上传到服务器</el-t-button>-->
          <div slot="tip" class="el-upload__tip">视频支持，大小不超过10M。</div>
        </el-upload>
        <!-- <div class="input-item">
          <el-input
            style="flex:1;"
            v-model.trim="content[index]"
            maxlength="4000"
            type="textarea"
            show-word-limit
          ></el-input>
          <el-t-button v-if="index!==0" class="close-btn" type="text" @click="handleDelete(index)">
            <i class="el-icon-close"></i>
          </el-t-button>
        </div>-->
      </el-form-item>
      <!-- <el-form-item label>
        <el-t-button size="mini" @click="handleAddContent">
          <i class="el-icon-plus"></i>
          添加内容
        </el-t-button>
      </el-form-item>-->

      <el-divider></el-divider>
      <h3>素材配置</h3>

      <el-form-item label="符合标签">
        <div>
          <el-radio v-model="data.matchFormat" label="CONTAINS_ANY">包含其一</el-radio>
          <el-radio v-model="data.matchFormat" label="PERFECT_MATCH">完全匹配</el-radio>
        </div>
      </el-form-item>
      <tag-multi-select v-model="tagSelects"></tag-multi-select>
      <!-- <tag-select v-model="tagSelects" :options="tagListSelect"></tag-select> -->

      <!-- <el-form-item label="引用条例"></el-form-item> -->

      <div class="text-align-center">
        <el-button size="small" @click="handleCancel">取消</el-button>
        <el-t-button type="primary" size="small" @click="handleConfirm">确定</el-t-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import TagSelect from '@/components/TagSelect'
import TagMultiSelect from '@/components/TagMultiSelect'
export default {
  components: {
    // TagSelect,
    TagMultiSelect
  },
  props: {
    transfer: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      imageTypes: ['image/jpeg', 'image/gif', 'image/png'],
      fileList: [],
      tagSelects: [],
      content: [''],
      form: {},
      data: {
        groupUuid: '',
        tagUuids: '',
        type: 'VIDEO',
        matchFormat: 'CONTAINS_ANY',
      },
      uploadFilesLength: 0,
    }
  },
  watch: {
    transfer: {
      handler(newVal, oldVal) {
        const { uuid } = newVal
        this.data.groupUuid = uuid
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      tagListSelect: (state) => state.tag.tagListSelect,
      permissionMap: (state) => state.permission.permissionMap,
      auditSetting: (state) => state.sensitive.auditSetting,
    }),
  },
  created() {
    this.initData()
  },
  mounted() {},
  methods: {
    initData() {
      this.$store
        .dispatch('tag/getListSelect')
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err || '初始化失败',
          })
        })
    },
    handleDelete(index) {
      this.content.splice(index, 1)
    },
    handleAddContent() {
      this.content.push('')
    },
    handleConfirm() {
      this.data.tagUuids = this.tagSelects
        .reduce((sum, curr) => {
          return sum.concat(curr)
        }, [])
        .join(',')

      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.submitUpload()
        } else {
          this.$message({
            type: 'error',
            message: '请检查输入',
          })
        }
      })
    },
    handleCancel() {
      this.$parent.$parent.dialogVisible = false
    },
    onSuccess(res, file, list) {
      this.uploadFilesLength++
      this.$message({
        type: 'warning',
        message: '操作完成',
      })
      if (this.uploadFilesLength === list.length) {
        this.$bus.$emit('handleMediaRefresh')
        const message = this.auditSetting['media'] ? '已提交审核' : '已完成'
        setTimeout(()=>{
            this.$message({
              type: 'success',
              message: message,
            })

        },2000)
        //   Object.assign(this.$data, this.$options.data())
        this.$parent.$parent.dialogVisible = false
      }
    },
    onError(err) {
      this.$message({
        type: 'error',
        message: err || '上传失败',
      })
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    beforeVideoUpload(file) {
      const type = file.type
      const size = file.size
      if (size > 1024 * 1024 * 10) {
        this.$message({
          type: 'error',
          message: '文件大小超出限制',
        })
        return false
      }
      if (type !== 'video/mp4') {
        this.$message({
          type: 'error',
          message: '文件类型不支持',
        })
        return false
      }

      return true
    },
  },
}
</script>

<style lang="scss" scoped>
.input-item {
  display: flex;
  .close-btn {
    margin-left: 10px;
  }
}
</style>
