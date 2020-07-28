<!--
 * @Author: your name
 * @Date: 2020-06-19 14:24:40
 * @LastEditTime: 2020-07-28 16:38:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\messageTypeComponent\text.vue
-->
<template>
  <section class="weaapp-component clearfix">
    <div v-if="item.toUser == toUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="weaapp-warp display-flex">
        <el-avatar :src="item.fromAvatar" />
        <div class="left">
          <div class="revoke-content" v-show="item.revokeType">你撤回了一条消息：</div>
          <div class="card-warp">
            <div class="card-top">
              <div class="weapp-icon">
                <!-- <img :src='' alt /> -->
                <svg-icon icon-class="xiaochengxu" class-name="xiaochengxu-icon" />
                <span>{{item.messageMedias[0].displayName}}</span>
              </div>
              <strong class="title">{{ item.messageMedias[0].title }}</strong>
              <div class="des">
                <span>{{ item.messageMedias[0].description }}</span>
              </div>
            </div>
            <div class="line"></div>
            <div class="app-type">
              <svg-icon icon-class="xiaochengxu" class-name="xiaochengxu-icon" />小程序
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="item.fromUser == toUserId" class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="weaapp-warp display-flex justify-content-flex-end">
        <div class="right">
          <div class="revoke-content" v-show="item.revokeType">你撤回了一条消息：</div>
          <div class="card-warp">
            <div class="card-top">
              <div class="weapp-icon">
                <!-- <img :src='' alt /> -->
                <svg-icon icon-class="xiaochengxu" class-name="xiaochengxu-icon" />
                <span>{{item.messageMedias[0].displayName}}</span>
              </div>
              <strong class="title">{{ item.messageMedias[0].title }}</strong>
              <div class="des">
                <span>{{item.messageMedias[0].description }}</span>
              </div>
            </div>
            <div class="line"></div>
            <div class="app-type">
              <svg-icon icon-class="xiaochengxu" class-name="xiaochengxu-icon" />小程序
            </div>
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
.weaapp-component {
  margin: 0 10px 20px 10px;
  .left-warp {
    > p {
      font-size: 13px;
      line-height: 18px;
      text-align: left;
    }
    .left {
      margin-left: 20px;
      margin-top: 5px;
      .card-warp {
        width: 238px;
        border: 1px solid #eee;
        background-color: #fff;
        padding: 0px 15px;
        .card-top {
          margin-top: 5px;
          .title {
            font-size: 14px;
            line-height: 14px;
          }
          .des {
            margin: 10px 0;
            width: 205px;
            height: 175px;
            background-color: #eee;
            font-size: 14px;
            line-height: 16px;
            span {
              padding: 5px 10px;
            }
          }
          .weapp-icon {
            margin-bottom: 10px;
            img {
              width: 20px;
              height: 20px;
              border-radius: 100%;
              background-color: #323425;
            }
            span {
              font-size: 13px;
              color: #9399a5;
            }
          }
        }
        .line {
          border-bottom: 1px solid #eee;
        }
        .app-type {
          line-height: 28px;
          font-size: 12px;
          color: #898989;
          .xiaochengxu-icon {
            color: #808dde;
            font-size: 14px;
            margin-right: 5px;
          }
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
      margin-right: 20px;
      margin-top: 5px;
      .card-warp {
        width: 238px;
        border: 1px solid #eee;
        background-color: #fff;
        padding: 0px 15px;
        .card-top {
          margin-top: 5px;
          .title {
            font-size: 14px;
            line-height: 14px;
          }
          .des {
            margin: 10px 0;
            width: 205px;
            height: 175px;
            background-color: #eee;
            font-size: 14px;
            line-height: 16px;
            span {
              padding: 0 10px;
            }
          }
          .weapp-icon {
            margin-bottom: 10px;
            img {
              width: 20px;
              height: 20px;
              border-radius: 100%;
              background-color: #323425;
            }
            span {
              font-size: 13px;
              color: #9399a5;
            }
          }
        }
        .line {
          border-bottom: 1px solid #eee;
        }
        .app-type {
          line-height: 28px;
          font-size: 12px;
          color: #898989;
          .xiaochengxu-icon {
            color: #808dde;
            font-size: 14px;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
