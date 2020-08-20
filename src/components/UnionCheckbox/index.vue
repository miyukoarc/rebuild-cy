<template>
  <el-checkbox v-bind="$attrs" v-on="event">
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
  data(){
      return {
          module: '',
      }
  },
  computed: {
    event() {
        console.log(this.$listeners)
    //   if(this.$listeners.change){
    //       console.log(this.code)
    //   }
      return this.$listeners
    },
    ...mapState({
        dependMap: state => state.unionCheckbox.dependMap,
        dependencyMap: state => state.unionCheckbox.dependencyMap
    })
  },
  created() {
    let { code, deps } = this
    this.module = code.split('_')[0]//解析自己属于哪个module

    if (deps) {
      deps = this.grouping(deps)
      this.$store.commit('unionCheckbox/SET_DEPENDMAP', { code, deps })
    }

    if(!this.dependencyMap[this.module]){
        console.log('不存在模块')
    }else{
        
    }

    // console.log(arr)
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
      console.log(temp)
      return temp
    },
  },
}
</script>

<style>
</style>