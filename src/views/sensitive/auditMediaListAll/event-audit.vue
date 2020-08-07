<template>
  <el-form ref="form" label-width="150px" label-position="left">
    <el-form-item label="提交人：">
      <div class="submit-item" v-if="detail.submitOperator">
        <async-user-tag size="small" type="info" :uuid="detail.submitOperator.uuid">
          <i class="el-icon-user-solid color-primary"></i>
          {{detail.submitOperator.name}}
        </async-user-tag>
      </div>

      <!-- <div class="submit-item" v-if="detail.approvedOperator">
        <async-user-tag size="small" type="info" :uuid="detail.approvedOperator.uuid">
          <i class="el-icon-user-solid color-primary"></i>
          {{detail.approvedOperator.name}}
        </async-user-tag>
      </div>-->

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

    <el-form-item label="素材：">
      <div class="media-container" v-if="detail.mediaOperationType==='UPDATE_ARTICLE'">
        <div class="article-container" v-if="detail.auditAddMedia[0].type==='ARTICLE'">
          <h3>{{detail.auditAddMedia[0].title}}</h3>
          <div class="font-es" v-html="detail.articleContent"></div>
        </div>
      </div>
      <div class="media-container" v-if="detail.mediaOperationType==='ADD_MEDIA'">
        <el-image
          v-if="detail.auditAddMedia[0].type==='IMAGE'"
          fit="contain"
          :src="`/api/public/file/${detail.auditAddMedia[0].localId}`"
        ></el-image>
        <video
          controls
          style="width:400px;height:300px"
          v-if="detail.auditAddMedia[0].type==='VIDEO'"
          :src="`/api/public/file/${detail.auditAddMedia[0].localId}`"
        ></video>
        <div
          class="text-container"
          v-if="detail.auditAddMedia[0].type==='TEXT'"
        >{{detail.auditAddMedia[0].textContents}}</div>
        <div class="article-container" v-if="detail.auditAddMedia[0].type==='ARTICLE'">
          <h3>{{detail.auditAddMedia[0].title}}</h3>
          <div class="font-es" v-html="detail.articleContent"></div>
        </div>
        <div class="file-container" v-if="detail.auditAddMedia[0].type==='FILE'">
          <el-button size="small" @click="handleDownload">
            <i class="el-icon-document"></i>
            {{detail.auditAddMedia[0].fileName}}&emsp;
            <i class="el-icon-download"></i>
          </el-button>
        </div>
      </div>

      <div class="media-container" v-if="detail.mediaOperationType==='DELETE_MEDIA'">
        <el-image
          v-if="detail.toMedis[0].type==='IMAGE'"
          fit="contain"
          :src="`/api/public/file/${detail.toMedis[0].localId}`"
        ></el-image>
        <video
          controls
          style="width:400px;height:300px"
          v-if="detail.toMedis[0].type==='VIDEO'"
          :src="`/api/public/file/${detail.toMedis[0].localId}`"
        ></video>
        <div
          class="text-container"
          v-if="detail.toMedis[0].type==='TEXT'"
        >{{detail.toMedis[0].textContents}}</div>
        <div class="article-container" v-if="detail.toMedis[0].type==='ARTICLE'">
          <h3>{{detail.toMedis[0].title}}</h3>
          <div class="font-es" v-html="detail.articleContent"></div>
        </div>
        <div class="file-container" v-if="detail.toMedis[0].type==='FILE'">
          <el-button size="small" @click="handleDownload">
            <i class="el-icon-document"></i>
            {{detail.toMedis[0].fileName}}&emsp;
            <i class="el-icon-download"></i>
          </el-button>
        </div>
      </div>
    </el-form-item>

    <el-form-item label="标签配置：">
      <div v-if="detail.auditAddMedia">
        <span
          class="color-primary font-exs"
          v-if="tags.length"
        >{{matchFormat[detail.auditAddMedia[0].matchFormat]}}</span>
        <span class="color-primary font-exs" v-else>未配置标签</span>
        <icon-tooltip>
          <div>
            <div class="font-exs color-info">包含其一：至少包含一个标签。</div>
            <div class="font-exs color-info">完全匹配：包含全部标签。</div>
          </div>
        </icon-tooltip>
      </div>
      <tags-drawer v-if="tags.length" :tags="tags"></tags-drawer>
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
      <el-button
        v-if="detail.auditState==='TO_BE_REVIEWED'&&!currentUserState(detail.auditUsers)"
        size="small"
        @click="handleAudit(action='reject')"
      >拒绝</el-button>
      <el-button
        v-if="detail.auditState==='TO_BE_REVIEWED'&&!currentUserState(detail.auditUsers)"
        type="primary"
        size="small"
        @click="handleAudit(action='access')"
      >通过</el-button>
      <el-button
        v-if="detail.auditState!=='TO_BE_REVIEWED'||currentUserState(detail.auditUsers)"
        size="small"
        @click="handleCancel"
      >取消</el-button>
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
  watch: {
    transfer: {
      handler(newVal, oldVal) {
        this.initData(newVal.uuid)
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    ...mapState({
      auditState: (state) => state.enum.auditState,
      matchFormat: (state) => state.enum.matchFormat,
      currentUserUuid: (state) => state.user.uuid,
    }),
  },
  mounted() {},
  methods: {
    initData(payload) {
      this.$store
        .dispatch('audit/getDetail', payload)
        .then((res) => {
          let submitUser = {}
          if (Object.keys(res.submitOperator).length) {
            submitUser = res.submitOperator
          } else {
            submitUser = res.approvedOperator
          }

          console.log(submitUser)

          if (res.mediaOperationType === 'ADD_MEDIA') {
            this.detail = {
              ...res,
              auditAddMedia: this.parse(res.auditAddMedia),
              auditUsers: this.parse(res.auditUsers),
            }

            // if (res.auditAddMedia) {
            let arr

            if (Object.keys(res.toTags).length) {
              arr = res.toTags
            } else {
              arr = this.parse(res.auditAddMedia)[0].tagsDto || []
            }

            // console.log(arr, res.toTags)

            this.tags = this.grouping(arr)
            // } else {
            //   this.tags = []
            // }
          }
          if (res.mediaOperationType === 'DELETE_MEDIA') {
            this.detail = {
              ...res,
              auditUsers: this.parse(res.auditUsers),
            }

            console.log(res.toMedis)

            // if (Object.keys(res.toMedis).length) {
            const arr = res.toMedis[0].toTags
            console.log(arr)
            this.tags = this.groupingDelete(arr)
            // } else {
            //   this.tags = []
            // }

            // this.tags = Object.keys(this.detail.toMedis).length
            //   ? this.groupingDelete(this.detail.toMedis[0].toTags)
            //   : []
          }

          if (res.mediaOperationType === 'UPDATE_ARTICLE') {
            this.detail = {
              ...res,
              auditAddMedia: this.parse(res.auditAddMedia),
              auditUsers: this.parse(res.auditUsers),
            }

            // if (res.auditAddMedia) {
            let arr

            if (Object.keys(res.toTags).length) {
              arr = res.toTags
            } else {
              arr = this.parse(res.auditAddMedia)[0].tagsDto || []
            }

            // console.log(arr, res.toTags)

            this.tags = this.grouping(arr)
            // } else {
            //   this.tags = []
            // }
          }
        })
        .catch((err) => {
          console.error(err)
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
    grouping(list) {
      if (Object.keys(list).length) {
        let temp = list.map((item) => {
          return {
            ...item,
            groupName: item.tagGroupName,
            groupId: item.tagGroupId,
          }
        })
        return temp.reduce((groups, item) => {
          let groupFound = groups.find(
            (foundItem) => item.groupId === foundItem.groupId
          )
          if (groupFound) {
            groupFound.tags.push(item)
          } else {
            let newGroup = {
              groupId: item.tagGroupId,
              groupName: item.tagGroupName,
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
    groupingDelete(list) {
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

      console.log(payload)
      this.$store
        .dispatch('audit/batchAuditMediaConfirmation', payload)
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
          //   this.$message({
          //     type: 'error',
          //     message: err,
          //   })
          this.$confirm(err, '错误', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error',
          })
            .finally(()=>{
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
    handleDownload() {
      const url = this.detail.auditAddMedia[0].localId
      window.location.href = `/api/public/file/${url}`
    },
  },
}
</script>

<style lang="scss" scoped>
.submit-item {
  margin-bottom: 10px;
}
.media-container {
  .article-container {
    height: 320px;
    overflow-y: scroll;
  }
}
</style>