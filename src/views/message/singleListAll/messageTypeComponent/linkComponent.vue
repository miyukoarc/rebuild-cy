<!--
 * @Author: your name
 * @Date: 2020-06-22 13:50:04
 * @LastEditTime: 2020-07-28 17:41:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\messageTypeComponent\linkComponent.vue
-->
<template>
  <section class="link-component clearfix">
    <div v-if="item.toUser == toUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar :src="item.fromAvatar" />
        <div class="left">
          <div>
            <div class="revoke-content" v-show="item.revokeType">你撤回了一条消息：</div>
            <a target="_blank" :href="item.messageMedias[0].linkUrl">
              <div class="link-warp">
                <div class="title">{{item.messageMedias[0].title}}</div>
                <div class="content-warp flex-between-alinecenter">
                  <div class="content">
                    <span>{{item.messageMedias[0].description.split(/\r\n|\n|\r/)[0]}}</span>
                    <p>{{item.messageMedias[0].description.split(/\r\n|\n|\r/)[1]}}</p>
                  </div>
                  <img :src="item.messageMedias[0].imageUrl" alt />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="item.fromUser == toUserId" class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex justify-content-flex-end">
        <div>
          <div class="revoke-content" v-show="item.revokeType">你撤回了一条消息：</div>
          <div class="right">
            <a target="_blank" :href="item.messageMedias[0].linkUrl">
              <div class="link-warp">
                <div class="title">{{item.messageMedias[0].title}}</div>
                <div class="content-warp flex-between-alinecenter">
                  <div class="content">
                    <span>{{item.messageMedias[0].description.split(/\r\n|\n|\r/)[0]}}</span>
                    <p>{{item.messageMedias[0].description.split(/\r\n|\n|\r/)[1]}}</p>
                  </div>
                  <img :src="item.messageMedias[0].imageUrl" alt />
                </div>
              </div>
            </a>
          </div>
        </div>
        <el-avatar :src="item.fromAvatar" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LinkComponent",
  props: {
    item: Object,
    toUserId: String,
    fromUserId: String,
  },
};
</script>

<style lang="scss" scoped>
.left,
.right {
  min-height: 40px;
  position: relative;
  display: table;
  text-align: center;
  border-radius: 5px;
}

.left > span,
.right > span {
  /*使内容居中*/
  display: table-cell;
  vertical-align: middle;
  padding: 5px 10px;
  text-align: left;
}
.left:before,
.right:after {
  /*用伪类写出小三角形*/
  content: "";
  display: block;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  position: absolute;
  top: 11px;
}
/*分别给左右两边的小三角形定位*/
.left:before {
  border-right: 8px solid #fff;
  left: -16px;
}
.right:after {
  border-left: 8px solid #fff;
  right: -16px;
}

.link-component {
  margin: 0 10px 20px 10px;
  .left-warp {
    > p {
      font-size: 13px;
      line-height: 18px;
      text-align: left;
    }
    .left {
      background-color: #fff;
      max-width: 50%;
      left: 20px;
      margin-top: 5px;
    }
  }
  .right-warp {
    > p {
      font-size: 13px;
      line-height: 18px;
      text-align: right;
    }
    .right {
      /*使左右的对话框分开*/
      max-width: 50%;
      top: 5px;
      left: -20px;
      background-color: #fff;
    }
  }
  .link-warp {
    width: 240px;
    padding: 10px;
    text-align: left;
    .title {
      font-size: 14px;
      margin-bottom: 15px;
    }
    .content-warp {
      .content {
        color: #b2b2b2;
        font-size: 13px;
        line-height: 16px;
      }
      img {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
