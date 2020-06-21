<template>
  <div class="permission-button">
    <!-- <el-popover
      v-if="showAuth&&popAuth"
      placement="bottom"
      title="permission"
      width="300"
      trigger="hover"
    >-->
    <el-tooltip v-if="showAuth&&popAuth" placement="top">
      <div slot="content">
        <!-- <div v-if="Object.keys(auth).length" class="container">
          <div v-for="(value,key) in authData" :key="key">{{key}}: {{value}}</div>
        </div> -->
        <div v-for="(item, index) in resolveAuth(authData)" :key="index">
              {{item}}
          </div>

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
export default {
  name: 'el-t-button',
  props: {
    throttle: {
      type: Boolean,
      default: false
    }, //节流功能
    auth: {
      type: Object,
      default: () => {}
    },
    popAuth: {
      type: Boolean,
      defautl: false
    }
  },
  computed: {
    evet() {
      if (this.throttle) {
        if (this.$listeners.click) {
          this.$listeners.click = this.throat('click')
        }
      }
      return this.$listeners
    },
    disabled() {
      if (this.timer) {
        return true
      } else {
        return false
      }
    },
    showAuth() {
      return settings.showAuth
    },
    authData() {
      return this.auth
    }
  },
  data() {
    return {
      timer: null
    }
  },
  methods: {
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
    resolveAuth(obj){
        const arr = []
        for(let key in obj){
            arr[4] ='角色：'
            if(key==='roles'){
                arr[4] = '角色：'+obj['roles'][0].name
            }
            
            
            if(key==='module'){
                // arr.push()
                arr[2] = '模块：'+obj['module']
            }
            if(key==='needAudit'){
                arr[3] = obj['needAudit']?'审核：需要审核':'审核：不需要审核'
                // arr.push()
            }
            
            if(key==='code'){
                arr[1] = 'code：'+obj['code']
                // arr.push()
            }
            if(key==='title'){
                arr[0] = '名称：'+obj['title']
                // arr.push()
            }
        }
        return arr
    }
  }
}
</script>

<style lang="scss" scoped>
.permission-button {
  display: inline-block;
}
</style>