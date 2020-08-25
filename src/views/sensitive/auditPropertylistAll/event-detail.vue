<template>
  <div class="form-container">
    <div class="setting-item-container">
      <div class="setting-item" v-for="(item,index) in listAll" :key="index">
        <div class="col-item">
          <div class="left-container">
            <h4>第{{item.level}}层审批流程</h4>
            <!-- <div class="text-align-center">
              <el-button type="text" @click="handleAddLevel">
                <i class="el-icon-circle-plus-outline"></i>
                添加流程
              </el-button>
            </div>-->
          </div>
        </div>
        <div class="col-item">
          <div class="audit-type">
            <el-radio disabled v-model="item.range" :label="1">会签</el-radio>
            <el-radio disabled v-model="item.range" :label="0">或签</el-radio>
          </div>

          <div class="user-tag">
            <async-user-tag
              size="small"
              v-for="user in item.userList"
              type="info"
              :key="user.uuid"
              :uuid="user.uuid"
            >
              <i class="el-icon-user-solid color-primary"></i>
              {{user.name}}
            </async-user-tag>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
    </div>
    <div class="text-align-center">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <!-- <el-button type="primary" size="small" @click="handleConfirm">确定</el-button> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddTag from './components/add-tag-back-up.vue'
import AsyncUserTag from '@/components/AsyncUserTag'
export default {
  props: {
    transfer: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    AddTag,
    AsyncUserTag
  },
  data() {
    return {
      value: [],
      query: {
        startTime: '',
        endTime: '',
        word: ''
      },
      form: {
        auditUserList: [
          {
            level: 1,
            range: 1,
            userList: [] //userId
          }
        ],
        uuid: ''
      },
      levels: 1,
      listAll: []
    }
  },
  created() {
    this.initData(this.transfer?.uuid)
  },
  computed: {},
  methods: {
    initData(payload) {
      this.$store
        .dispatch('sensitive/auditDetail', payload)
        .then(res => {
          // console.log(this.parse(res.auditUsers))
          this.listAll = this.parse(res.auditUsers)
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
    },
    parse(str) {
      return JSON.parse(str)
    },
    handleCancel() {
      this.$parent.$parent.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item:last-child {
  margin-bottom: 0;
}
.setting-item {
  width: 400px;
  display: flex;
  margin-bottom: 20px;
  .col-item {
    margin-right: 30px;
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