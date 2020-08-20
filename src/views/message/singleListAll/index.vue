<!--
 * @Author: your name
 * @Date: 2020-05-12 15:34:16
 * @LastEditTime: 2020-08-14 17:52:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\listSingle.vue
 -->
<template>
  <section class="single-list-all app-container">
    <el-card>
      <div class="display-flex">
        <!-- 左侧 侧边栏 -->
        <div class="left" style="width:270px">
          <!-- 侧边栏 -->
          <div class="chat-side-bar">
            <div class="chat-top-warp display-flex align-items-center">
              <img :src="singleLastListAll.avatar" alt />
              <div>
                <strong>{{singleLastListAll.name}}</strong>
              </div>
            </div>
            <div class="chat-side-bar-content">
              <el-tabs v-model="sideTabActiveName" @tab-click="handleClickSideBarTab">
                <div class="side-bar-search flex-between-alinecenter">
                  <span
                    style="font-size:13px"
                    v-if="sideTabActiveName == '1'"
                  >共有{{singleLastListAll.count}}位好友</span>
                  <span
                    style="font-size:13px"
                    v-else-if="sideTabActiveName == '2'"
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
                      <i
                        slot="prefix"
                        class="el-input__icon el-icon-search"
                        @click="handleClickSearch"
                      ></i>
                    </el-input>
                  </div>
                </div>
                <el-tab-pane
                  v-for="(tab,index) in sideBarTabs"
                  :key="index"
                  :label="tab.label"
                  :name="tab.name"
                >
                  <div v-if="chatSideData && chatSideData.length>0">
                    <ul class="all-chat chat-warp" v-if="tab.name == sideTabActiveName">
                      <li
                        class="item display-flex align-items-center"
                        :class="{ 'active' : activeIdx===itemIndex ? true : false }"
                        v-for="(item,itemIndex) in chatSideData"
                        :key="itemIndex"
                        :item="item"
                        @click="handleSidebarItem(item,itemIndex,tab)"
                      >
                        <img
                          v-if="item.chatType != 'ROOM'"
                          :src="item._id == item.fromUserId? item.fromAvatar :item.toAvatar"
                          alt
                        />
                        <div v-else class="group-list-left flex-column-center-alinecenter">
                          <svg-icon icon-class="groupChat" class="svg-icon" />
                          <p style="margin:0px;">群聊</p>
                        </div>
                        <div class="flex-1">
                          <p class="display-flex justify-content-space-between">
                            <strong
                              v-if="item.chatType != 'ROOM'"
                            >{{item._id == item.fromUserId? item.fromName:item.toName}}</strong>
                            <strong v-else>{{item.groupName}}</strong>
                            <span>{{item.msgTime.substr(11)}}</span>
                          </p>
                          <div class="text-over content" v-if="item.type == 'text'">{{item.content}}</div>
                          <div class="text-over content" v-else>{{chatContentType[item.type]}}</div>
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
        </div>
        <!-- 右侧内容 -->
        <div class="flex-1">
          <!-- 右侧顶部按钮-->
          <div class="right">
            <chat-information :currnetMember="currnetMember"></chat-information>
            <keep-alive>
              <div class="chat-content chat-tab-bar">
                <el-tabs v-model="chatActiveName" @tab-click="handleClickChatType">
                  <el-tab-pane
                    v-for="(tab,index) in chatTypeTabs"
                    :key="index"
                    :label="tab.label"
                    :name="tab.name"
                  >
                    <div v-show="singleListAllData.length>0" style="overflow-y:scroll;height:65vh">
                      <div
                        v-for="(list,listIndex) in singleListAllData"
                        :key="listIndex"
                        class="allChat clearfix"
                      >
                        <!-- :is="list.msgType+'Component'" -->
                        <!-- :is="currentView" -->
                        <component
                          :is="list.msgType+'Component'"
                          :key="listIndex"
                          :item="list"
                          :to-user-id="query.toUserId"
                          :from-user-id="query.fromUserId"
                          @handleClickViewMore="handleClickViewMore"
                        />
                      </div>
                    </div>
                    <div
                      v-show="singleListAllData.length<=0"
                      class="no-chat-data user-select-none"
                    >暂无数据</div>
                  </el-tab-pane>
                </el-tabs>
                <customer-pagination
                  v-show=" singleListAllData.length>0"
                  :pageConfig="pageConfig"
                  @current-change="changePage"
                  @size-change="changeSize"
                ></customer-pagination>
                <div class="search-form" style="margin-top:5px">
                  <chat-search @handleSearch="handleSearch" @handleRefresh="handleRefresh"></chat-search>
                </div>
              </div>
            </keep-alive>
          </div>
        </div>
      </div>
    </el-card>
    <form-dialog ref="formDialog"></form-dialog>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import FormDialog from './dialog'
import ChatSideBar from './components/ChatSideBar.vue'

import ChatInformation from './components/ChatInformation.vue'
import ChatTabBar from './components/ChatTabBar.vue'

import ChatSearch from './components/ChatSearch.vue'
import CustomerPagination from '@/components/CustomerPagination'

import textComponent from './messageTypeComponent/textComponent.vue'
import imageComponent from './messageTypeComponent/imageComponent.vue'
import emotionComponent from './messageTypeComponent/emotionComponent.vue'
import voiceComponent from './messageTypeComponent/voiceComponent.vue'
import videoComponent from './messageTypeComponent/videoComponent.vue'
import agreeComponent from './messageTypeComponent/agreeComponent.vue'
import cardComponent from './messageTypeComponent/cardComponent.vue'
import linkComponent from './messageTypeComponent/linkComponent.vue'
import weappComponent from './messageTypeComponent/weappComponent.vue'
import fileComponent from './messageTypeComponent/fileComponent.vue'
// import revokeComponent from "./messageTypeComponent/revokeComponent.vue";
import docmsgComponent from './messageTypeComponent/docmsgComponent.vue'
import chatrecordComponent from './messageTypeComponent/chatrecordComponent.vue'
import locationComponent from './messageTypeComponent/locationComponent.vue'
import meeting_voice_callComponent from './messageTypeComponent/meeting_voice_callComponent.vue'

import mixedComponent from './messageTypeComponent/mixedComponent.vue'

export default {
  name: 'message_singleListAll',
  components: {
    CustomerPagination,
    FormDialog,
    ChatSideBar,
    ChatTabBar,
    ChatInformation,
    ChatSearch,
    textComponent,
    imageComponent,
    emotionComponent,
    voiceComponent,
    videoComponent,
    agreeComponent,
    cardComponent,
    linkComponent,
    weappComponent,
    fileComponent,
    // revokeComponent,
    docmsgComponent,
    chatrecordComponent,
    locationComponent,
    meeting_voice_callComponent,
    mixedComponent,
  },
  data() {
    return {
      currentView: 'locationComponent',
      pageConfig: {
        total: 0,
        pageNumber: 0,
        pageSize: 10,
      },
      query: {
        page: 0,
        size: 10,
        fromUserId: '',
        msgType: 'all',
        toUserId: '',
        content: '',
        startTime: '',
        endTime: '',
      },
      groupQuery: {
        page: 0,
        size: 10,
        msgType: 'all',
        chatId: '',
        content: '',
        startTime: '',
        endTime: '',
      },
      chatType: '',
      currnetMember: {},
      chatMembers: [],
      // 聊天侧边顶部切换
      singleListAllData: [],
      sideTabActiveName: '1',
      currentActiveName: '',
      sideBarTabs: [
        {
          label: '全部',
          name: '1',
        },
        {
          label: '单聊',
          name: '2',
        },
        {
          label: '群聊',
          name: '3',
        },
      ],
      sideBarsearchValue: '',
      active: '',
      chatSideData: [],
      toUserId: '',
      fromUserId: '',
      activeIdx: 0,

      // 聊天内容
      chatActiveName: 'all',
      chatTypeTabs: [
        {
          label: '全部',
          name: 'all',
        },
        {
          label: '文件',
          name: 'file',
        },
        {
          label: '链接',
          name: 'link',
        },
        {
          label: '图片',
          name: 'image',
        },
        {
          label: '视频',
          name: 'video',
        },
        {
          label: '语音',
          name: 'voice',
        },
        {
          label: '视频语音通话',
          name: 'meeting_voice_call',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      singleLastListAll: (state) => state.message.singleLastListAll,
      singleLastListPage: (state) => state.message.singleLastListPage,
      // singleListAll: (state) => state.message.singleListAll,
      singleListPage: (state) => state.message.singleListPage,
      groupListAll: (state) => state.message.groupListAll,
      chatContentType: (state) => state.enum.chatContentType,
    }),
  },
  created() {
    let payload = {
      type: this.$route.query.type,
      uuid: this.$route.query.uuid,
    }
    this.initDataList(payload)
  },
  mounted() {},
  methods: {
    initDataList(payload) {
      this.$store
        .dispatch('message/getMessageSingleLastListAll', payload)
        .then((res) => {
          if (res) {
            this.chatSideData = res.allMessageList

            res.allMessageList.forEach((item, index) => {
              if (this.$route.query.userId == item._id) {
                this.activeIdx = index
                this.currnetMember = item
                console.log(item, 'item====', this.currnetMember)
                this.chatType = item.chatType
              }
            })
            if ((this.currnetMember = '{}')) {
              this.currnetMember = res.allMessageList[0]
              console.log(this.currnetMember, '88888')
            }
            this.query.fromUserId = this.singleLastListAll.userId
            if (this.currnetMember.fromUserId == res.userId) {
              this.query.toUserId = this.currnetMember.toUserId
            } else {
              this.query.toUserId = this.currnetMember.fromUserId
            }
            console.log(this.query.toUserId, 'this.query.toUserId')
            this.getsinglelist(this.query)
              .then(() => {})
              .catch((err) => {
                console.log(err)
              })
          }
        })
        .catch((err) => {})
    },
    getsinglelist(payload) {
      this.$store
        .dispatch('message/getMessageSingleListAll', payload)
        .then((res) => {
          this.singleListAllData = res.item
          this.pageConfig.pageNumber = this.singleListPage.pageNumber + 1
          this.pageConfig.total = this.singleListPage.total
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getGrouplist(payload) {
      this.$store
        .dispatch('message/getMessageGroupListAll', payload)
        .then((res) => {
          console.log(res, 'res====')
          this.singleListAllData = res.item
          this.pageConfig.pageNumber = this.groupListAll.pageNumber + 1
          this.pageConfig.total = this.groupListAll.total
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleClickSearch() {
      console.log('搜索s')
    },
    handleClickViewMore(val) {
      console.log(val, 'val====')
      this.$refs['formDialog'].dialogVisible = true
      this.$refs['formDialog'].event = 'showMoreTemplate'
      this.$refs['formDialog'].eventType = 'showMore'
      this.$refs['formDialog'].transfer = val
    },
    handleClickSideBarTab(e) {
      console.log(e.label, '点击侧边栏tab切换')
      this.activeIdx = 0
      if (this.currentActiveName != this.sideTabActiveName) {
        this.currentActiveName = this.sideTabActiveName
        this.$nextTick(() => {
          this.chatActiveName = 'all'
        })
      }
      if (e.label == '全部') {
        this.getChangeSideTabMemberChatData(
          this.singleLastListAll.allMessageList
        )
      }
      if (e.label == '单聊') {
        this.getChangeSideTabMemberChatData(
          this.singleLastListAll.singleMessageList
        )
      }
      if (e.label == '群聊') {
        this.getChangeSideTabMemberChatData(
          this.singleLastListAll.groupMessageList
        )
      }
    },
    getChangeSideTabMemberChatData(memberList) {
      console.log(memberList, 'memberList 点击侧边栏上tab')
      if (memberList.length > 0) {
        this.chatSideData = memberList
        // let userId = "";
        memberList.forEach((item, index) => {
          if (this.activeIdx == index) {
            this.query.toUserId = item._id
            this.currnetMember = item
            // console.log(item,'ddddd')
            // this.chatType = item.
          }
        })
        console.log(this.currnetMember, 'this.currnetMember')
        this.query.msgType = 'all'
        this.groupQuery.msgType = 'all'
        this.chatActiveName = 'all'
        this.query.page = 0
        if (this.currnetMember.chatType === 'ROOM') {
          console.log('群聊', this.currnetMember._id)
          this.groupQuery.chatId = this.currnetMember._id
          this.groupQuery.page = 0
          this.getGrouplist(this.groupQuery)
        } else {
          this.getsinglelist(this.query)
        }
      } else {
        this.chatSideData = []
        this.singleListAllData = []
      }
    },

    handleSidebarItem(item, index, tab) {
      console.log(item, index, tab, 'item, index, tab')
      let payload = {
        type: this.$route.query.type,
        uuid: this.$route.query.uuid,
      }
      this.$store
        .dispatch('message/getMessageSingleLastListAll', payload)
        .then((res) => {
          if (res) {
            if (tab.label == '全部') {
              this.chatSideData = res.allMessageList
            }
            if (tab.label == '单聊') {
              this.chatSideData = res.singleMessageList
            }
            if (tab.label == '群聊') {
              this.chatSideData = res.groupMessageList
            }
            console.log(item, '点击侧边栏用户', index, tab)
            this.activeIdx = index
            this.currnetMember = item
            this.chatType = item.chatType
            this.query.toUserId = item._id
            // let payload = {
            //   type: "externalUser",
            //   uuid: this.$route.query.uuid,
            // };
            // this.initDataList(payload);
            if (item.chatType === 'ROOM') {
              console.log('群聊', item._id)
              this.groupQuery.chatId = item._id
              this.chatType = item.chatType
              this.groupQuery.page = 0
              this.getGrouplist(this.groupQuery)
            } else {
              this.getsinglelist(this.query)
            }
          }
        })
        .catch((err) => {})
    },

    handleClickChatType() {
      console.log('点击右侧类型', this.chatActiveName)
      if (this.chatSideData.length > 0) {
        let payload = {
          type: this.$route.query.type,
          uuid: this.$route.query.uuid,
        }
        this.$store
          .dispatch('message/getMessageSingleLastListAll', payload)
          .then((res) => {
            if (res) {
              if (this.sideTabActiveName == '1') {
                this.chatSideData = res.allMessageList
                if (this.chatType == 'ROOM') {
                  this.groupQuery.page = 0
                  this.groupQuery.msgType = this.chatActiveName
                  this.getGrouplist(this.groupQuery)
                } else {
                  this.query.msgType = this.chatActiveName
                  this.query.page = 0
                  this.groupQuery.page = 0
                  this.getsinglelist(this.query)
                }
              }
              if (this.sideTabActiveName == '2') {
                this.chatSideData = res.singleMessageList
                this.query.msgType = this.chatActiveName
                this.query.page = 0
                this.getsinglelist(this.query)
              }
              if (this.sideTabActiveName == '3') {
                this.chatSideData = res.groupMessageList
                this.groupQuery.msgType = this.chatActiveName
                this.groupQuery.page = 0
                // this.groupQuery.chatId = this.currnetMember._id;
                this.getGrouplist(this.groupQuery)
                console.log(this.sideTabActiveName, 'this.sideTabActiveName')
              }
            }
          })
          .catch((err) => {})
      }
    },

    handleSearch(val) {
      const { content, startTime, endTime } = val
      this.query.content = content ? content : ''
      this.query.startTime = startTime ? startTime : ''
      this.query.endTime = endTime ? endTime : ''
      console.log(val, '点击搜索')
      this.query.page = 0
      this.getsinglelist(this.query)
    },
    handleRefresh() {
      console.log('刷新')
      this.query = this.$options.data().query
      this.getsinglelist(this.query)
    },
    resetForm() {
      console.log('重置')
      this.searchFrom = {
        keyword: '',
        planStatu: null,
      }
    },
    changeSize(val) {
      this.query.size = val
      this.getsinglelist(this.query)
    },
    changePage(page) {
      console.log(page, '点击分页', this.groupQuery)

      this.pageConfig.pageNumber = page - 1

      if (this.chatType == 'ROOM') {
        this.groupQuery.page = page - 1
        this.getGrouplist(this.groupQuery)
      } else {
        this.query.page = page - 1
        this.getsinglelist(this.query)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.single-list-all {
  .right {
    border: 1px solid #eee;
    // padding: 0 20px;
    .chat-content {
      height: calc(70vh + 40px);
      .no-chat-data {
        text-align: center;
        line-height: 48px;
        font-size: 13px;
      }
    }
  }
}
.chat-tab-bar {
  position: relative;
  .search-form {
    position: absolute;
    right: 0;
    top: 0;
  }
}
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
    // .chat-warp-h {
    //   overflow-y: scroll;
    //   height: calc(65vh);
    // }
    .chat-warp {
      overflow-y: scroll;
      height: 65vh;
    }
    .all-chat {
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
      .group-list-left {
        width: 40px;
        height: 40px;
        text-align: center;
        background-color: #1890ff;
        border-radius: 100%;
        margin-right: 20px;
        color: #fff;
        .svg-icon {
          font-size: 20px;
        }
        > p {
          font-size: 12px;
          line-height: 14px;
        }
      }
    }
    ::-webkit-scrollbar {
      width: 3px;
      height: 3px;
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

.pager {
  // margin: 20px 0 0 0;
  text-align: center;
  background-color: #fff;
}
</style>
<style lang="scss">
.chat-name {
  line-height: 16px;
  font-size: 13px;
  margin-bottom: 5px;
}
.left {
  .chat-side-bar {
    .el-tabs__nav {
      text-align: center;
      width: 100%;
    }
    .el-tabs__active-bar {
      left: 52px;
    }
    .el-tabs__content {
      background-color: #fff;
      overflow-y: scroll;
    }
  }
}

.right {
  .chat-tab-bar {
    background-color: #f2f3f5;
    .el-tabs__header {
      background-color: #fff;
      // padding: 0 20px;
    }
    .el-tabs__nav-scroll {
      margin: 0 20px;
    }
    .el-tabs__content {
      height: 65vh;
      // padding: 0 20px;
      overflow-y: scroll;
    }
  }
  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(144, 147, 153, 0.3);
    border-radius: 3px;
  }
}
.chat-side-bar-content /deep/.el-tabs__nav-wrap::after {
  // position: static !important;
  height: 1px;
}
.revoke-content {
  width: 140px;
  font-size: 13px;
  background-color: #d7d7d7;
  color: #fff;
  padding: 5px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
}
</style>
