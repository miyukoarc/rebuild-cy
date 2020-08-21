<template>
  <el-checkbox ref="self" v-bind="$attrs" v-on="event">
    <slot></slot>
  </el-checkbox>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UnionCheckbox',
  props: {
    code: {
      type: String,
      default: '',
    },
    deps: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      module: '',
      selfDeps: {},
    }
  },
  computed: {
    event() {

    //   this.checkPermission()
      return this.$listeners
    },
    ...mapState({
      dependMap: (state) => state.unionCheckbox.dependMap,
      dependencyMap: (state) => state.unionCheckbox.dependencyMap,
    }),
  },
  created() {
    let { code, deps } = this
    this.module = code.split('_')[0] //解析自己属于哪个module

    if (deps) {
      deps = this.grouping(deps)
      this.$store.commit('unionCheckbox/SET_DEPENDMAP', { code, deps })
    }

    if (!this.dependencyMap[this.module]) {
      console.log('不存在模块')
      this.$store.commit('unionCheckbox/SET_DEPENDENCY_MODULE', deps)
    } else {
      console.log('存在模块')

    //   if (this.dependencyMap[this.module].includes(this.code)) {
    //     console.log('存在权限')
    //   } else {
    //     console.log('不存在权限')
    //     this.$store.commit('unionCheckbox/SET_DEPENDENCY_PERMISSION', {
    //       module: this.module,
    //       code: this.code,
    //     })
    //   }
    }
  },
  mounted() {
  },
  methods: {
    grouping(str) {
      let temp = {}
      if (str) {
        let arr = str.split(',')
        arr.forEach((item) => {
          const group = item.split('_')[0]
          if (!temp[group]) {
            Object.defineProperty(temp, group, {
              writable: true,
              value: [],
              configurable: true,
              enumerable: true,
            })
          }

          temp[group].push(item)
        })
      }
      return temp
    },
    checkPermission() {
        if(this.dependencyMap[this.module]){
            console.log(this.dependencyMap[this.module].includes(this.code))
            if(this.dependencyMap[this.module].includes(this.code)){
                console.log(this.$refs.self)
                this.$refs.self.checked = true
            }

        }
    //   console.log(this.dependencyMap[this.module].includes(this.code))
    },
  },
}
</script>

<style>
</style>