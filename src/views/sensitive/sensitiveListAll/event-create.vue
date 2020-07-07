<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="100px">
    <el-form-item label="敏感词" prop="name">
      <el-input v-model="form.word"></el-input>
    </el-form-item>
    <el-form-item label="通知人">
      <el-select multiple collapse-tags v-model="form.toUser" placeholder="请选择">
        <el-option
          v-for="item in userListSelect"
          :key="item.userId"
          :label="item.name"
          :value="item.userId"
        ></el-option>
      </el-select>

      <div>
        <div v-if="toUserTags.length">
          <el-tag closable v-for="item in toUserTags" :key="item.uuid" style="margin-right:5px;" size="small">
            <i class="el-icon-user-solid"></i>
            <span>{{item.name}}</span>
          </el-tag>
          <!-- <async-user-tag closable @close="handleCloseTag" v-for="item in toUserTags" :key="item.uuid" :uuid="item.uuid" :hasPop="true" size="small"><i class="el-icon-user-solid"></i>{{item.name}}</async-user-tag> -->
        </div>
      </div>
    </el-form-item>

    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
    </div>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
import AsyncUserTag from '@/components/AsyncUserTag'
export default {
  inject: ['reload'],
  components:{
      AsyncUserTag
  },
  data() {
    return {
      hasParent: false,
      form: {
        word: '',
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
      handler(newValue, oldVal) {

      },
      deep: true
    }
  },
  computed: {
    ...mapState({
      userListSelect: state => state.user.listSelect
    }),
    toUser() {
      return this.form.toUser
    }
  },
  mounted() {},
  methods: {
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
    handleCloseTag(){},
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
    }
  }
}
</script>

<style>
</style>