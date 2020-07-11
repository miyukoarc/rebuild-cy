<template>
  <div>
      <div class="btn-container">
          <el-table
            v-loading="loading"
            :data="listAll"
            ref="mediaGroupTable"
            style="width: 100%"
            lazy
            highlight-current-row
            :show-header="true"
             header-row-class-name="el-table-header"
          >
            <el-table-column label="创建人">
                <template v-slot="scope">
                    <div>
                        {{scope.row.creator.name}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="title">
            </el-table-column>
            <el-table-column label="描述" prop="description">
            </el-table-column>
            <el-table-column label="创建时间" prop="createdAt">
            </el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-t-button type="text" @click.stop="handleEdit(scope.$index)">编辑</el-t-button>
                    <el-t-button type="text" @click.stop="handleDelete(scope.$index)">删除</el-t-button>
                </template>
            </el-table-column>
          </el-table>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
        }
    },
    computed:{
        ...mapState({
            loading: state => state.media.loading,
            permissionMap: state => state.permission.permissionMap,
            listAll: state => state.media.articleListAll
        }),
    },
    methods: {
        handleEdit(index){
            const payload = this.listAll[index]
            this.$emit('handleEditArticle',payload)
        },
        handleDelete(index){
            const payload = this.listAll[index]
            this.$emit('handleDeleteArticle',payload)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>