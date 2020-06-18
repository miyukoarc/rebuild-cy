<template>
  <div>
      <el-button type="primary" @click="actionExport" v-if="hasExport">导出Excel</el-button>
      <el-button type="primary" @click="actionImport" v-if="hasImport">导入Excel</el-button>
        <span>{{msg}}</span>

        <div class="float-right">
            <slot name="right"></slot>
        </div>
  </div>
</template>

<script>
export default {
    props: {
        msg: {
            type: String
        },
        hasExport:{
            type: Boolean,
            default: true
        },
        hasImport: {
            type: Boolean,
            default: false
        }
    },
    methods:{
        actionExport(){
            this.$emit('handleExport','导出')
        },
        actionImport(){
            this.$emit('handleImport','导入')
        }
    }

}
</script>

<style lang="scss" scoped>
.float-right{
    float:right;
}
</style>