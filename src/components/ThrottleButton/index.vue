<template>
  <div class="permission-button">
    <!-- <el-popover
      v-if="showAuth&&popAuth"
      placement="bottom"
      title="permission"
      width="300"
      trigger="hover"
    >-->
    <el-tooltip :enterable="false" v-if="showAuth&&popAuth" placement="top">
      <div slot="content">
        <!-- <div v-if="Object.keys(auth).length" class="container">
          <div v-for="(value,key) in authData" :key="key">{{key}}: {{value}}</div>
        </div>-->
        <div v-for="(item, index) in resolveAuth(authData(module,permission))" :key="index">{{item}}</div>
      </div>

      <el-button v-bind="$attrs" v-on="evet" :disabled="disabled">
        <slot></slot>
      </el-button>
    </el-tooltip>

    <!-- </el-popover> -->
    <el-button v-else v-bind="$attrs" v-on="evet" :disabled="disabled">
      <slot></slot>
    </el-button>
  </div>
</template>
<script>
import settings from '@/settings'
import { mapState } from 'vuex'
export default {
  name: 'el-t-button',
  props: {
    throttle: {
      type: Boolean,
      default: true,
    }, //节流功能
    auth: {
      type: String,
      default: '',
    },
    popAuth: {
      type: Boolean,
      defautl: false,
    },
    enable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      timer: null,
      filtedArr: [],
      disabled: false,
      module: '',
      permission: '',
    }
  },
  watch: {
    enable: {
      handler(newVal, oldVal) {
        if (newVal === true) {
          this.$watch('timer', (newV, oldV) => {
            this.disabled = !!newV
          })
        } else {
          this.disabled = true
        }
      },
      immediate: true,
    },
    auth: {
      handler(newVal, oldVal) {
        if (newVal) {
          const arr = newVal.split(',')
          this.module = arr[0]
          this.permission = arr[1]
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      permissionMap: (state) => state.permission.permissionMap,
    }),
    evet() {
      if (this.enable) {
        if (this.throttle) {
          if (this.$listeners.click) {
            this.$listeners.click = this.throat('click')
          }
        }
        return this.$listeners
      }
    },
    // disabled() {
    //   if (this.timer) {
    //     return true
    //   } else {
    //     return false
    //   }
    // },
    showAuth() {
      return settings.showAuth
    },
    // authData() {
    //   return this.auth
    // },
  },
  created() {
    //   const flag = !!(this.permissionMap[this.module] && this.permissionMap[this.module][this.permission])
    //   this.filtedArr = this.resolveAuth(this.auth)
    // console.log(flag,this.auth)
  },
  updated() {
    // this.filtedArr = this.resolveAuth(this.auth)
  },
  methods: {
    authData(module, permission) {
      return (
        this.permissionMap[module] && this.permissionMap[module][permission]
      )
    },
    throat(method) {
      const me = this
      return (...args) => {
        if (!me.timer) {
          me.$emit(method, ...args)
          me.timer = setTimeout(() => {
            me.timer = null
          }, me.$attrs.throat || 1000) //默认1s的，节流
        } else {
          me.$emit('droped', ...args) //点击太频繁的事件提示
        }
      }
    },
    resolveAuth(obj) {
      const arr = []
      for (let key in obj) {
        // arr[4] = '角色：'
        if (key === 'roles') {
          // console.log(obj['roles'])
          let str = obj['roles']
            .map((item) => {
              return item.name
            })
            .join(' ')

          //   arr[4] = `角色：${str}`
          arr.splice(4, 1, `角色：${str}`)
        }

        if (key === 'needAudit') {
          arr[3] = obj['needAudit'] ? '审核：--' : '审核：--'
          // arr.push()
        }

        if (key === 'module') {
          // arr.push()
          arr[2] = '模块：' + obj['module']
        }
        if (key === 'code') {
          arr[1] = 'code：' + obj['code']
          // arr.push()
        }
        if (key === 'title') {
          arr[0] = '名称：' + obj['title']
          // arr.push()
        }
      }
      return arr
    },
    flattenArr(arr) {
      return arr
        .map((item) => {
          return item.name
        })
        .join(' ')
    },
  },
}
</script>

<style lang="scss" scoped>
.permission-button {
  display: inline-block;
}
</style>