<template>
  <div class="form-container">
    <div class="setting-item-container">
      <div class="setting-item" v-for="(item,index) in form.auditUserList" :key="index">
        <div class="col-item">
          <div class="left-container">
            <h4>第{{index+1}}层审批流程</h4>
          </div>
        </div>
        <div class="col-item">
          <div class="audit-type">
            <el-radio v-model="item.range" :label="1">会签</el-radio>
            <el-radio v-model="item.range" :label="0">或签</el-radio>
            <el-button v-if="index!==0" type="text" @click="handleDelete(index)">
              <span class="color-danger">删除</span>
            </el-button>
          </div>

          <add-tag v-model="item.userList"></add-tag>
        </div>
      </div>
      <div class="text-align-left">
        <el-button type="text" @click="handleAddLevel">
          <i class="el-icon-circle-plus-outline"></i>
          添加流程
        </el-button>
      </div>
      <el-divider></el-divider>
    </div>
    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddTag from './components/add-tag-back-up.vue'
export default {
  props: {
    transfer: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  components: {
    AddTag,
  },
  data() {
    return {
      value: [],
      query: {
        startTime: '',
        endTime: '',
        word: '',
      },
      form: {
        auditUserList: [
          {
            level: 1,
            range: 1,
            userList: [], //userId
          },
        ],
        uuid: '',
      },
      levels: 1,
    }
  },
  watch: {
    transfer: {
      handler(newVal, oldVal) {
        const uuid = newVal.uuid
        this.form.uuid = uuid
      },

      immediate: true,
    },
  },
  computed: {},
  methods: {
    handleDelete(index) {
      this.form.auditUserList.splice(index, 1)
      this.levels--
    },
    handleAddLevel() {
      let addLevel = ++this.levels
      const obj = {
        level: addLevel,
        range: 1,
        userList: [], //userId
      }

      this.form.auditUserList.push(obj)
    },
    handleCancel() {
      this.$parent.$parent.dialogVisible = false
    },
    handleConfirm() {
      const emptyFlag = this.form.auditUserList.every((item) => {
        return item.userList.length != 0
      })

      if (emptyFlag) {
        const auditUserList = this.form.auditUserList.map((item, index) => {
          return {
            ...item,
            level: index + 1,
            userList: item.userList.map((unit) => {
              return {
                name: unit.name,
                userId: unit.userId,
                uuid: unit.uuid,
                auditState: 'TO_BE_REVIEWED',
              }
            }),
          }
        })
        const form = this.form
        const payload = { ...form, auditUserList }
        this.$store
          .dispatch('sensitive/setAuditUser', payload)
          .then(() => {
                this.$message({
              type: 'success',
              message: '操作成功',
              duration: 1000,
              onClose: () => {
                this.handleRefresh()
                this.handleCancel()
              },
            })
          })
          .catch((err) => {
            console.error(err)
            // this.$message({
            //   type: 'error',
            //   message: err,
            // })
          })
      } else {
        this.$confirm('请设置审批人！', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {

          })
          .catch(() => {
              this.handleCancel()
          })
      }
    },
    handleRefresh() {
      this.$bus.$emit('handleRefresh')
    },
  },
}
</script>

<style lang="scss" scoped>
.el-form-item:last-child {
  margin-bottom: 0;
}
.setting-item {
  display: flex;
  margin-bottom: 20px;
  .col-item:nth-child(1) {
    margin-right: 30px;
  }
  .col-item:nth-child(2) {
    flex: 1;
  }
  .left-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .audit-type {
    margin-bottom: 10px;
  }
  .user-tag {
    margin-bottom: 10px;
  }
}
</style>