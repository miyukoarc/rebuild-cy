<!--
 * @Author: your name
 * @Date: 2020-06-19 19:48:28
 * @LastEditTime: 2020-08-10 19:53:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\messageTypeComponent\fileComponent.vue
-->
<template>
  <section class="file-component">
    <div v-if="item.fromUser != fromUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar :src="item.fromAvatar" />
        <div class="left">
          <div class="chat-name" style="margin-left:20px">{{item.fromUser != fromUserId?item.fromName:item.toName}}</div>
          <div class="revoke-content" v-show="item.revokeType">你撤回了一条消息：</div>
          <div
            class="file-warp"
            @dblclick="handleDownload(item.messageMedias[0].file, item.messageMedias[0].fileName, item.messageMedias[0].fileExt,item.revokeType)"
          >
            <div class="file-bg flex-between-alinecenter">
              <div>
                <div
                  v-if="item.messageMedias[0].fileName"
                  class="file-name text-over-2"
                >{{ item.messageMedias[0].fileName }}</div>
                <p class="file-size">{{ getFileSize (item.messageMedias[0].fileFileSize) }}</p>
              </div>

              <svg-icon :icon-class="item.messageMedias[0].fileExt | classFilter" class="excel" />
            </div>
            <!-- <div
              class="down-load"
              @click=" handleDownload(item.messageMedias[0].file, item.messageMedias[0].fileName, item.messageMedias[0].fileExt)"
            >
              <el-icon class="download-icon el-icon-download" />
            </div>-->
          </div>
        </div>
      </div>
    </div>
    <div v-else class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="right-warp display-flex justify-content-flex-end">
        <div class="right">
          <div class="chat-name" style="text-align:right;margin-right:20px">{{item.fromName}}</div>
          <div class="revoke-content" v-show="item.revokeType">你撤回了一条消息：</div>
          <div
            class="file-warp"
            @dblclick="handleDownload(item.messageMedias[0].file, item.messageMedias[0].fileName, item.messageMedias[0].fileExt)"
          >
            <div class="file-bg flex-between-alinecenter">
              <div>
                <div
                  v-if="item.messageMedias[0].fileName"
                  class="file-name text-over-2"
                >{{fileNameLength}}</div>
                <p class="file-size">{{ getFileSize (item.messageMedias[0].fileFileSize) }}</p>
              </div>

              <svg-icon :icon-class="item.messageMedias[0].fileExt | classFilter" class="excel" />
            </div>
            <!-- <a :href="item.messageMedias[0].file" download>
              <el-icon class="download-icon el-icon-download" />
            </a>-->
          </div>
        </div>
        <el-avatar :src="item.fromAvatar" />
      </div>
    </div>
  </section>
</template>

<script>
import { downloadFile } from "@/api/message.js";
export default {
  name: "FileComponent",
  props: {
    item: Object,
    toUserId: String,
    fromUserId: String,
  },
  computed: {
    fileNameLength() {
      if (this.item.messageMedias[0].fileName.length) {
        if (this.item.messageMedias[0].fileName.length > 25) {
          return (
            this.item.messageMedias[0].fileName.substring(0, 15) +
            "..." +
            this.item.messageMedias[0].fileName.substring(
              this.item.messageMedias[0].fileName.length - 10,
              this.item.messageMedias[0].fileName.length
            )
          );
        } else {
          return this.item.messageMedias[0].fileName;
        }
      } else {
        return "";
      }
    },
  },
  methods: {
    async handleDownload(url, fileName, mime) {
      
        // 下载附件
        await downloadFile(url)
          .then((res) => {
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
          .catch((error) => {
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
      
    },
    getFileSize(fileByte) {
      var fileSizeByte = fileByte;
      var fileSizeMsg = "";
      if (fileSizeByte < 1048576)
        fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
      else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
      else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824)
        fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + "MB";
      else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824)
        fileSizeMsg = "1GB";
      else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776)
        fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + "GB";
      else fileSizeMsg = "文件超过1TB";
      return fileSizeMsg;
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-name {
  line-height: 16px;
  font-size: 13px;
  margin-bottom: 5px;
}
.file-component {
  margin: 0 10px 20px 10px;
  .left-warp {
    > p {
      font-size: 13px;
      line-height: 18px;
      text-align: left;
    }
  }
  .right-warp {
    > p {
      font-size: 13px;
      line-height: 18px;
      text-align: right;
    }
  }
  .left {
    max-width: 50%;
    margin-top: 5px;
    .file-warp {
      cursor: pointer;
      margin-left: 20px;
      position: relative;
      width: 260px;
      background-color: #fff;
    }
  }
  .right {
    /*使左右的对话框分开*/
    max-width: 50%;
    top: 5px;
    .file-warp {
      cursor: pointer;
      margin-right: 20px;
      position: relative;
      width: 260px;
      background-color: #fff;
    }
  }
}
.file-bg {
  padding: 10px 20px 10px 10px;
  .excel {
    font-size: 42px;
    color: #999;
  }
  .file-name {
    max-height: 40px;
    font-size: 14px;
    line-height: 18px;
    width: 180px;
  }
  .file-size {
    font-size: 12px;
    line-height: 16px;
    color: #8796a5;
  }
}
.download-icon {
  position: absolute;
  font-size: 20px;
  right: 2px;
  top: 2px;
  color: #666;
  cursor: pointer;
}
</style>
