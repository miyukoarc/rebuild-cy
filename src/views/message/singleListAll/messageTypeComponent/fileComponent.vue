<!--
 * @Author: your name
 * @Date: 2020-06-19 19:48:28
 * @LastEditTime: 2020-06-22 19:12:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\messageTypeComponent\fileComponent.vue
-->
<template>
  <section class="file-component">
    <div
      v-if="item.toUserId == toUserId"
      class="left-warp"
    >
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <div class="left">
          <div class="user-select">
            <div class="ict file-bg flex-column-center-alinecenter">
              <div
                class="down-load"
                @click=" handleDownload(item.medias[0].file, item.medias[0].fileName, list.medias[0].fileExt)"
              >
                <el-icon class="ic el-icon-download" />
              </div>

              <svg-icon :icon-class="item.medias[0].fileExt | classFilter" class="excel" />
              <span v-if="item.medias[0].fileName" class="file-name">{{ item.medias[0].fileName }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="item.fromUser == fromUserId"
      class="right-warp"
    >
      <p>{{ item.msgTime }}</p>
      <div class="me-chat-warp display-flex justify-content-flex-end">
        <div class="me-chat">
          <div class="user-select">
            <div class="ict file-bg flex-column-center-alinecenter">
              <a :href="item.medias[0].file" download>
                <el-icon class="ic el-icon-download" />
              </a>
              <svg-icon :icon-class="item.medias[0].fileExt | classFilter" class="excel" />
              <span v-if="item.medias[0].fileName" class="file-name">{{ item.medias[0].fileName }}</span>
            </div>
          </div>
        </div>
        <el-avatar icon="el-icon-user-solid" />
      </div>
    </div>
  </section>
</template>

<script>
import{ downloadFile }from'@/api/message/index'
export default{
  name:'FileComponent',
  props:{
    item:Object,
    toUserId:String,
    fromUserId:String
  },
  methods:{
    async handleDownload(url,fileName,mime) {
      // 下载附件
      await downloadFile(url)
        .then(res=>{
          const blob = new Blob([res.data],{ type:mime })
          // 注: mime类型必须整正确, 否则下载的文件会损坏
          if(window.navigator && window.navigator.msSaveOrOpenBlob) {
            // 兼容IE
            window.navigator.msSaveOrOpenBlob(blob,element.original_name)
          }else{
            const downloadElement = document.createElement('a')
            downloadElement.href = window.URL.createObjectURL(blob) // 创建一个DOMString
            downloadElement.download = fileName
            downloadElement.click()
            window.URL.revokeObjectURL(blob) // 释放 DOMString  ,解除内存占用
          }
        })
        .catch(error=>{
          console.error(error)
        })

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
}
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
</style>
