<template>
  <p v-if="!userList.length" class="text-align-center">
    {{uuid}}
    <span class="tips font-es color-info user-select-none">暂无数据</span>
  </p>
  <ul v-else-if="userList.length&& !loading">
      <el-checkbox-group v-model="users" @change="handleCheck">
        <li v-for="item in userList" :key="item.uuid">
            <el-checkbox :label="item.uuid">{{item.name}}</el-checkbox>
        </li>

      </el-checkbox-group>
  </ul>

  <div v-else-if="loading" class="text-align-center" style="height:100%;display:flex;">
    <i class="el-icon-loading" style="margin:auto;"></i>
  </div>
</template>

<script>
export default {
  props: {
    uuid: {
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      userList: [],
      users: []
    }
  },
  watch: {
    uuid: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          //   console.log(newVal)
          this.initFramework(newVal)
        }
      },
    },
  },
  methods: {
    initFramework(uuid) {
      const payload = { departmentsUuid: uuid }
      this.loading = true
    //   console.log(uuid)
      this.$store
        .dispatch('user/listSelectAll', payload)
        .then((res) => {
          this.userList = res
          this.loading = false
          //   this.optionsUuid = res.map((item) => {
          //     return item.uuid
          //   })
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err || '加载失败',
          })
        })
    },
    //改变当前部门员工选项
    handleCheck(val){
        console.log(val)
    }
  },
}
</script>

<style>
</style>