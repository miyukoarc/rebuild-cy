<template>
  <div>
    <div v-show="showDepartment">
      <div v-for="(item,index) in list" :key="index">{{item.name}}</div>
    </div>
    <div class="text-align-center">
      <el-button size="mini" type="text" @click.stop="handleToggle">
        部门
        <i
          :class="[
                  showDepartment ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
                ]"
        ></i>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    index:{
        type: Number,
        default:0
    }
  },
  data() {
    return {
      showDepartment: true
    }
  },
  watch:{
  },
  methods: {
      handleToggle(){
          const index = this.index
          const status = !this.showDepartment 
          this.$emit('handleToggle',{index,status})
      }
  }
}
</script>

<style>
</style>