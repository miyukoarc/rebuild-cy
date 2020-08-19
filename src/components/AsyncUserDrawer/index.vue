<template>
  <div class="container-user-tag">
    <div class="text-align-left">
      <!-- <div v-if="hasPop"> -->
      <!-- <el-tooltip v-for="item in alterUsers" :key="item.uuid" :enterable="true"  placement="right">
                <div slot="content">
                    <div v-for="(value,key) in item" :key="key">
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
                <el-tag style="margin:0 0 3px 0;" type="info" size="small" ><i class="el-icon-user-solid"></i>{{item.name}}</el-tag>
      </el-tooltip>-->
      <!-- <keep-alive> -->

      <async-user-tag
        size="small"
        v-for="item in alterUsers"
        type="info"
        :key="item.uuid"
        :uuid="item.uuid"
         effect="plain"
      >
        <i class="el-icon-user-solid color-primary"></i>
        {{item.name}}
      </async-user-tag>
      <!-- </keep-alive> -->

      <!-- <user-tag v-for="item in alterUsers" :user="item" :key="item.uuid" :hasPop="hasPop"></user-tag> -->
      <!-- <slot v-for="item in alterUsers" :user="item" :key="item.uuid" :hasPop="hasPop">

      </slot>-->
      <!-- </div> -->

      <!-- <el-tag v-else style="margin:0 0 3px 0;" type="info" size="small" v-for="item in alterUsers" :key="item.uuid"><i class="el-icon-user-solid"></i>{{item.name}}</el-tag> -->
    </div>

    <div class="text-align-center" v-show="total>1">
      <span class="font-exs color-info">共{{total}}人</span>
      <el-button v-if="users.length>2" type="text" size="mini" @click="curly=!curly">
        展开
        <i :class="[curly?'el-icon-caret-bottom':'el-icon-caret-top']"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
// import UserTag from '@/components/UserTag'
import AsyncUserTag from '@/components/AsyncUserTag'
export default {
  name: 'async-user-drawer',
  props: {
    users: {
      type: Array,
      default: () => {
        return []
      }
    },
    hasPop: {
      type: Boolean,
      default: false
    }
  },
  components: {
    AsyncUserTag
  },
  data() {
    return {
      curly: false
    }
  },
  watch: {
    users: {
      handler(newVal, oldVal) {
        if (newVal.length > 2) {
          this.curly = true
        } else {
          this.curly = false
        }
      },
      immediate: true
    }
  },
  computed: {
    total() {
      return this.users.length
    },
    alterUsers() {
      if (this.curly) {
        return this.users.slice(0, 2)
      } else {
        return this.users
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container-user-tag {
  max-width: 160px;
}
</style>