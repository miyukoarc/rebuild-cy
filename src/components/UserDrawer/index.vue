<template>
  <div class="container-user-tag">
    <div class="text-align-center">
      <user-tag v-for="item in alterUsers" :user="item" :key="item.uuid" :hasPop="hasPop"></user-tag>
    </div>

    <div class="text-align-center">
      <span class="font-exs color-info">等{{total}}人</span>
      <el-button type="text" size="mini" @click="curly=!curly">
        展开
        <i :class="[curly?'el-icon-caret-bottom':'el-icon-caret-top']"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import UserTag from '@/components/UserTag'
export default {
  props: {
    users: {
      type: Array
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
    }
  },
  watch: {
    users: {
      handler(newVal, oldVal) {
        // console.log(newVal)
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
  max-width: 150px;
}
</style>