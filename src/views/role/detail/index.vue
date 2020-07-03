<template>
  <div>
    <div class="app-container">
      <el-card class="content-spacing">
        <el-form v-if="Object.keys(isIndeterminate).length">
          <el-form-item v-for="(value, key) in permissionRenderMap" :key="key" :label="key">
            <el-checkbox
              :indeterminate="isIndeterminate[key]"
              v-model="checkAll[key]"
              @change="handleCheckAllChange(key)"
            >全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checked[key]" @change="handleSingleChange(key)">
              <el-checkbox v-for="item in list[key]" :key="item.code">{{item.title}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'role-detail',
  data() {
    return {
      checkAll: {},
      checked: {},
      isIndeterminate: {},
      list: {},
      form: {}
    }
  },
  computed: {
    ...mapState({
      permissionRenderMap: state => state.permission.permissionRenderMap
    })
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.$store
        .dispatch('permission/getListAll')
        .then(res => {
          console.log(res)
          for (let key in res) {
              this.$set(this.checkAll, key, false)
            this.$set(this.isIndeterminate, key, false)
            // const arr = new Array(res[key].length).fill(0)
            this.$set(this.checked, key, [])

            // const arr = res[key].map(item=)
            this.$set(this.list, key, res[key])
            
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err || '初始化失败'
          })
        })
    },
    handleCheckAllChange(key) {
      console.log(key)

      if(this.checkAll[key] == false) {
        this.checkAll[key] = false
        this.checked[key] = []
      }else if(this.checkAll[key] == true) {
        this.checkAll[key] = true
        this.checked[key] = []
        this.list[key].map(obj=>{
          this.checked[key].push(obj.uuid)
        })
      }
      this.isIndeterminate[key] = false
    },
    handleSingleChange(key) {
      const checkedCount = this.checked[key].length
      this.checkAll[key] = checkedCount === this.list[key].length
      this.isIndeterminate[key] =
        checkedCount > 0 && checkedCount < this.list[key].length
    }
  }
}
</script>

<style>
</style>