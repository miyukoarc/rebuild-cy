<!--
 * @Author: your name
 * @Date: 2020-07-29 21:41:51
 * @LastEditTime: 2020-08-31 11:42:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\sensitive\auditPropertylistAll\components\audit-user.vue
-->
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
            <i class="el-icon-user-solid color-primary"></i>
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
import AsyncUserTag from "@/components/AsyncUserTag";
import { toChineseNum } from "@/utils/common";
export default {
  props: {
    auditUsers: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: {
    AsyncUserTag,
  },
  data() {
    return {
      curly: false,
    };
  },
  watch: {
    auditUsers: {
      handler(newVal, oldVal) {
        if (newVal.length > 2) {
          this.curly = true;
        } else {
          this.curly = false;
        }
      },
      immediate: true,
    },
  },
  computed: {
    alterAuditUsers() {
      if (this.curly) {
        return this.auditUsers.slice(0, 2);
      } else {
        return this.auditUsers;
      }
    },
  },
  methods: {
    toChineseNum(num) {
      return toChineseNum(num);
    },
  },
};
</script>

<style>
</style>