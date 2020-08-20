<template>
  <el-checkbox v-bind="$attrs" v-on="event">
    <slot></slot>
  </el-checkbox>
</template>

<script>
export default {
  name: 'UnionCheckbox',
  props: {
    code: {
      type: String,
      default: 'AEC',
    },
    deps: {
      type: String,
      default: 'BEC',
    },
  },
  computed: {
    event() {
      //   console.log(this.$listeners)
      return this.$listeners
    },
  },
  created() {
    let { code, deps } = this
    // deps = deps.split(',')
    deps = this.grouping(deps)
    // console.log(arr)
    this.$store.commit('unionCheckbox/SET_DEPENDMAP', { code, deps })
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