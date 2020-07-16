<!--
 * @Author: your name
 * @Date: 2020-07-15 11:38:19
 * @LastEditTime: 2020-07-15 19:14:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\message\singleListAll\components\ChatTabBar.vue
--> 
<template>
  <section class="chat-tab-bar">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(tab,index) in tabs" :key="index" :label="tab.label" :name="tab.name">
        <!-- <div v-if="listData.length>0">
          <div v-for="(list,listIndex) in listData" :key="listIndex" class="allChat clearfix">
            <keep-alive>
              <component
                :is="list.msgType+'Component'"
                :key="listIndex"
                :item="list"
                :to-user-id="toUserId"
                :from-user-id="fromUserId"
              />
            </keep-alive>
          </div>
        </div>
        <div v-if="listData.length<=0" class="no-data">暂无数据</div> -->
      </el-tab-pane>
    </el-tabs>
    <div class="search-form" style="margin-top:5px">
      <chat-search @handleSearch="handleSearch" @handleRefresh="handleRefresh"></chat-search>
    </div>
  </section>
</template>

<script>
import ChatSearch from "./ChatSearch.vue";

export default {
  components: {
    ChatSearch
  },
  data() {
    return {
      // 聊天内容
      activeName: "all",
      tabs: [
        {
          label: "全部",
          name: "all"
        },
        {
          label: "文件",
          name: "file"
        },
        {
          label: "链接",
          name: "link"
        },
        {
          label: "图片",
          name: "image"
        },
        {
          label: "视频",
          name: "video"
        },
        {
          label: "语音",
          name: "voice"
        },
        {
          label: "视频语音通话",
          name: "voiceVideo"
        }
      ]
    };
  },
  methods: {
    handleClick() {},
    handleSearch(val) {
      const { userName, departmentsUuid, roleUuid } = val;
      this.query.userName = userName ? userName : userName;
      this.query.departmentsUuid = departmentsUuid
        ? departmentsUuid
        : departmentsUuid;
      this.query.roleUuid = roleUuid ? roleUuid : roleUuid;
      console.log(val, "handleSearch");
      this.initDataList(this.query);
    },
    handleRefresh() {
      console.log("handleRefresh");
      this.query = this.$options.data().query;
      this.initDataList(this.query);
    },
    resetForm() {
      console.log("重置");
      this.searchFrom = {
        keyword: "",
        planStatu: null
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-tab-bar {
  position: relative;
  .search-form {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>