<template>
  <el-form ref="form" label-width="150px" label-position="left">
    <el-form-item label="提交人：" v-if="detail.submitOperator">
      <div class="submit-item">
        <async-user-tag size="small" type="info" :uuid="detail.submitOperator.uuid">
          <i class="el-icon-user-solid color-primary"></i>
          {{detail.submitOperator.name}}
        </async-user-tag>
      </div>

      <div class="submit-item">
        <el-tag
          v-if="detail.auditState==='TO_BE_REVIEWED'"
          type="primary"
          size="mini"
        >{{auditState[detail.auditState]}}</el-tag>
        <el-tag
          v-if="detail.auditState==='APPROVED'"
          type="success"
          size="mini"
        >{{auditState[detail.auditState]}}</el-tag>
        <el-tag
          v-if="detail.auditState==='AUDIT_FAILED'"
          type="danger"
          size="mini"
        >{{auditState[detail.auditState]}}</el-tag>
      </div>

      <div class="sumbit-item">
        <span class="color-info font-exs">{{detail.updatedAt}}</span>
      </div>
    </el-form-item>

    <!-- <el-form-item label="权限：">
      <div class v-for="item in permissionList" :key="item.module">
        <span class="font-es font-weight-700">{{permissionEnum[item.module]}}：</span>
        <span v-text="format(item.permissions)"></span>
      </div>
    </el-form-item>-->
    <el-form-item label="动作：" v-if="detail.tagChangeContent">
      <div v-if="detail.tagOperationType==='DELETE_TAG_GROUP'">
        <span class="font-exs color-info">{{detail.tagChangeContent[0].groupName}}</span>
      </div>

      <div v-if="detail.tagOperationType==='ADD_TAG'">
        <span class="font-exs color-info">{{detail.tagChangeContent[0].groupName}}</span>
      </div>

      <div v-if="detail.tagOperationType==='UPDATE_TAG'">
        <div v-if="detail.tagChangeContent.length===0">
          <span class="font-exs color-info">删除</span>
          <el-tag v-for="tag in detail.tagBeforeChangeContent" :key="tag.tagId">{{tag.tagName}}</el-tag>
        </div>
        <div v-else>
          <div>
            <span class="font-exs color-info">修改前</span>
            <el-tag
              size="mini"
              v-for="tag in detail.tagBeforeChangeContent"
              :key="tag.tagId"
            >{{tag.tagName}}</el-tag>
          </div>
          <div>
            <span class="font-exs color-info">修改后</span>
            <el-tag size="mini" v-for="tag in detail.tagChangeContent" :key="tag.tagId">{{tag.tagName}}</el-tag>
          </div>
        </div>
      </div>
    </el-form-item>

    <el-form-item label="审批流程：">
      <div>
        <el-timeline>
          <el-timeline-item v-for="item in detail.auditUsers" :key="item.level">
            <h5>
              {{item.range?'会签':'或签'}}·
              <span v-if="checkState(item)==='finished'">已完成</span>
              <span v-else class="color-primary">进行中</span>
            </h5>
            <div v-for="user in item.userList" :key="user.uuid">
              <async-user-tag size="small" type="info" :uuid="user.uuid">
                <i class="el-icon-user-solid color-primary"></i>
                {{user.name}}
              </async-user-tag>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-form-item>
    <div class="text-align-center">
      <el-t-button
        v-if="detail.auditState==='TO_BE_REVIEWED'&&!currentUserState(detail.auditUsers)"
        size="small"
        @click="handleAudit(action='reject')"
        v-permission="'audit,audit_batchAuditTagConfirmation'"
        :popAuth="true"
        :auth="'audit,audit_batchAuditTagConfirmation'"
      >拒绝</el-t-button>
      <el-t-button
        v-if="detail.auditState==='TO_BE_REVIEWED'&&!currentUserState(detail.auditUsers)"
        type="primary"
        size="small"
        @click="handleAudit(action='access')"
        v-permission="'audit,audit_batchAuditTagConfirmation'"
        :popAuth="true"
        :auth="'audit,audit_batchAuditTagConfirmation'"
      >通过</el-t-button>
      <!-- <el-button
        v-if="detail.auditState!=='TO_BE_REVIEWED'||currentUserState(detail.auditUsers)"
        size="small"
        @click="handleCancel"
      >取消</el-button> -->
    </div>
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
import AsyncUserTag from '@/components/AsyncUserTag'
import VideoCover from '@/components/VideoCover'
import TagsDrawer from '@/components/TagsDrawer'
import IconTooltip from '@/components/IconTooltip'
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
    VideoCover,
    TagsDrawer,
    IconTooltip,
  },
  data() {
    return {
      form: {
        name: '',
        code: '',
        org: '',
      },
      //range==1,会签 range==0，或签
      detail: {},
      permissionList: [],
      tags: [],
      rules: {
        name: [
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
  computed: {
    ...mapState({
      auditState: (state) => state.enum.auditState,
      matchFormat: (state) => state.enum.matchFormat,
      permissionEnum: (state) => state.enum.roleDetail,

      auditSetting: (state) => state.sensitive.auditSetting,
      currentUserUuid: (state) => state.user.uuid,
    }),
  },
  watch: {
    transfer: {
      handler(newVal, oldVal) {
        this.initData(newVal.uuid)
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    // this.initData(this.transfer?.uuid)
  },
  mounted() {},
  methods: {
    myFilter(arr1, arr2) {
      let arr1Temp = []
      let arr2Temp = []
      let temp = [] //交集
      arr1.forEach((item1) => {
        arr2.forEach((item2) => {
          if (item1.tagName === item2.tagName) {
            temp.push(item1)
          }
        })
      })

      arr1.forEach((item) => {
        if (
          !temp.find((unit) => {
            return unit.tagName === item.tagName
          })
        ) {
          arr1Temp.push(item)
        }
      })

      arr2.forEach((item) => {
        if (
          !temp.find((unit) => {
            return unit.tagName === item.tagName
          })
        ) {
          arr2Temp.push(item)
        }
      })

      return [[...arr1Temp], [...arr2Temp], [...temp]]
    },
    initData(payload) {
      this.$store
        .dispatch('audit/getDetail', payload)
        .then((res) => {
          const arr1 = this.parse(res.tagBeforeChangeContent) || []
          const arr2 = this.parse(res.tagChangeContent) || []
          const temp = this.myFilter(arr1, arr2)
          this.detail = {
            ...res,
            auditUsers: this.parse(res.auditUsers),
            tagBeforeChangeContent: temp[0],
            // res.tagBeforeChangeContent
            //   ? this.groupingTags(this.parse(res.tagBeforeChangeContent))
            //   : [],
            tagChangeContent: temp[1],
            // res.tagChangeContent
            //   ? this.groupingTags(this.parse(res.tagChangeContent))
            //   : [],
          }

          this.permissionList = this.grouping(res.toPermissions)
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err,
          })
        })
    },
    parse(str) {
      return JSON.parse(str)
    },
    handleCancel() {
      this.$parent.$parent.dialogVisible = false
    },
    handleAudit(action) {
      const uuid = this.transfer.uuid
      let payload = null
      if (action === 'reject') {
        payload = {
          auditConfirmation: 'AUDIT_FAILED',
          uuids: [uuid],
        }
      } else {
        payload = {
          auditConfirmation: 'APPROVED',
          uuids: [uuid],
        }
      }
      this.$store
        .dispatch('audit/batchAuditTagConfirmation', payload)
        .then(() => {
          this.$message({
            type: 'success',
            message: '操作成功',
            duration: 1000,
            onClose: () => {
              this.handleCancel()
              this.handleRefresh()
            },
          })
        })
        .catch((err) => {
          this.$confirm(err, '错误', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error',
          }).finally(() => {
            this.handleRefresh()
            this.handleCancel()
          })
        })
    },
    handleRefresh() {
      this.$bus.$emit('handleRefresh')
    },
    checkState(item) {
      if (!!item.range) {
        //range==1 会签
        if (
          item.userList.some((user) => {
            return user.auditState === 'TO_BE_REVIEWED'
          })
        ) {
          return 'underway'
        } else {
          return 'finished'
        }
      } else {
        //或签

        if (
          item.userList.every((unit) => {
            return unit.auditState === 'TO_BE_REVIEWED'
          })
        ) {
          return 'underway'
        } else {
          return 'finished'
        }
      }
    },
    grouping(list) {
      if (Object.keys(list).length) {
        return list.reduce((groups, item) => {
          let groupFound = groups.find(
            (foundItem) => item.module === foundItem.module
          )
          if (groupFound) {
            groupFound.permissions.push(item)
          } else {
            let newGroup = {
              module: item.module,
              permissions: [item],
            }

            groups.push(newGroup)
          }

          return groups
        }, [])
      } else {
        return []
      }
    },
    groupingTags(list) {
      if (Object.keys(list).length) {
        return list.reduce((groups, item) => {
          let groupFound = groups.find(
            (foundItem) => item.groupId === foundItem.groupId
          )
          if (groupFound) {
            groupFound.tags.push(item)
          } else {
            let newGroup = {
              groupId: item.groupId,
              groupName: item.groupName,
              tags: [item],
            }

            groups.push(newGroup)
          }

          return groups
        }, [])
      } else {
        return []
      }
    },
    format(arr) {
      let temp = []
      temp = arr.map((item) => {
        return item.title
      })
      return temp.join('、')
    },
    currentUserState(arr) {
      //detail.auditUsers
      let flag = false
      arr.forEach((item) => {
        item.userList.forEach((user) => {
          if (user.uuid === this.currentUserUuid) {
            if (
              user.auditState === 'APPROVED' ||
              user.auditState === 'AUDIT_FAILED'
            ) {
              flag = true
            }
          }
        })
      })

      return flag
    },
  },
}
</script>

<style lang="scss" scoped>
.submit-item {
  margin-bottom: 10px;
}
.media-container {
  width: 180px;
  height: 320;
}
</style>