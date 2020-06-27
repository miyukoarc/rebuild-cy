<template>
  <div>

      
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="grid-box1">
            <el-row type="flex" class="grid-box">
              <el-col v-for="(key, value) in dataObj" :key="key">
                <div class="number">{{ value }}</div>
                <div class="type">{{ key }}</div>
              </el-col>
            </el-row>
          </div>
          <!-- <grid :grid-data="GridData1" /> -->
        </el-col>
        <!-- <el-col :span="14">
          <div class="grid-box1">
            <el-row type="flex" class="grid-box">
              <el-col v-for="(item, index) in GridData" :key="index">
                <div class="number">{{ item.num }}</div>
                <div class="type">{{ item.type }}</div>
              </el-col>
            </el-row>
          </div>
        </el-col> -->
      </el-row>

  </div>
</template>

<script>
export default {
    name: 'statistics-board',
    props:{
        dataObj: {
            type: Object
        }
    },
  data() {
    return {
      GridData: []
    };
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
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
