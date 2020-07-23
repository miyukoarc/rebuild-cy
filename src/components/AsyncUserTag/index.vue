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
                    <div>XX部门</div>
                  </el-col>
                </el-row>
                <el-row style="margin-bottom:10px;">
                  <el-col :span="6">
                    <div>部门</div>
                  </el-col>
                  <el-col :span="18">
                    <div v-if="tempUserDetail.departments">{{tempUserDetail.departments[0].name}}</div>
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
        <el-tag v-bind="$attrs">
          <slot></slot>
        </el-tag>
      </el-tooltip>
      <el-tag v-else v-bind="$attrs">
        <slot></slot>
      </el-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'async-user-tag',
  props: {
    hasPop: {
      type: Boolean,
      default: true
    }, //tooltip开关
    uuid: {
      type: Number
    }
  },
  data() {
    return {
      status: false,
      watchFlag: false,
      tempUserDetail: {},
      timer: null
    }
  },
  watch: {
    //   propsData:{
    //       handler(newVal,oldVal){
    //           console.log('watcher')
    //           if(Object.keys(newVal).length&&this.watchFlag){
    //               console.log('有值')
    //           }else{
    //               console.log('空值')
    //           }
    //       },
    //     //   immediate:true
    //   }
  },
  methods: {
    handleShow() {
      this.status = true
      if (!Object.keys(this.tempUserDetail).length) {
        this.timer = setTimeout(() => {
          if (this.uuid) {
            console.log('请求')
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
        .then(res => {
          this.tempUserDetail = res
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: inline-block;
  margin-right: 3px;
}
</style>