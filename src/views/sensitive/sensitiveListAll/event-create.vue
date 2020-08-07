<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="100px" label-position="left">
    <el-form-item label="敏感词">
      <el-tag
        :key="tag"
        v-for="tag in form.words"
        closable
        size="big"
        style="margin-right:5px;"
        :disable-transitions="false"
        @close="handleClose(tag)"
      >{{tag}}</el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      ></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">
        <i class="el-icon-plus"></i>添加
      </el-button>
    </el-form-item>
    <el-form-item label="被通知人">
      <div>
        <el-radio v-model="form.informType" label="USER">员工</el-radio>
        <el-radio v-model="form.informType" label="ROLE">角色</el-radio>
      </div>
    </el-form-item>

    <el-form-item label></el-form-item>
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
    </div>

    <el-form-item label="符合标签">
      <div>
        <el-radio v-model="form.tagType" label="INSET">包含其一</el-radio>
        <el-radio v-model="form.tagType" label="UNIONSET">完全匹配</el-radio>
      </div>
    </el-form-item>
    <tag-multi-select v-model="tagSelects"></tag-multi-select>

    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
import ComplexSelect from '@/components/ComplexSelect'
import AsyncUserTag from '@/components/AsyncUserTag'
import TagMultiSelect from '@/components/TagMultiSelect'

export default {
  inject: ['reload'],
  components: {
    AsyncUserTag,
    ComplexSelect,
    TagMultiSelect,
  },
  data() {
    return {
      userSelects: [],
      tagSelects: [],
      inputVisible: false,
      inputValue: '',
      form: {
        tagType: 'INSET', //INSET UNIONSET
        informType: 'USER', //USER,ROLE
        type: 'MSG',
        words: [],
      },
      toUserTags: [],
      toRoles: [],
      rules: {
        word: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
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
    'form.informType': {
      handler(newVal, oldVal) {
        if (newVal == 'ROLE') {
          this.$set(this.form, 'toRole', [])
          this.$delete(this.form, 'toUser')
        }
        if (newVal == 'USER') {
          this.$set(this.form, 'toUser', [])
          this.$delete(this.form, 'toRole')
        }
      },
      immediate: true,
    },
    // toUser: {
    //   handler(newValue, oldVal) {
    //     this.toUserTags = this.userListSelect.filter(item => {
    //       return newValue.some(key => {
    //         return item.userId === key
    //       })
    //     })
    //   },
    //   deep: true
    // },
    toUserTags: {
      handler(newValue, oldVal) {},
      deep: true,
    },
  },
  computed: {
    ...mapState({
      departmentList: (state) => state.department.departmentList,
      listSelect: (state) => state.role.roleListSelect,
      tagListSelect: (state) => state.tag.tagListSelect,
    }),
    toUser() {
      return this.form.toUser
    },
  },
  mounted() {
    this.initFilter()
  },
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

      this.$store
        .dispatch('department/getDepartmentListAll')
        .then(() => {})
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err || '初始化失败',
          })
        })

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
    handleConfirm() {
      if (this.form.informType == 'USER') {
        this.form.toUser = this.userSelects.map((item) => {
          return item.uuid
        })
      } else {
        this.form.toRole = this.toRoles
      }
      this.form.setTag = this.tagSelects
      const payload = this.form

      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch('sensitive/add', payload)
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

    handleRefresh() {
      this.$bus.$emit('handleRefresh')
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

