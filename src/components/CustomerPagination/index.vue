<template>
  <el-pagination
    background
    class="pager"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pageConfig.total"
    :current-page.sync="pageConfig.pageNumber"
    :page-size="pageConfig.pageSize"
    :page-sizes="[10, 20, 50, 100]"
    @current-change="changePage"
    @size-change="handleSizeChange"
  />
</template>

<script>
export default {
  props: {
      pageConfig:{
          type: Object,
          default: ()=>{
              return {}
          }
      }
  },
  methods:{
      changePage(val){
          this.$emit('current-change',val)
      },
      handleSizeChange(val){
          this.$emit('size-change',val)
      }
  }
}
</script>

<style>
</style>