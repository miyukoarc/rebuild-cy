<template>
  <div>
    <el-tabs v-model="activeType">
      <el-tab-pane label="详情" name="detail">
        <el-form label-width="100px" label-position="left">
          <el-form-item>
            <div>
              <img width="128" height="128" :src="userDetail.headimgurl" />
            </div>
          </el-form-item>
          <el-form-item label="昵称">
            <div>{{userDetail.nickname}}</div>
          </el-form-item>
          <el-form-item label="性别">
            <div>{{sex(userDetail.gender)}}</div>
          </el-form-item>
          <el-form-item label="状态">
            <div>
              <el-tag
                type="primary"
                size="mini"
              >{{isEmpty(userDetail.state)?'未指定':userDetail.state.name}}</el-tag>
            </div>
          </el-form-item>

          <el-form-item label="角色">
            <div>
              {{
              userDetail.role&&userDetail.role.name
              }}
            </div>
          </el-form-item>
          <el-form-item label="公司">
            {{
            isEmpty(userDetail.org)?'未指定':userDetail.org.name
            }}
          </el-form-item>
          <el-form-item label="部门">
            {{
            isEmpty(userDetail.department)?'未指定':userDetail.department.name
            }}
          </el-form-item>

          <el-form-item label="可用">
            <div>
              <el-tag type="success" v-if="userDetail.enabled">可用</el-tag>
              <el-tag type="danger" v-else>不可用</el-tag>
            </div>
          </el-form-item>
          <el-form-item label="手机">
            <div>{{userDetail.userinfo&&userDetail.userinfo.mobile}}</div>
          </el-form-item>
          <el-form-item
            label="国家/地区"
          >{{isEmpty(userDetail.country)&&isEmpty(userDetail.city)&&isEmpty(userDetail.province)?'未设置':userDetail.country+userDetail.city+userDetail.province}}</el-form-item>
          <el-form-item label="操作">
            <el-button
              v-for="item in userDetail.events"
              :key="item"
              type="primary"
              @click="handleEvents(item)"
            >{{item}}</el-button>
          </el-form-item>


        </el-form>
      </el-tab-pane>
      <el-tab-pane label="操作历史" name="logs" :disabled="!userDetail.logs.length">
        <el-scrollbar>
          <el-timeline class="py-3">
            <el-timeline-item
              v-for="item in userDetail.logs"
              :key="item.uuid"
              :timestamp="item.createdAt"
            >
                <div>
                  {{item.operator.nickname}}
                  <span style="font-size:12px;color:#E6A23C;">@{{item.org.name}}</span>
                  <span class="font-sm">执行了</span>
                  <span style="color:#F56C6C;">{{item.event}}</span>
                </div>
                
            </el-timeline-item>
          </el-timeline>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>

    <EventDialog ref="eventDialog" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import EventDialog from './dialog'

export default {
  components: {
    EventDialog
  },
  data() {
    return {
      activeType: 'detail'
    }
  },
  watch: {},
  computed: {
    ...mapState({
      eventsMap: state => state.stateSettings.eventsMap,
      userDetail: state => state.userManage.userDetail
    })
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  methods: {
    sex(gender) {
      if (gender == 'Gender_Type_Unknown' || !gender) {
        return '未知'
      }
      if (gender == 'Gender_Type_Female') {
        return '女'
      }
      if (gender == 'Gender_Type_Male') {
        return '男'
      }
    },
    initHandleEvents() {},
    isEmpty(obj) {
      return isEmpty(obj)
    },
    handleClose() {
      this.$store.commit('component/TOGGLE_PANEL', false)
    },
    handleEvents(type) {
      console.log(this.$refs, type)
      const temp = type
      switch (type) {
        case 'enable':
          type = 'EventEnable'
          break
        case 'kick':
          type = 'EventKick'
          break
        case 'disable':
          type = 'EventDisable'
          break
        default:
          return false
      }
      this.$refs['eventDialog'].event = type
      this.$refs['eventDialog'].eventType = temp
      this.$refs['eventDialog'].dialogVisible = true
    },
    handleConfirm() {},
    initData() {}
  }
}
</script>

<style>
</style>