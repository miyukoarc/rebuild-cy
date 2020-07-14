<template>
  <div>
          <board-header
      @selectAll="handleSelectAll"
      @batchTransfer="handleBatchTransfer"
      @batchDelete="handleBatchDelete"
      @addMedia="handleAddMedia"
    ></board-header>
      <div class="btn-container">
          <el-table
            v-loading="loading"
            :data="listAll"
            ref="mediaGroupTable"
            style="width: 100%"
            lazy
            highlight-current-row
            :show-header="true"
          >
            <el-table-column label="创建人">
                <template v-slot="scope">
                    <div>
                        {{scope.row.creator.name}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="内容" prop="content">
            </el-table-column>
            <el-table-column label="创建时间" prop="createdAt">
            </el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <!-- <el-t-button type="text" @click.stop="handleEdit(scope.$index)">编辑</el-t-button> -->
                    <el-t-button type="text" @click.stop="handleDelete(scope.$index)">删除</el-t-button>
                </template>
            </el-table-column>
          </el-table>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import BoardHeader from './board-header'
export default {
    components:{
        BoardHeader
    },
    data(){
        return {
        }
    },
    computed:{
        ...mapState({
            loading: state => state.media.loading,
            permissionMap: state => state.permission.permissionMap,
            listAll: state => state.media.textListAll
        }),
    },
    methods: {
        handleEdit(index){
            const payload = this.listAll[index]
            this.$emit('handleEditText',payload)
        },
        handleDelete(index){
            const payload = this.listAll[index]
            this.$emit('handleDeleteText',payload)
        },
        handleSelectAll() {},
        handleBatchTransfer() {},
        handleBatchDelete() {},
        handleAddMedia() {
            this.$emit('handleCreateText')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>