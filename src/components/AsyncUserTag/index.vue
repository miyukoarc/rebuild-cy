<template>
  <div class="container">
    <div class="container" @mouseenter="handleShow" @mouseleave="handleClose">
      <el-tooltip v-if="hasPop" v-model="status" manual :enterable="true" placement="right">
        <div slot="content">
          <div>
            <el-row style="width:200px">
              <el-col :span="6">
                <img :src="tempUserDetail.avatar" style="width:36px;height:36px;" />
              </el-col>
              <el-col :span="18">
                <el-row style="margin-bottom:10px;">
                  <el-col :span="6">
                    <div>公司</div>
                  </el-col>
                  <el-col :span="18">
                    <div>{{corpInfo.name}}</div>
                  </el-col>
                </el-row>
                <el-row style="margin-bottom:10px;">
                  <el-col :span="6">
                    <div>部门</div>
                  </el-col>
                  <el-col :span="18">
                    <div v-if="tempUserDetail.departments">{{tempUserDetail.departments[tempUserDetail.departments.length-1].name}}</div>
                  </el-col>
                </el-row>
                <el-row style="margin-bottom:10px;">
                  <el-col :span="6">
                    <div>角色</div>
                  </el-col>
                  <el-col :span="18">
                    <div v-if="tempUserDetail.role">{{tempUserDetail.role.name}}</div>
                  </el-col>
                </el-row>
                <el-row style="margin-bottom:10px;">
                  <el-col :span="6">
                    <div>手机</div>
                  </el-col>
                  <el-col :span="18">
                    <div>{{tempUserDetail.mobile?tempUserDetail.mobile:'--'}}</div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-tag v-bind="$attrs" effect="plain">
          <slot></slot>
        </el-tag>
      </el-tooltip>
      <el-tag v-else v-bind="$attrs" effect="plain">
        <slot></slot>
      </el-tag>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'async-user-tag',
  props: {
    hasPop: {
      type: Boolean,
      default: true,
    }, //tooltip开关
    uuid: {
      type: Number,
    },
  },
  data() {
    return {
      status: false,
      watchFlag: false,
      tempUserDetail: {},
      timer: null,
    }
  },
  computed: {
    ...mapState({
      corpInfo: (state) => state.auth.corpInfo,
    }),
  },
  methods: {
    handleShow() {
      this.status = true
      if (!Object.keys(this.tempUserDetail).length) {
        this.timer = setTimeout(() => {
          if (this.uuid) {
            this.initData(this.uuid)
          }
        }, 100)
      }
    },
    handleClose() {
      this.status = false
    },
    initData(uuid) {
      this.$store
        .dispatch('user/getDetail', uuid)
        .then((res) => {
          this.tempUserDetail = res
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: inline-block;
  margin-right: 3px;
  margin-bottom: 3px;
}
</style>