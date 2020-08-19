<!--
 * @Author: your name
 * @Date: 2020-07-15 11:31:01
 * @LastEditTime: 2020-07-23 17:03:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\message\singleListAll\components\ChatSideBar.vue
--> 
<template>
  <div class="chat-side-bar">
    <!-- 侧边栏 头部信息 from -->
    <div class="chat-top-warp display-flex align-items-center">
      <img :src="singleLastListAll.avatar" alt />
      <div>
        <strong>{{singleLastListAll.name}}</strong>
      </div>
    </div>
    <!-- 侧边栏 用户 to -->
    <div class="chat-side-bar-content">
      <el-tabs v-model="activeName" @tab-click="handleClickSideBarTab">
        <div class="side-bar-search flex-between-alinecenter">
          <span style="font-size:13px" v-if="activeName == '1'">共有{{singleLastListAll.count}}位好友</span>
          <span
            style="font-size:13px"
            v-else-if="activeName == '2'"
          >共有{{singleLastListAll.friendCount}}位好友</span>
          <span style="font-size:13px" v-else>共有{{singleLastListAll.groupCount}}个群聊</span>
          <div style="width:150px">
            <!-- <el-autocomplete
              size="mini"
              class="inline-input"
              v-model="sideBarsearchValue"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="handleSelect"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-autocomplete>-->
            <el-input placeholder="请输入内容" size="mini" v-model="sideBarsearchValue">
              <i slot="prefix" class="el-input__icon el-icon-search" @click="handleClickSearch"></i>
            </el-input>
          </div>
        </div>
        <el-tab-pane v-for="(tab,index) in tabs" :key="index" :label="tab.label" :name="tab.name">
          <div v-if="chatSideData && chatSideData.length>0">
            <ul class="all-chat chat-warp" v-if="tab.name == activeName">
              <li
                class="item display-flex align-items-center"
                :class="{ 'active' : activeIdx===itemIndex ? true : false }"
                v-for="(item,itemIndex) in chatSideData"
                :key="itemIndex"
                :item="item"
                @click="handleSidebarItem(item,itemIndex,tab)"
              >
                <img
                  :src="singleLastListAll.name == item.fromName? item.toAvatar:item.fromAvatar "
                  alt
                />
                <div class="flex-1">
                  <p class="display-flex justify-content-space-between">
                    <strong>{{singleLastListAll.name == item.fromName? item.toName:item.fromName}}</strong>
                    <span>{{item.msgTime.substr(11)}}</span>
                  </p>
                  <div class="text-over content" v-if="item.type == 'text'">{{item.content}}</div>
                  <div class="text-over content" v-else>{{item.content}}</div>
                </div>
              </li>
              <!-- <chat-side-bar-item
              :active="activeIdx===itemIndex ? true : false"
              v-for="(item,itemIndex) in chatSideData"
              :key="itemIndex"
              :item="item"
              @click.native="handleSidebarItem(item,itemIndex,tab)"
              ></chat-side-bar-item>-->
            </ul>
          </div>

          <div v-else class="chat-warp no-data user-select-none">暂无数据</div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ChatSideBarItem from "./ChatSideBarItem.vue";
export default {
  name: "chatSideBar",
  components: {
    ChatSideBarItem
  },
  // props: {
  //   activeIndex: {
  //     type: Number,
  //     default: () => {
  //       return 0;
  //     }
  //   }
  // },
  computed: {
    ...mapState({
      // loading: state => state.externalUser.loading,
      singleLastListAll: state => state.message.singleLastListAll
    })
  },
  data() {
    return {
      activeIdx: 0,
      chatMembers: [],
      // 聊天侧边顶部切换
      activeName: "1",
      tabs: [
        {
          label: "全部",
          name: "1"
        },
        {
          label: "单聊",
          name: "2"
        },
        {
          label: "群聊",
          name: "3"
        }
      ],
      sideBarsearchValue: "",
      active: "",
      chatSideData: []
    };
  },
  created() {
    this.chatSideData = this.singleLastListAll.allMessageList;
    this.singleLastListAll.allMessageList.forEach((item, index) => {
      if (this.$route.query.userId == item._id) {
        this.activeIdx = index;
      }
    });
  },
  mounted() {
    console.log(this.activeIdx, "000000000");
  },
  methods: {
    handleClickSideBarTab(e) {
      console.log(e.label, "val==");
      this.activeIdx = 0;
      // this.$emit("handleClickSideBarTab", e, this.activeName);
      if (e.label == "全部") {
        this.chatSideData = this.singleLastListAll.allMessageList;
      }
      if (e.label == "单聊") {
        this.chatSideData = this.singleLastListAll.singleMessageList;
      }
      if (e.label == "群聊") {
        this.chatSideData = this.singleLastListAll.groupMessageList;
      }
    },
    handleClickSearch() {
      console.log("搜索s");
    },
    // handleClickItem(index, e) {
    //   console.log(e, "44", index);
    // },
    // querySearch(queryString, cb) {
    //   let allMessageList = this.singleLastListAll.allMessageList;
    //   console.log(chatMembers, "ddd");
    //   let results = queryString
    //     ? allMessageList.filter(this.createFilter(queryString))
    //     : allMessageList;
    //   // 调用 callback 返回建议列表的数据
    //   cb(results);
    // },
    // createFilter(queryString) {
    //   return chatMember => {
    //     console.log(chatMember.fromName, "----");
    //     return chatMember?.fromName.indexOf(queryString) === 0;
    //   };
    // },
    handleSelect(item) {
      console.log(item);
    },
    handleSidebarItem(item, index, tab) {
      this.$emit("handleSidebarItem", item, tab);
      this.activeIdx = index;
      console.log(item, index, "333", tab);
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-side-bar {
  border: 1px solid #eee;
  border-right: none;
  .chat-top-warp {
    margin: 10px 10px;
    > img {
      width: 50px;
      height: 50px;
      border-radius: 100%;
      margin-right: 10px;
    }
  }
  .chat-side-bar-content {
    .side-bar-search {
      margin-bottom: 5px;
      padding: 0 10px;
    }
    .chat-warp {
      overflow-y: scroll;
      height: 65vh;
      li {
        height: 60px;
        border-bottom: 1px solid #eee;
        font-size: 14px;
        line-height: 14px;
        padding: 0 10px;
        > img {
          width: 40px;
          height: 40px;
          border-radius: 100%;
          margin-right: 20px;
        }
        div {
          > p {
            margin-bottom: 10px;
            span {
              font-size: 12px;
            }
          }
          .text-over {
            font-size: 13px;
            color: #777;
            width: 185px;
          }
        }
      }
      li:hover {
        background-color: #eee;
        cursor: pointer;
      }
      .active {
        background-color: #eee;
      }
    }
    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: rgba(144, 147, 153, 0.3);
      border-radius: 3px;
    }
    .no-data {
      text-align: center;
      font-size: 13px;
      line-height: 48px;
      color: #606266;
    }
  }
}
</style>

<style lang="scss">
.chat-side-bar {
  .el-tabs__nav {
    text-align: center;
    width: 100%;
  }
  .el-tabs__active-bar {
    left: 52px;
  }
  .list-single .el-tabs__content {
    background-color: #fff;
  }
}
.chat-side-bar-content /deep/.el-tabs__nav-wrap::after {
  // position: static !important;
  height: 1px;
}
</style>