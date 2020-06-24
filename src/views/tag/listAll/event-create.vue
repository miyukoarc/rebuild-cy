<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px" label-position="left">
      <el-form-item label="标签组名称" :prop="'tagList.groupName'" :rules="rules.groupName">
        <el-input v-model.trim="form.groupName" maxlength="15">
          <span slot="suffix">{{form.groupName.length}}/15</span>
        </el-input>
      </el-form-item>
      <!-- <el-form-item label="标签名称">
                <el-input v-model="form.groupName"></el-input>
      </el-form-item>-->
      <div v-show="form.tagList.length">
        <el-form-item
          v-for="(item,index) in form.tagList"
          :key="index"
          :label="`新增标签(${index+1})`"
          :prop="'tagList.'+index+'.tagName'"
          :rules="rules.tagName"
        >
          <el-input v-model.trim="form.tagList[index].tagName" maxlength="15">
            <span slot="suffix">{{form.tagList[index].tagName.length}}/15</span>
          </el-input>
        </el-form-item>
      </div>
      <el-form-item label>
        <el-button size="small" type="text" @click="handleAddTag">添加标签</el-button>
      </el-form-item>
      <!-- <el-form-item style="text-align:center;"> -->
      <div style="text-align:center;">
        <el-t-button size="small" @click="handleCancel">取 消</el-t-button>
        <el-t-button size="small" type="primary" @click="handleApply">确定</el-t-button>
      </div>

      <!-- <el-t-button size="mini" v-else>确定</el-t-button> -->
      <!-- </el-form-item> -->
      <!-- <div slot="footer"></div> -->
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      form: {
        groupName: '',
        tagList: [
          {
            tagName: ''
          }
        ]
      },
      rules: {
        groupName: [
          { required: false, message: '请输入标签组名称', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        tagName: [
          { required: true, message: '请输入标签名称', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      permissionMap: state => state.permission.permissionMap
    })
  },
  methods: {
    handleAddTag() {
      this.form.tagList.push({
        tagName: ''
      })
    },
    handleApply() {
      // const payload = this.form
      // console.log(this.form)
      let groupName
      let addTagName
      let payload
      let tagList = []

      if (this.permissionMap['tag']['tag_addTagIsAudit'].needAudit) {
        groupName = this.form.groupName

        addTagName = this.form.tagList.map(item => item.tagName).join(',')

        payload = {
          groupName,
          addTagName
        }
      } else {
        groupName = this.form.groupName

        // tagList = this.form.tagList.reduce((sum,curr)=>{[].push({tagName:curr.tagName})},[])
        this.form.tagList.forEach(item=>{
            tagList.push({tagName:item.tagName})
        })


        payload = {
          groupName,
          tagList
        }
      }

      this.closeDialog()
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('tag/addTagIsAudit', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.form = this.$options.data().form
              this.handleRefresh()
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            })
        } else {
          this.$message({
            type: 'error',
            message: '请检查输入！'
          })
          return false
        }
      })
    },
    handleCancel() {
      this.closeDialog()
    },
    closeDialog() {
      this.$parent.$parent.dialogVisible = false
    },
    handleRefresh(){
        this.$bus.$emit('handleFresh')
    }
  }
}
</script>

<style>
</style> 