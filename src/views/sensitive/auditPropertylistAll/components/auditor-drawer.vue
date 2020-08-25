<!--
 * @Author: your name
 * @Date: 2020-07-29 21:41:51
 * @LastEditTime: 2020-08-25 13:49:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\sensitive\auditPropertylistAll\components\auditor-drawer.vue
-->
<template>
  <div>
    <el-row style="margin-bottom:3px;" v-for="level in alterLevels" :key="level.level">
      <el-col :span="8">
          <span class="font-ex color-info">第{{toChineseNum(level.level)}}层</span>
          <span class="font-exs color-primary">{{level.range?'会签':'或签'}}</span>    
      </el-col>
      <el-col :span="16">
        <async-user-tag v-for="user in level.userList" :uuid="user.uuid" :key="user.uuid">
          <i class="el-icon-user-solid color-primary"></i>
          {{user.name}}
        </async-user-tag>
      </el-col>
    </el-row>
    <div class="text-align-center">
      <el-button v-if="levels.length>2" type="text" size="mini" @click="curly=!curly">
        <span class="font-exs">{{curly?'展开':'收起'}}</span>
        <i :class="[curly?'el-icon-caret-bottom':'el-icon-caret-top']"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import { toChineseNum } from '@/utils/common'
import AsyncUserTag from '@/components/AsyncUserTag'
export default {
  props: {
    levels: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  components: {
    AsyncUserTag,
  },
  data() {
    return {
      curly: false,
    }
  },
  watch: {
    levels: {
      handler(newVal, oldVal) {
        if (newVal.length > 2) {
          this.curly = true
        } else {
          this.curly = false
        }
      },
      immediate: true,
    },
  },
  computed: {
    alterLevels() {
      return this.curly ? this.levels.slice(0, 2) : this.levels
    },
  },
  methods: {
    alterUsers(arr) {
      return this.curly ? this.arr.slice(0, 2) : this.arr
    },
    toChineseNum(num) {
      return toChineseNum(num)
    },
  },
}
</script>

<style>
</style>