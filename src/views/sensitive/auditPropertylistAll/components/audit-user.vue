<template>
  <div>
    <div v-for="level in alterAuditUsers" :key="level.level">
      <el-row>
        <el-col :span="12">
          <div></div>
        </el-col>
        <el-col :span="12">
          <async-user-tag
            size="small"
            v-for="item in level.userList"
            type="info"
            :key="item.uuid"
            :uuid="item.uuid"
          >
            <i class="el-icon-user-solid"></i>
            {{item.name}}
          </async-user-tag>
        </el-col>
      </el-row>
    </div>

    <div class="text-align-center" v-show="alterAuditUsers.length<1">
      <el-button v-if="users.length>2" type="text" size="mini" @click="curly=!curly">
        <i :class="[curly?'el-icon-caret-bottom':'el-icon-caret-top']"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import AsyncUserTag from '@/components/AsyncUserTag'
import toChinesNum from '@/utils/common'
export default {
  props: {
    auditUsers: {
      type: Array,
      default: () => {
        return []
      }
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
    auditUsers: {
      handler(newVal, oldVal) {
        if (newVal.length > 2) {
          this.curly = true
        } else {
          this.curly = false
        }
      },immediate: true
    },
  },
  computed:{
      alterAuditUsers(){
        if(this.curly){
            return this.auditUsers.slice(0,2)
        }else{
            return this.auditUsers
        }
      }
  },
  methods: {
      toChinesNum(num){
          return toChinesNum(num)
      }
  }
}
</script>

<style>
</style>