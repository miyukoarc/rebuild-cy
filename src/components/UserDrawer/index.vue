<!--
 * @Author: your name
 * @Date: 2020-07-05 18:04:25
 * @LastEditTime: 2020-07-06 15:16:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\components\UserDrawer\index.vue
--> 
<template>
  <div class="container-user-tag">
    <div>
      <user-tag v-for="item in alterUsers" :user="item" :key="item.uuid" :hasPop="hasPop"></user-tag>
    </div>

    <div class="text-align-center" v-if="total>2">
      <span class="font-exs color-info">等{{total}}人</span>
      <el-button type="text" size="mini" @click="curly=!curly">
        展开
        <i :class="[curly?'el-icon-caret-bottom':'el-icon-caret-top']"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import UserTag from "@/components/UserTag";
export default {
  props: {
    users: {
      type: Array,
      default: () => {
        return [];
      }
    },
    hasPop: {
      type: Boolean,
      default: false
    }
  },
  components: {
    UserTag
  },
  data() {
    return {
      curly: false
    };
  },
  watch: {
    users: {
      handler(newVal, oldVal) {
        // console.log(newVal)
        if (newVal) {
          if (newVal.length > 2) {
            this.curly = true;
          } else {
            this.curly = false;
          }
        }
      },
      immediate: true
    }
  },
  computed: {
    total() {
      return this.users.length;
    },
    alterUsers() {
      if (this.curly) {
        return this.users.slice(0, 2);
      } else {
        return this.users;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container-user-tag {
  max-width: 160px;
}
</style>