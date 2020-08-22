<template>
  <div>
    <el-form :model="form" ref="form" label-width="100px" label-position="left">
      <h3>添加素材</h3>
      <el-form-item
        label="内容"
        v-for="(item,index) in form.content"
        :key="index"
        :prop="`content[${index}].value`"
        :rules="rules.content"
      >
        <div class="input-item" :style="{marginRight:(index==0?'24px':'0')}">
          <el-input
            style="flex:1;"
            v-model.trim="item.value"
            maxlength="4000"
            type="textarea"
            show-word-limit
          ></el-input>
          <el-button v-if="index!==0" class="close-btn" type="text" @click="handleDelete(index)">
            <i class="el-icon-close"></i>
          </el-button>
        </div>
      </el-form-item>

      <el-button type="text" @click="handleAddContent">
        <i class="el-icon-circle-plus"></i>添加
      </el-button>

      <el-divider></el-divider>
      <h3>素材配置</h3>

      <el-form-item label="符合标签">
        <div>
          <el-radio v-model="matchFormat" label="CONTAINS_ANY">包含其一</el-radio>
          <el-radio v-model="matchFormat" label="PERFECT_MATCH">完全匹配</el-radio>
        </div>
      </el-form-item>

      <tag-multi-select v-model="tagSelects"></tag-multi-select>

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
import TagSelect from '@/components/TagSelect'
import TagMultiSelect from '@/components/TagMultiSelect'
import { queue } from '@/utils/common'
export default {
  components: {
    TagSelect,
    TagMultiSelect,
  },
  props: {
    transfer: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tagSelects: [],
      content: [''],
      form: {
        content: [{ value: '' }],
      },
      type: 'TEXT',
      groupUuid: '',
      rules: {
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          {
            min: 1,
            max: 4000,
            message: '长度在 1 到 4000 个字符',
            trigger: 'blur',
          },
        ],
      },
      matchFormat: 'CONTAINS_ANY',
    }
  },
  watch: {
    transfer: {
      handler(newVal, oldVal) {
        const { uuid } = newVal
        this.groupUuid = uuid
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      tagListSelect: (state) => state.tag.tagListSelect,
      auditSetting: (state) => state.sensitive.auditSetting,
    }),
  },
  created() {
    this.initData()
  },
  methods: {
    queue(arr, callback) {
      return queue(arr, callback)
    },
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
      this.form.content.splice(index, 1)
    },
    handleAddContent() {
      this.form.content.push({ value: '' })
    },
    handleConfirm() {
      //   const payload = this.form
      //   const content = this.content[0]

      this.$refs['form'].validate((valid) => {
        if (valid) {
          const arr = this.form.content.map((item) => {
            const content = item.value
            const groupUuid = this.groupUuid
            const type = this.type
            const tagUuids = this.tagSelects.join(',')
            const matchFormat = this.matchFormat
            const data = { tagUuids, matchFormat }
            const params = { groupUuid, type, content, ...data }
            return this.doConfirm({ params })
          })

          Promise.allSettled(arr).then((res) => {
            let failed = 0
            let successed = 0
            const flag = res.every((item) => {
              if (item.status === 'fulfilled') {
                successed++
              } else {
                failed++
              }
              return item.status === 'fulfilled'
            })
            if (flag) {
              this.$message({
                type: 'success',
                message: '全部成功',
                duration: 1000,
                onClose: () => {
                  this.handleCancel()
                  this.handleRefresh()
                },
              })
            } else {
              this.$confirm(`成功：${successed},\n失败：${failed}`)
                .then(() => {})
                .catch(() => {})
                .finally(() => {
                  this.handleCancel()
                  this.handleRefresh()
                })
            }
          })

          //   this.queue(arr)
          //   console.log(arr)
        } else {
          this.$message({
            type: 'error',
            message: '请检查输入',
          })
        }
      })
    },
    doConfirm(payload) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch('media/addMediaIsAudit', payload)
          .then(() => {
            // const message = this.auditSetting['media'] ? '已提交审核' : '已完成'
            // this.$message({
            //   type: 'success',
            //   message: message,
            // })
            //   this.handleCancel()
            //   this.handleRefresh()
            resolve('添加成功')
          })
          .catch((err) => {
            this.$message({
              type: 'error',
              message: '操作失败',
            })
            reject(err)
          })
      })
    },
    handleCancel() {
      this.$parent.$parent.dialogVisible = false
    },
    handleRefresh() {
      this.$bus.$emit('handleMediaRefresh')
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
