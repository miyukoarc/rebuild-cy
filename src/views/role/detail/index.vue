<template>
  <div>
    <div class="app-container">
      <el-card class="content-spacing">
        <tool-bar :hasExport="false" >
          <div slot="right">
            <el-t-button
              type="primary"
              :auth="permissionMap['role']['role_update']"
              :popAuth="true"
              @click.stop="handleConfirm"
            >{{permissionMap['role']['role_update'].needAudit?'提交审核':'完成'}}</el-t-button>
          </div>
        </tool-bar>
      </el-card>
      <el-card class="content-spacing">
        <el-form v-if="Object.keys(isIndeterminate).length">
          <el-form-item
            v-for="(value, key) in permissionRenderMap"
            :key="key"
            :label="roleDetail[key]"
          >
            <el-checkbox
              :indeterminate="isIndeterminate[key]"
              v-model="checkAll[key]"
              @change="handleCheckAllChange(key)"
            >全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checked[key]" @change="handleSingleChange(key)">
              <el-checkbox
                v-for="item in list[key]"
                :key="item.code"
                :label="item.uuid"
              >{{item.title}}</el-checkbox>
            </el-checkbox-group>
            <el-divider></el-divider>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ToolBar from './tool-bar'
export default {
  name: 'role-detail',
  components: {
    ToolBar
  },
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
      permissionRenderMap: state => state.permission.permissionRenderMap,
      permissionMap: state => state.permission.permissionMap,

      roleDetail: state => state.enum.roleDetail
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
      if (this.checkAll[key] == false) {
        this.checkAll[key] = false
        this.checked[key] = []
      } else if (this.checkAll[key] == true) {
        this.checkAll[key] = true
        this.checked[key] = []
        this.list[key].map(obj => {
          this.checked[key].push(obj.uuid)
        })
      }
      this.isIndeterminate[key] = false
      console.log(
        Object.values(this.checked).reduce((sum, curr) => sum.concat(curr), [])
      )
    },
    handleSingleChange(key) {
      const checkedCount = this.checked[key].length
      this.checkAll[key] = checkedCount === this.list[key].length
      this.isIndeterminate[key] =
        checkedCount > 0 && checkedCount < this.list[key].length
    },
    doExport(){},
    hadleConfirm(){

    }

    
  }
}
</script>

<style>
</style>