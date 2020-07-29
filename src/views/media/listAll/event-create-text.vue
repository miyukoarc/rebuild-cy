<template>
  <div>
    <el-form :model="form" ref="form" label-width="100px" label-position="left">
      <h3>添加素材</h3>
      <el-form-item label="内容" v-for="(item,index) in content" :key="index">
        <div class="input-item">
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
        </div>
      </el-form-item>

      <el-divider></el-divider>
      <h3>素材配置</h3>

      <el-form-item label="符合标签">
        <div>
          <el-radio v-model="matchFormat" label="CONTAINS_ANY">包含其一</el-radio>
          <el-radio v-model="matchFormat" label="PERFECT_MATCH">完全匹配</el-radio>
        </div>
      </el-form-item>
      <tag-select v-model="tagSelects" :options="tagListSelect"></tag-select>

      <el-form-item label="引用条例">
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
      tagSelects: [],
      content: [''],
      form: {},
      type: 'TEXT',
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
      const tagUuids = this.tagSelects.reduce((sum,curr)=>{
          return sum.concat(curr)
      },[]).join(',')
      const matchFormat = this.matchFormat
      const data = { tagUuids, matchFormat }
      const params = { groupUuid, type, content,...data }

      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('media/addMediaIsAudit', {  params })
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
