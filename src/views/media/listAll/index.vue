<template>
  <div class="app-container">
    <el-card class="content-spacing">
      <list-header
        @handleSearch="handleSearch"
        @handleRefresh="handleRefresh"
      ></list-header>
    </el-card>

    <el-row>
      <el-col :span="5">
        <el-card class="content-spacing" style="min-height:66vh;margin-right:20px;">
          <div style="margin-bottom:20px;">
            <el-t-button :popAuth="true" :auth="permissionMap['mediaGroup']['mediaGroup_add']" size="mini" @click.stop="handleCreateGroup">添加分组</el-t-button>
          </div>
          <el-table
            v-loading="loading"
            :data="groupListAll"
            style="width: 100%"
            stripe
            lazy
            highlight-current-row
            :show-header="false"
          >
            <!-- <el-table-column type="selection"></el-table-column> -->
            <el-table-column prop="groupName"></el-table-column>
            <el-table-column align="right">
              <template v-slot="scope">
                <div>
                  <el-t-button
                    type="text"
                    size="mini"
                    :popAuth="true"
                    :auth="permissionMap['mediaGroup']['mediaGroup_rename']"
                    @click.stop="handleEditGroup"
                    >修改</el-t-button
                  >
                  <el-t-button
                    type="text"
                    size="mini"
                    :popAuth="true"
                    :auth="permissionMap['mediaGroup']['mediaGroup_delete']"
                    @click.stop="handleDeleteGroup"
                    >删除</el-t-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="19">
        <el-card class="content-spacing" style="min-height:66vh;">
          <el-tabs v-model="activeName">
          <el-tab-pane lazy label="文本" name="first">文本</el-tab-pane>
          <el-tab-pane lazy label="图片" name="second">图片</el-tab-pane>
          <el-tab-pane lazy label="视频" name="third">视频</el-tab-pane>
          <el-tab-pane lazy label="文章" name="fourth">文章</el-tab-pane>
          <el-tab-pane lazy label="文件" name="fifth">文件</el-tab-pane>
        </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ListHeader from "./header";
import { mapState } from "vuex";
export default {
  components: {
    ListHeader
  },
  data() {
    return {
      activeName: 'first'
    };
  },
  computed: {
    ...mapState({
      groupListAll: state => state.media.mediaGroupListAll,
      loading: state => state.media.loading,

      permissionMap: state => state.permission.permissionMap
    })
  },
  created() {
    this.initDataList();
  },
  methods: {
    initDataList() {
      this.$store
        .dispatch("media/getMediaGroupListAll")
        .then(() => {})
        .catch(err => {
          this.$message({
            type: "error",
            message: "初始化失败" || err
          });
        });
    },
    handleEditGroup() {},
    handleDeleteGroup() {},
    handleSearch() {},
    handleRefresh() {},
    handleCreateGroup(){}
  }
};
</script>

<style></style>
