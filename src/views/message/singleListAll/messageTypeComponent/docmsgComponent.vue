<!--
 * @Author: your name
 * @Date: 2020-07-28 14:13:07
 * @LastEditTime: 2020-08-07 16:56:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\message\singleListAll\messageTypeComponent\docmsgComponent.vue
--> 
<template>
  <section class="docmsg-component">
    <div v-if="item.fromUser != fromUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar :src="item.fromAvatar" />
        <div class="left">
          <div class="revoke-content" v-show="item.revokeType">你撤回了一条消息：</div>
          <a target="_blank" :href="item.messageMedias[0].linkUrl">
            <div class="docmsg-warp">
              <div class="docmsg-title display-flex align-items-center">
                <p>W</p>
                <span>微文档</span>
              </div>
              <div class="docmsg-content flex-between-alinecenter">
                <div class="content-warp">
                  <span>欢迎使用为文档</span>
                  <p>{{item.messageMedias[0].docCreatorName}}</p>
                </div>
                <svg-icon icon-class="wenjian" class="docmsg-file" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div v-else class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="right-warp display-flex justify-content-flex-end">
        <div class="right">
          <div class="revoke-content" v-show="item.revokeType">你撤回了一条消息：</div>
          <a target="_blank" :href="item.messageMedias[0].linkUrl">
            <div class="docmsg-warp">
              <div class="docmsg-title display-flex align-items-center">
                <p>W</p>
                <span>微文档</span>
              </div>
              <div class="docmsg-content flex-between-alinecenter">
                <div class="content-warp">
                  <span>欢迎使用为文档</span>
                  <p>朱余朋</p>
                </div>
                <svg-icon icon-class="wenjian" class="docmsg-file" />
              </div>
            </div>
          </a>
        </div>
        <el-avatar :src="item.fromAvatar" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FileComponent",
  props: {
    item: Object,
    toUserId: String,
    fromUserId: String,
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.docmsg-component {
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
    margin-left: 20px;
    margin-top: 5px;
  }
  .right {
    /*使左右的对话框分开*/
    max-width: 50%;
    margin-right: 20px;
    margin-top: 5px;
  }
  .docmsg-warp {
    width: 240px;
    background-color: #fff;
    padding: 10px;
    .docmsg-title {
      margin-bottom: 10px;
      > p {
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background-color: #539cf9;
        color: #fff;
        text-align: center;
        line-height: 16px;
        font-size: 13px;
      }
      > span {
        margin-left: 10px;
        color: #6f7986;
        font-size: 12px;
      }
    }
    .docmsg-content {
      .content-warp {
        font-size: 14px;
        line-height: 14px;
        p {
          margin-top: 10px;
          color: #b0b0b0;
        }
      }
      .docmsg-file {
        font-size: 40px;
        color: #0087fa;
      }
    }
  }
}
</style>
