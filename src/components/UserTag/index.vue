<template functional>
  <div class="user-tooltip-container">
    <!-- <div v-if="hasPop"> -->
    <el-tooltip v-if="hasPop" :enterable="true" placement="right">
      <div slot="content">
        <div v-for="(value, key) in user" :key="key">
          <el-row style="width:200px">
            <el-col :span="6" v-if="key==='avatar'">
              <el-image :src="value" style="width:36px;height:36px;"></el-image>
            </el-col>
            <el-col :span="18" v-if="key==='avatar'">
              <el-row style="margin-bottom:10px;">
                <el-col :span="6">
                  <div>公司</div>
                </el-col>
                <el-col :span="18">
                  <div>XXX有限公司</div>
                </el-col>
              </el-row>
              <el-row style="margin-bottom:10px;">
                <el-col :span="6">
                  <div>部门</div>
                </el-col>
                <el-col :span="18">
                  <div>酱油部</div>
                </el-col>
              </el-row>
              <el-row style="margin-bottom:10px;">
                <el-col :span="6">
                  <div>角色</div>
                </el-col>
                <el-col :span="18">
                  <div>员工</div>
                </el-col>
              </el-row>
              <el-row style="margin-bottom:10px;">
                <el-col :span="6">
                  <div>手机</div>
                </el-col>
                <el-col :span="18">
                  <div>13300000001</div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-tooltip>
    <el-tag v-else style="margin:0 0 3px 0;" type="info" size="small">
      <i class="el-icon-user-solid"></i>
      {{user.name}}
    </el-tag>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {}
    },
    hasPop: {
        type: Boolean,
        default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.user-tooltip-container {
  display: inline-block;
}
</style>