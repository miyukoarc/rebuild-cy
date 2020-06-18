<template>
  <div class="app-container fill">
    <el-card class="content-spacing">
      <list-header></list-header>
    </el-card>

    <el-card class="content-spacing">
      <el-button size="small" @click="handleCreate" type="primary">添加标签组</el-button>
    </el-card>

    <el-card class="content-spacing table-container">
      <el-table
        :data="tagList"
        v-loading="loading"
        stripe
        lazy
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="标签组名" prop="groupName"></el-table-column>

        <el-table-column label="标签" min-width="600px">
          <template v-slot="scoped">
            <div>
              <el-tag
                v-for="item in scoped.row.tags"
                :key="item.uuid"
                class="tag-item"
                type="primary"
              >{{item.tagName}}</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template v-slot="scoped">
            <div>
              <el-t-button size="small" type="primary" @click="handleEdit(scoped.$index,scoped.row)">编辑</el-t-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      
      <form-dialog ref="formDialog" />
    </el-card>
  </div>
</template>

<script>
import Header from './header'
import { mapState } from 'vuex'
import FormDialog from './dialog'
export default {
  components: {
    FormDialog,
    'list-header': Header
  },
  data() {
    return {
      pageConfig: {
        total: 0,
        pageNumber: 0,
        pageSize: 10
      },
      query: {
          groupName:'',
          page: 0,
          size: 200,
          tagName: ''
      }

    }
  },
  computed: {
    ...mapState({
      loading: state => state.tag.loading,
      tagList: state => state.tag.tagList,
      tagListPage: state => state.tag.tagListPage
    })
  },
  created() {
    this.initData(this.query)
    
  },
  mounted(){
    this.$bus.$on('search',res=>{
        console.log(res)
        const {groupName,tagName} = res
        this.query.groupName = groupName
        this.query.tagName = tagName
        this.initData(this.query)
    })
    this.$bus.$on('refresh',res=>{
        this.query = this.$options.data().query//初始化query
        this.initData(this.query)
    })
    this.$bus.$on('handleFresh',res=>{
        console.log('handleFresh')
        this.initData(this.query)
    })
  },
  beforeDestroy(){
      this.$bus.$off('search')
      this.$bus.$off('refresh')
      this.$bus.$off('handleFresh')
  },
  methods: {
    initData(payload) {
      this.pageConfig.total = this.tagListPage.total
      this.pageConfig.pageNumber = this.tagListPage.pageNumber
      this.$store
        .dispatch('tag/getTagList',payload)
        .then(() => {})
        .catch(err => {
          this.$message({
            type: 'error',
            message: '初始化失败'
          })
        })
    },

    handleSelectionChange() {},
    changePage() {},
    handleCreate() {
      //    this.$bus.$emit('showDialog')
      this.$refs['formDialog'].eventType = 'AddComponent'
      this.$refs['formDialog'].event = 'add'
      this.$refs['formDialog'].dialogVisible = true
    },
    handleEdit(index,row) {
        console.log(index ,row)
      // this.$bus.$emit('showDialog',{type:'edit'})
      // this.$bus.$emit('showDialog')
      const payload = this.tagList[index]
    //   
    //   console.log(payload)
      this.$store.commit('tag/SAVE_GROUP', payload)
      
      this.$refs['formDialog'].eventType = 'EditComponent'
      this.$refs['formDialog'].event = 'edit'
      this.$refs['formDialog'].dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  .pager {
    padding: 20px 0;
    text-align: center;
  }
}

.tag-item {
  margin-right: 10px;
}
.fill {
  height: calc(100% - 84px);
  display: flex;
  flex-direction: column;
}

.table-container {
  flex: 1;
}
</style>