<template>
  <div>
    <el-form :model="form" ref="form" label-width="100px" label-position="left">
      <h3>添加素材</h3>
      <el-form-item label="内容">
        <el-upload
          action="/upload"
          :show-file-list="true"
          :file-list="fileList"
          :before-upload="beforeImageUpload"
          :on-success="onSuccess"
          :headers="{
                ContentType: 'multipart/form-data'
            }"
          :on-error="onError"
        >
          <el-t-button
            type="primary"
            size="mini"
            :popAuth="true"
            :auth="permissionMap['media']['media_add']"
          >上传素材</el-t-button>
          <div slot="tip" class="el-upload__tip">图片支持png、jpg、jpeg，大小不超过2M。</div>
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
      <el-form-item label>
        <el-t-button size="mini" @click="handleAddContent">
          <i class="el-icon-plus"></i>
          添加内容
        </el-t-button>
      </el-form-item>

      <el-divider></el-divider>
      <h3>素材配置</h3>

      <el-form-item label="符合标签">
        <div>
          <el-radio v-model="matchFormat" label="CONTAINS_ANY">包含其一</el-radio>
          <el-radio v-model="matchFormat" label="PERFECT_MATCH ">完全匹配</el-radio>
        </div>
      </el-form-item>
      <tag-select v-model="tagSelects" :options="tagListSelect"></tag-select>

      <el-form-item label="引用条例">
        <!-- <div>
          <el-radio v-model="matchFormat" label="CONTAINS_ANY">包含其一</el-radio>
          <el-radio v-model="matchFormat" label="PERFECT_MATCH ">完全匹配</el-radio>
        </div>-->
        <!-- <el-select v-model="select"> -->

        <!-- </el-select> -->
      </el-form-item>

      <div class="text-align-center">
        <el-button size="small" @click="handleCancel">取消</el-button>
        <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TagSelect from '@/components/TagSelect'
export default {
  components: {
    TagSelect
  },
  props: {
    transfer: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      fileList: [],
      tagSelects: [],
      content: [''],
      form: {},
      type: 'IMAGE',
      groupUuid: '',
      matchFormat: 'CONTAINS_ANY'
    }
  },
  watch: {
    transfer: {
      handler(newVal, oldVal) {
        //   console.log()
        const { uuid } = newVal
        this.groupUuid = uuid
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      tagListSelect: state => state.tag.tagListSelect
    })
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
        .catch(err => {
          this.$message({
            type: 'error',
            message: err || '初始化失败'
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
      //   const payload = this.form
      const content = this.content[0]
      const groupUuid = this.groupUuid
      const type = this.type
      const tagUuids = this.tagSelects.reduce((sum, curr) => {
        return sum.concat(curr)
      }, [])
      const matchFormat = this.matchFormat
      const data = { tagUuids, matchFormat }
      const params = { groupUuid, type, content }

      this.$refs['form'].validate(valid => {
        if (valid) {
          //   console.log(payload)
          this.$store
            .dispatch('media/addMediaIsAudit', { data, params })
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.handleCancel()
              this.refresh()
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            })
        } else {
          this.$message({
            type: 'error',
            message: '请检查输入'
          })
        }
      })
    },
    handleCancel() {
      this.$parent.$parent.dialogVisible = false
    },
    refresh() {
      this.$store
        .dispatch('media/getMediaGroupListAll')
        .then(() => {
          //   this.reload();
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
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
    onSuccess(file) {
      console.log(file)
    },
    onError() {
      this.$message({
        type: 'error',
        message: '上传失败'
      })
    }
  }
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
