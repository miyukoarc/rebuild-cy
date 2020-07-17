<!--
 * @Author: your name
 * @Date: 2020-06-19 19:48:28
 * @LastEditTime: 2020-07-17 14:23:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\messageTypeComponent\fileComponent.vue
-->
<template>
  <section class="file-component">
    <div v-if="item.toUser == toUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar :src="item.avatar" />
        <div class="left">
          <div class="user-select">
            <div class="ict file-bg flex-column-center-alinecenter ml-20 ">
              <div
                class="down-load"
                @click=" handleDownload(item.messageMedias[0].file, item.messageMedias[0].fileName, item.messageMedias[0].fileExt)"
              >
                <el-icon class="ic el-icon-download" />
              </div>

              <svg-icon :icon-class="item.messageMedias[0].fileExt | classFilter" class="excel" />
              <span
                v-if="item.messageMedias[0].fileName"
                class="file-name"
              >{{ item.messageMedias[0].fileName }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="item.fromUser == toUserId" class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="right-warp display-flex justify-content-flex-end">
        <div class="right">
          <div class="user-select">
            <div class="ict file-bg flex-column-center-alinecenter mr-20">
              <a :href="item.messageMedias[0].file" download>
                <el-icon class="ic el-icon-download" />
              </a>
              <svg-icon :icon-class="item.messageMedias[0].fileExt | classFilter" class="excel" />
              <span
                v-if="item.messageMedias[0].fileName"
                class="file-name"
              >{{ item.messageMedias[0].fileName }}</span>
            </div>
          </div>
        </div>
        <el-avatar :src="item.avatar" />
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
    fromUserId: String
  },
  methods: {
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
.file-component {
  p {
    text-align: center;
  }
  .left {
    max-width: 50%;
    left: 20px;
    margin-top: 5px;
  }
  .right {
    /*使左右的对话框分开*/
    max-width: 50%;
    top: 5px;
    left: -20px;
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
</style>
