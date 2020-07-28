<template>
  <div>
    <div class="app-container">
      <el-card class="content-spacing">
        <tool-bar :hasExport="false">
          <div slot="right">
            <el-t-button
              type="primary"
              :auth="permissionMap['role']['role_update']"
              :popAuth="true"
              @click.stop="handleConfirm"
            >{{auditSetting['permission']?'提交审核':'完成'}}</el-t-button>
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
      form: {
        roleUuid: null,
        permissionUuids: []
      }
    }
  },
  computed: {
    ...mapState({
      permissionRenderMap: state => state.permission.permissionRenderMap,
      permissionMap: state => state.permission.permissionMap,
      auditSetting: state => state.sensitive.auditSetting,

      roleDetail: state => state.enum.roleDetail
    })
  },
  created() {
    const roleCode = this.$route.query.code
    this.form.roleUuid = +this.$route.params.uuid
    this.initData().then(() => {
      this.initDetail({ roleCode })
    })
  },
  mounted() {},
  methods: {
    initDetail(payload) {
      this.$store
        .dispatch('permission/getRolePermissionList', payload)
        .then(res => {
          for (let key in res) {
            res[key].forEach(item => {
              this.checked[key].push(item.uuid)
            })

            if (res[key].length == this.list[key].length) {
              this.checkAll[key] = true
            }
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err || '初始化失败'
          })
        })
    },
    initData() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch('permission/getListAll')
          .then(res => {
            for (let key in res) {
              this.$set(this.checkAll, key, false)
              this.$set(this.isIndeterminate, key, false)
              // const arr = new Array(res[key].length).fill(0)
              this.$set(this.checked, key, [])

              // const arr = res[key].map(item=)
              this.$set(this.list, key, res[key])
            }
            resolve(res)
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: err || '初始化失败'
            })

            reject(err)
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
    },
    handleSingleChange(key) {
      const checkedCount = this.checked[key].length
      this.checkAll[key] = checkedCount === this.list[key].length
      this.isIndeterminate[key] =
        checkedCount > 0 && checkedCount < this.list[key].length
    },
    doExport() {},
    handleConfirm() {
      const permissionUuids = Object.values(this.checked).reduce(
        (sum, curr) => {
          return sum.concat(curr)
        },
        []
      )

      this.form.permissionUuids = permissionUuids

      //   const payload = await this.form

      this.$store
        .dispatch('permission/roleLinkPermissionIsAudit', this.form)
        .then(res => {
          const message = this.auditSetting['permission']
            ? '已提交审核'
            : '已完成'
          this.$message({
            type: 'success',
            message: message
          })
          const roleCode = this.$route.query.code
          this.initDetail({ roleCode })
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err || '操作失败'
          })
        })
    }
  }
}
</script>

<style>
</style>