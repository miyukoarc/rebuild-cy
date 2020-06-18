<template functional>
  <div>
    <div class="grid-box1">
      <el-row type="flex" class="grid-box">
        <el-col v-for="(item,index) in GridData" :key="index">
          <div class="number">{{ item.num }}</div>
          <div class="type">{{ item.type }}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default{
  props:{
    GridData:Array
  }
}
</script>

<style scoped>
.grid-box {
  border-radius: 4px;
  padding: 20px 0;
  background: #ecf5ff;
  border: 1px solid #8cc5ff;
}
.number {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
.type {
  text-align: center;
  font-size: 14px;
  color: #666;
}
</style>
