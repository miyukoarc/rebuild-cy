<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="100px">
    <el-form-item label="敏感词">
      <!-- <el-input v-model="form.word"></el-input> -->
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
    <el-form-item label="通知人">
      <div>
        <el-radio v-model="form.informType" label="USER">员工通知</el-radio>
        <el-radio v-model="form.informType" label="ROLE">角色通知</el-radio>
      </div>

    </el-form-item>

    <el-form-item label>
        <keep-alive>
      <div v-if="form.informType=='ROLE'">
          <el-select >
              <el-option
                v-for="item in 10"
                :key="item"
                :label="item"
                :value="item"
            ></el-option>
          </el-select>
      </div>
      <div v-else>
          <complex-select v-model="userSelects" :section="'user'" :options="departmentList"></complex-select>
      </div>
            
        </keep-alive>

    </el-form-item>

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
export default {
  inject: ['reload'],
  components: {
    AsyncUserTag,
    ComplexSelect
  },
  data() {
    return {
      userSelects: [],
      inputVisible: false,
      inputValue: '',
      form: {
        informType: 'USER', //USER,ROLE
        words: [],
        type: 'MSG',
        toUser: []
      },
      toUserTags: [],
      rules: {
        word: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    toUser: {
      handler(newValue, oldVal) {
        this.toUserTags = this.userListSelect.filter(item => {
          return newValue.some(key => {
            return item.userId === key
          })
        })
      },
      deep: true
    },
    toUserTags: {
      handler(newValue, oldVal) {},
      deep: true
    }
  },
  computed: {
    ...mapState({
      userListSelect: state => state.user.listSelect,
      departmentList: state => state.department.departmentList
    }),
    toUser() {
      return this.form.toUser
    }
  },
  mounted() {
    this.initFilter()
  },
  methods: {
    initFilter() {
      this.$store
        .dispatch('role/getRoleList')
        .then(() => {})
        .catch(err => {
          this.$message({
            type: 'error',
            message: err || '初始化失败'
          })
        })

        this.$store
        .dispatch('department/getDepartmentListAll')
        .then(() => {})
        .catch(err => {
          this.$message({
            type: 'error',
            message: err || '初始化失败'
          })
        })
    },
    handleConfirm() {
      const payload = this.form

      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(payload)
          this.$store
            .dispatch('sensitive/add', payload)
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
    handleChange() {},
    handleCloseTag() {},
    refresh() {
      this.$store
        .dispatch('sensitive/getSensitiveListAll')
        .then(() => {
          this.reload()
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
    },
    handleClose(tag) {
      this.form.words.splice(this.form.words.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
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
    }
  }
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
</style>