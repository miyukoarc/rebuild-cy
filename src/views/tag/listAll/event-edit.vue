<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px" label-position="left">
      <div class="cell-container">
        <el-form-item class="form-item-container" label="标签组名称" prop="tagList.groupName" :rules="rules.groupName">
          <el-input v-model="form.groupName" maxlength="15"></el-input>
        </el-form-item>
        <div class="operate-container">
          <el-button size="small" type="text" @click="handleDeleteGroup">删除组</el-button>
        </div>
      </div>

      <!-- <el-form-item label="标签名称">
                <el-input v-model="form.groupName"></el-input>
      </el-form-item>-->
      <div v-show="form.tagList.length">
        <div class="cell-container" v-for="(item,index) in form.tagList" :key="index">
          <el-form-item class="form-item-container" :label="`标签名称(${index+1})`" :prop="'tagList.'+index+'.tagName'" :rules="rules.tagName">
            <el-input v-model="form.tagList[index].tagName" maxlength="15"></el-input>
          </el-form-item>

          <div class="operate-container">
            <el-button size="mini" type="danger" @click="handleDelete(index)">删除</el-button>
          </div>
        </div>
      </div>
      <el-form-item label>
        <el-button size="small" type="text" @click="handleAddTag">添加标签</el-button>
      </el-form-item>

      <!-- <el-form-item   label> -->
          <div style="text-align:center;">
              <el-t-button size="small" @click="handleCancel">取消</el-t-button>
        <el-t-button size="small" type="primary" @click="handleEdit">确定</el-t-button>
          </div>
        
      <!-- </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    inject: ['reload'],
  data() {
    return {
      form: {
        groupId: '',
        groupName: '',
        tagList: [
          {
            tagName: '',
            tagId: ''
          }
        ]
      },
      rules: {
        groupName: [
          { required: true, message: '请输入标签组名称', trigger: 'blur' },
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
      currentGroup: state => state.tag.currentGroup
    })
  },
  watch: {
    currentGroup: {
      handler(newVal, oldVal) {
        this.form.groupName = newVal.groupName
        this.form.groupId = newVal.groupId
        this.form.sort = newVal.sort
        this.$set(
          this.form,
          'tagList',
          newVal.tags.map(item => {
            return { tagId: item.tagId, tagName: item.tagName }
          })
        )

        //   console.log()
      },
      deep: true,
      immediate: true
    }
  },
  
  methods: {
    handleAddTag() {
      this.form.tagList.push({
        tagName: ''
      })
    },
    handleCancel() {
      this.closeDialog()
    },
    handleEdit() {
      console.log(this.form)
      this.closeDialog()
      this.$store
        .dispatch('tag/updateTagIsAudit', this.form)
        .then(() => {
          this.$message({
            type: 'success',
            message: '操作成功',
          })
          this.reload()
        //   this.handleFresh()
        })
        .catch(err => {
          
          this.$message({
            type: 'error',
            message: '操作失败',
          })
        })
        
    },
    handleDelete(index) {
        console.log(this.form.tagList.splice(index,1))

    },
    closeDialog() {
      this.$parent.$parent.dialogVisible = false
    },
    handleDeleteGroup() {
      this.$confirm('是否删除当前标签组', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const groupId = this.form.groupId
          const groupName = this.form.groupName
          const tagIds = this.form.tagList.map(item => {
            return item.tagId
          })
          const payload = {
            groupId,
            groupName,
            tagIds
          }

          this.closeDialog()

          this.$store
            .dispatch('tag/deleteTagIsAudit', payload)
            .then(() => {
              this.$message({
                type: 'success',
                message: '操作成功',
              })
            
            this.reload()
            //   this.handleFresh()
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '操作失败',
              })
              
            })

            this.form = this.$options.data().form

            
        })
        .catch(err => {
          
        })
    },
    handleFresh(){
        this.$bus.$emit('handleRequset')
    }
  }
}
</script>

<style lang="scss" scoped>
.cell-container {
  display: flex;
  .form-item-container {
    flex: 1;
  }
}
.operate-container {
  margin-left: 10px;
  line-height: 40px;
}
</style>