<!--
 * @Author: your name
 * @Date: 2020-06-19 14:24:40
 * @LastEditTime: 2020-07-28 15:29:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\messageTypeComponent\text.vue
-->
<template>
  <section class="card-component clearfix">
    <div v-if="item.toUser == toUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar :src="item.fromAvatar" />
        <div class="left">
          <div class="revoke-content" v-show="item.revokeType">你撤回了一条消息：</div>
          <div class="card-warp">
            <div class="card-top">
              <div class="card--top-left display-flex justify-content-space-between">
                <div class="display-flex flex-direction-column justify-content-space-between">
                  <p>{{item.messageMedias[0].corpName}}</p>
                  <p class="name">{{item.messageMedias[0].corpUserName}}</p>
                </div>
                <img :src="item.messageMedias[0].corpUserAvatar" alt />
              </div>
            </div>
            <div class="line"></div>
            <div class="card-tip">个人名片</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="item.fromUser == fromUserId" class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex justify-content-flex-end">
        <div class="right">
          <div class="revoke-content" v-show="item.revokeType">你撤回了一条消息：</div>
          <div class="card-warp">
            <div class="card-top">
              <div class="card--top-left display-flex justify-content-space-between">
                <div class="display-flex flex-direction-column justify-content-space-between">
                  <p>腾讯</p>
                  <p class="name">{{item.messageMedias[0].corpUserName}}</p>
                </div>
                <img :src="item.messageMedias[0].corpUserAvatar" alt />
              </div>
            </div>
            <div class="line"></div>
            <div class="card-tip">个人名片</div>
          </div>
        </div>
        <el-avatar :src="item.fromAvatar" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CardComponent",
  props: {
    item: Object,
    toUserId: String,
    fromUserId: String,
  },
};
</script>

<style lang="scss" scoped>
.card-component {
  margin: 0px 10px 20px 10px;
  .left-warp {
    > p {
      font-size: 13px;
      line-height: 18px;
      text-align: left;
    }
    .left {
      /*使左右的对话框分开*/
      max-width: 50%;
      margin-left: 20px;
      margin-top: 5px;
      
      .card-warp {
        width: 238px;
        border: 1px solid #eee;
        background-color: #fff;
        padding: 10px 10px 0px 10px;
        .card-top {
          .card--top-left {
            margin-bottom: 10px;
          }
          p {
            font-size: 18px;
          }
          .name {
            color: #9d9d9f;
            font-size: 14px;
          }
        }
        .card-tip {
          color: #9d9d9f;
          font-size: 12px;
          line-height: 24px;
        }
        .line {
          border-bottom: 1px solid #eee;
        }
        img {
          width: 50px;
          height: 50px;
        }
      }
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
      margin-right: 20px;
      margin-top: 5px;
      .card-warp {
        width: 238px;
        border: 1px solid #eee;
        background-color: #fff;
        padding: 10px 10px 0px 10px;
        .card-top {
          .card--top-left {
            margin-bottom: 10px;
          }
          p {
            font-size: 18px;
          }
          .name {
            color: #9d9d9f;
            font-size: 14px;
          }
        }
        .card-tip {
          color: #9d9d9f;
          font-size: 12px;
          line-height: 24px;
        }
        .line {
          border-bottom: 1px solid #eee;
        }
        img {
          width: 50px;
          height: 50px;
        }
      }
    }
  }
}
</style>
