<!--
 * @Author: your name
 * @Date: 2020-05-12 15:34:16
 * @LastEditTime: 2020-06-28 14:25:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\listSingle.vue
 -->
<template>
  <section class="list-single app-container">
    <!-- 搜索组件 -->
    <el-card class="content-spacing">
      <search-header @handleSearch="handleSearch" @handleRefresh="handleRefresh"></search-header>
    </el-card>

    <!-- 聊天内容 -->
    <el-card class="box-card content-spacing">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="(tab,index) in tabs" :key="index" :label="tab.label" :name="tab.name">
          <div v-if="listData.length>0">
            <div v-for="(list,listIndex) in listData" :key="listIndex" class="allChat clearfix">
              <!-- :is="list.msgType+'Component'" -->
              <!-- :is="currentView" -->
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
          <div v-if="listData.length<=0" class="no-data">暂无数据</div>
        </el-tab-pane>
      </el-tabs>
      <el-pagination
        v-show="this.listData.length>0"
        background
        class="pager"
        layout="total,prev, pager, next,jumper"
        :total="pageConfig.total"
        :current-page.sync="pageConfig.page"
        :page-size="pageConfig.size"
        @current-change="changePage"
      />
    </el-card>
  </section>
</template>

<script>


import { getMessageSingleListAll, downloadFile } from "@/api/message.js";

import { mapState, mapMutations, mapActions } from "vuex";

import searchHeader from "./header.vue";

import textComponent from "./messageTypeComponent/textComponent.vue";
import imageComponent from "./messageTypeComponent/imageComponent.vue";
import emotionComponent from "./messageTypeComponent/emotionComponent.vue";
import voiceComponent from "./messageTypeComponent/voiceComponent.vue";
import videoComponent from "./messageTypeComponent/videoComponent.vue";
import agreeComponent from "./messageTypeComponent/agreeComponent.vue";
import cardComponent from "./messageTypeComponent/cardComponent.vue";
import linkComponent from "./messageTypeComponent/linkComponent.vue";
import weappComponent from "./messageTypeComponent/weappComponent.vue";

// import imgPage from "../../static/2.jpg"

export default {
  name: "ListSingleAll",
  components: {
    searchHeader,
    textComponent,
    imageComponent,
    emotionComponent,
    voiceComponent,
    videoComponent,
    agreeComponent,
    cardComponent,
    weappComponent
  },
  data() {
    return {
      currentView: "weappComponent",
      baseUrl: "",
      // 搜索
      fromUserId: "",
      toUserId: "",
      labelPosition: "right",
      searchFrom: {
        keyword: "",
        planStatu: null
      },
      pageConfig: {
        total: 0,
        pageNumber: 0,
        pageSize: 10
      },
      listData: [],
      searchFormLabel: [
        {
          model: "keyword",
          label: "搜索聊天内容："
        },
        {
          model: "planStatu",
          label: "聊天时间：",
          type: "datePicker"
        }
      ],
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
        // {
        //   label: "链接",
        //   name: "link"
        // },
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
        }
      ],
      // 图片
      currentDate: new Date(),
      srcList: [],
      showicon: false,
      isPlayAudio: false
    };
  },
  computed: {
    ...mapState({
      singleListAll: state => state.message.singleListAll,
      singleListPage: state => state.message.singleListPage
    })
  },
  created() {
    if (
      this.$route.query &&
      this.$route.query.externalUserId &&
      this.$route.query.userId
    ) {
      const externalUserId = this.$route.query.externalUserId;
      const userId = this.$route.query.userId;
      this.toUserId = userId;
      this.fromUserId = externalUserId;
      this.initDataList(externalUserId, userId);
    }
  },
  methods: {
    async initDataList(externalUserId, userId, msgType = "") {
      this.listData = [];
      const paramsData = {
        fromUserId: externalUserId,
        msgType: msgType,
        page: this.pageConfig.page,
        size: this.pageConfig.size,
        toUserId: userId,
        content: ""
      };
      this.fromUserId = externalUserId;
      this.toUserId = userId;
      this.$store
        .dispatch("message/getMessageSingleListAll", paramsData)
        .then(() => {
          this.pageConfig.pageNumber = this.singleListPage.pageNumber + 1;
          this.pageConfig.total = this.singleListPage.total;
          this.listData = this.singleListAll;
          console.log(this.singleListAll, "singleListAll");
        })
        .catch(err => {
          ;
        });
    },
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
    },
    // 聊天
    handleClick(tab, event) {
      console.log(tab, event);
      this.pageConfig.page = 0;
      let msgType = tab.name;
      if (tab.name == "all") {
        msgType = "";
      }
      this.initDataList(this.fromUserId, this.toUserId, msgType);
    },
    changePage(page) {
      this.pageConfig.page = page - 1;
      this.pageConfig.pageNumber = page - 1;
      let msgType = this.activeName;
      console.log(this.activeName, "999");
      if (msgType == "all") {
        msgType = "";
      }
      this.initDataList(this.fromUserId, this.toUserId, msgType);
    },
    playAudio(url) {
      console.log(url, "90点击");
      const that = this;
      var amr = new BenzAMRRecorder();
      amr.initWithUrl(url).then(() => {
        // amr.isPlaying() 返回音频的播放状态 是否正在播放 返回boolean类型
        console.log(amr.isPlaying());
        if (amr.isPlaying()) {
          that.isPlayAudio = false;
          amr.stop();
        } else {
          that.isPlayAudio = true;
          amr.play();
        }
      });
    },
    async handleDownload(url, fileName, mime) {
      // 下载附件
      await downloadFile(url)
        .then(res => {
          const blob = new Blob([res.data], { type: mime });
          // 注: mime类型必须整正确, 否则下载的文件会损坏
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            // 兼容IE
            window.navigator.msSaveOrOpenBlob(blob, element.original_name);
          } else {
            const downloadElement = document.createElement("a");
            downloadElement.href = window.URL.createObjectURL(blob); // 创建一个DOMString
            downloadElement.download = fileName;
            downloadElement.click();
            window.URL.revokeObjectURL(blob); // 释放 DOMString  ,解除内存占用
          }
        })
        .catch(error => {
          console.error(error);
        });

      // axios
      //   .get(url, { responseType: "blob" })
      //   .then(res => {
      //     let blob = new Blob([res.data], { type: mime });
      //     // 注: mime类型必须整正确, 否则下载的文件会损坏
      //     if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      //       // 兼容IE
      //       window.navigator.msSaveOrOpenBlob(blob, element.original_name);
      //     } else {
      //       let downloadElement = document.createElement("a");
      //       downloadElement.href = window.URL.createObjectURL(blob); // 创建一个DOMString
      //       downloadElement.download = fileName;
      //       downloadElement.click();
      //       window.URL.revokeObjectURL(blob); // 释放 DOMString  ,解除内存占用
      //     }
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
    }
  }
};
</script>

<style lang="scss" scoped>
.ict {
  position: relative;
}
.ic {
  position: absolute;
  font-size: 28px;
  right: 10px;
  top: 5px;
  color: #666;
  cursor: pointer;
}
.list-single {
  font-size: 14px;
  .allChat {
    .revoke-warp {
      .revoke {
        padding: 5px 10px;
        background-color: #d7d7d7;
        color: #fff;
        border-radius: 10px;
        font-size: 14px;
      }
    }
    .user-select {
      user-select: text;
      -moz-user-select: text;
      -webkit-user-select: text;
      -ms-user-select: text;
      margin-top: 10px;
    }
    padding: 20px;
    // .member {
    //   width: 100%;
    //   line-height: 22px;
    //   p {
    //     color: rgba(0, 0, 0, 0.45);
    //     font-size: 14px;
    //     line-height: 18px;
    //   }
    // }
    .me {
      .me-chat-warp {
        .me-chat {
          margin-right: 20px;
          > p {
            text-align: end;
            color: #bfbfbf;
            font-size: 14px;
          }
          .img-warp {
            width: 100px;
            height: 100px;
          }
          .all-img {
            width: 100%;
            height: 100%;
            background-color: #666;
          }
          .audio {
            width: 200px;
            height: 40px;
            border-radius: 20px;
            background-color: rgb(64, 158, 255);
            .play-audio {
              color: #fff;
            }
          }
          // .demo {
          //   display: inline-block;
          //   width: 400px;
          //   height: 215px;
          //   text-align: center;
          //   line-height: 100px;
          //   border: 1px solid transparent;
          //   border-radius: 4px;
          //   overflow: hidden;
          //   background: #fff;
          //   position: relative;
          //   box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
          //   margin-right: 4px;
          // }

          // .demo:hover {
          //   display: block;
          // }
          // 调整播放器样式
          .video-js .vjs-icon-placeholder {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
    }
    .file-bg {
      position: relative;
      width: 200px;
      height: 200px;
      background-color: #fafafa;
      .excel {
        font-size: 80px;
        color: #999;
        vertical-align: middle;
      }
      .file-name {
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        margin: 0 20px;
      }
    }
  }
  .demo {
    display: inline-block;
    width: 400px;
    height: 220px;
    text-align: center;
    line-height: 50px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    // margin-right: 4px;
  }

  .demo:hover {
    display: block;
  }
  .video,
  .audio,
  .file,
  .picture {
    overflow: hidden;
    padding: 20px;
    .pic-warp {
      margin-right: 20px;
      margin-bottom: 20px;
      .pic-bg {
        position: relative;
      }
    }
    .pic-warp:last-child {
      margin-right: 0px;
    }
    .card-w {
      width: 240px;
      margin-right: 20px;
      margin-bottom: 20px;
    }
    .time {
      font-size: 13px;
      color: #999;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 0;
      float: right;
    }

    .image {
      width: 100%;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both;
    }
  }
  .video {
    .vid-warp {
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
  .audio {
    .aud-warp {
      margin-right: 20px;
      margin-bottom: 20px;
      audio {
        margin: 10px;
      }
    }
    .aud-warp:last-child {
      margin-right: 0px;
    }
  }
  .file {
    .file-warp {
      margin-right: 20px;
      margin-bottom: 20px;
      .file-bg {
        position: relative;
        width: 200px;
        height: 200px;
        background-color: #fafafa;
        .excel {
          cursor: pointer;
          font-size: 80px;
          color: #999;
          vertical-align: middle;
        }
      }
    }
    .file-warp:last-child {
      margin-right: 0px;
    }
  }
  .info {
    position: relative;
  }
  .xiazai {
    cursor: pointer;
    position: absolute;
    font-size: 20px;
    top: 15px;
    right: 10px;
    font-size: 20px;
  }
  .pager {
    padding: 20px 0;
    text-align: center;
  }
  .no-data {
    text-align: center;
    font-size: 14px;
    color: #666;
    line-height: 24px;
    background-color: #fff;
  }
}
</style>

<style lang="scss">
.list-single {
  .el-tabs__content {
    background-color: #eeea;
  }
}
</style>
