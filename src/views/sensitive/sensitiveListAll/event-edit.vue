<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="100px" label-position="left">
    <el-form-item label="敏感词" prop="word">
      <el-input v-model.trim="form.word"></el-input>
    </el-form-item>

    <!-- <el-form-item label="被通知人">
      <div>
        <el-radio v-model="form.informType" label="USER">员工通知</el-radio>
        <el-radio v-model="form.informType" label="ROLE">角色通知</el-radio>
      </div>
    </el-form-item>-->

    <!-- <el-form-item label></el-form-item>
    <div class="mb-20">
      <keep-alive>
        <div class="role-container mb-20" v-if="form.informType=='ROLE'">
          <el-select v-model="toRoles" multiple>
            <el-option
              v-for="item in listSelect"
              :key="item.uuid"
              :label="item.name"
              :value="item.uuid"
            ></el-option>
          </el-select>
        </div>
        <div v-else>
          <complex-select v-model="userSelects" :section="'user'" :options="departmentList"></complex-select>
        </div>
      </keep-alive>
      <span class="font-exs color-info">当员工触发敏感词后，除通知以上设置被通知人，触发的员工本人也将收到通知消息。</span>
    </div>-->

    <el-form-item label="符合标签">
      <div>
        <el-radio v-model="form.tagType" label="INSET">包含其一</el-radio>
        <el-radio v-model="form.tagType" label="UNIONSET">完全匹配</el-radio>
      </div>
    </el-form-item>
    <tag-multi-select v-model="form.setTag"></tag-multi-select>
    <!-- <tag-select v-model="tagSelects" :options="tagListSelect"></tag-select> -->

    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-t-button type="primary" size="small" @click="handleConfirm">确定</el-t-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
import AsyncUserTag from '@/components/AsyncUserTag'
import TagSelect from '@/components/TagSelect'
import TagMultiSelect from '@/components/TagMultiSelect'

export default {
  inject: ['reload'],
  props: {
    transfer: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  components: {
    AsyncUserTag,
    TagSelect,
    TagMultiSelect,
  },
  data() {
    return {
      userSelects: [],
      tagSelects: [],
      tagOriginSelects: null,
      indexTemp: [],
      inputVisible: false,
      inputValue: '',
      form: {
        uuid: '',
        type: '',
        informType: '',
        tagType: '',
        word: '',
        setTag: [],
        // tagType: 'INSET', //INSET UNIONSET
        // informType: 'USER', //USER,ROLE
        // type: 'MSG',
        // word: '',
        // uuid: null
      },
      toUserTags: [],
      toRoles: [],
      rules: {
        word: [
          { required: true, message: '请输入敏感词', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur',
          },
        ],
        code: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  watch: {
    transfer: {
      handler(newVal, oldVal) {
        this.tagSelects = this.$options.data().tagSelects
      },
      immediate: true,
    },
    currentWord: {
      handler: function (newVal, oldVal) {
        this.tagSelects = this.$options.data().tagSelects
        const {
          uuid,
          type,
          informType,
          tagType,
          sensitiveSetTag,
          toUser,
          toRole,
          word,
        } = newVal
        this.form.uuid = uuid
        this.form.type = type
        this.form.informType = informType
        this.form.tagType = tagType
        this.form.word = word

        console.log(sensitiveSetTag)

        this.form.setTag = sensitiveSetTag
          .reduce((sum, curr) => {
            return sum.concat(curr.tags)
          }, [])
          .map((item) => {
            return item.uuid
          })

        // this.form.setTag = sensitiveSetTag.map((item) => {
        //   return item.uuid
        // })

        // this.$set(this.form, 'uuid', uuid)
        // this.$set(this.form, 'type', type)
        // this.$set(this.form, 'informType', informType)
        // this.$set(this.form, 'tagType', tagType)
        // this.$set(this.form, 'word', word)
        // this.$set(
        //   this.form,
        //   'setTag',
        //   sensitiveSetTag.map((item) => {
        //     return item.uuid
        //   })
        // )
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      userListSelect: (state) => state.user.listSelect,
    //   departmentList: (state) => state.department.departmentList,
      listSelect: (state) => state.role.listSelect,
      tagListSelect: (state) => state.tag.tagListSelect,
      currentWord: (state) => state.sensitive.currentWord,
      tagListMap: (state) => state.tag.tagListMap,
    }),
    toUser() {
      return this.form.toUser
    },
  },
  created() {
    this.initFilter()
  },
  updated() {},
  methods: {
    initFilter() {
      this.$store
        .dispatch('role/getRoleListSelect')
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err || '初始化失败',
          })
        })

    //   this.$store
    //     .dispatch('department/getDepartmentListAll')
    //     .then(() => {})
    //     .catch((err) => {
    //       this.$message({
    //         type: 'error',
    //         message: err || '初始化失败',
    //       })
    //     })

      this.$store
        .dispatch('tag/getListSelect')
        .then((res) => {
          let temp = []
          res.forEach((item) => {
            temp.push(
              item.tagList.map((unit) => {
                return unit.uuid
              })
            )
          })
          this.tagOriginSelects = temp
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err || '初始化失败',
          })
        })
    },
    handleConfirm() {
      //   if (this.form.informType == 'USER') {
      //     this.form.toUser = this.userSelects.map(item => {
      //       return item.uuid
      //     })
      //   } else {
      //     this.form.toRole = this.toRoles
      //   }
    //   this.form.setTag = this.tagSelects.reduce((sum, curr) => {
    //     return sum.concat(curr)
    //   }, [])
      const payload = this.form

      this.$refs['form'].validate((valid) => {
        console.log(payload)
        if (valid) {
          this.$store
            .dispatch('sensitive/update', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功',
              })
              this.handleCancel()
              this.handleRefresh()
            })
            .catch((err) => {
              this.$message({
                type: 'error',
                message: '操作失败',
              })
            })
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
    handleChange() {},
    handleCloseTag() {},
    handleRefresh() {
      this.$bus.$emit('handleRefresh')
    },
    handleClose(tag) {
      this.form.words.splice(this.form.words.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.form.words.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
  },
}
</script>

<style lang="scss">
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.role-container {
  .el-select {
    display: block;
  }
}
</style>

