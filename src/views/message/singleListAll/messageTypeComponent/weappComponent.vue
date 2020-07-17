<!--
 * @Author: your name
 * @Date: 2020-06-19 14:24:40
 * @LastEditTime: 2020-07-17 14:27:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\messageTypeComponent\text.vue
-->
<template>
  <section class="weaapp-component clearfix">
    <div v-if="item.toUser == toUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar :src="item.avatar" />
        <div class="left">
          <div class="card-warp">
            <div class="card-top">
              <div class="display-flex">
                <div class="weapp-icon">
                  <svg-icon icon-class="xiaochengxu" class-name="xiaochengxu-icon" />
                  <span>小程序</span>
                </div>
              </div>
              <div class="title">{{ item.messageMedias[0].title }}</div>
              <div class="des">{{ item.messageMedias[0].description }}</div>
            </div>
            <div class="card-tip">
              <svg-icon icon-class="xiaochengxu" class-name="xiaochengxu-icon" />小程序
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="item.fromUser == toUserId" class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex justify-content-flex-end">
        <div class="right">
          <div class="card-warp">
            <div class="card-top">
              <div class="display-flex">
                <div class="weapp-icon">
                  <svg-icon icon-class="xiaochengxu" class-name="xiaochengxu-icon" />
                  <span>小程序</span>
                </div>
                <div>小程序</div>
              </div>
            </div>
            <div class="card-tip">
              <svg-icon icon-class="xiaochengxu" class-name="xiaochengxu-icon" />小程序
            </div>
          </div>
        </div>
        <el-avatar :src="item.avatar" />
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
    fromUserId: String
  }
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
.left {
  background-color: #fff;
  max-width: 50%;
  left: 20px;
  margin-top: 5px;
  .card-warp {
    min-width: 400px;
    .card-top {
      .title {
        font-size: 18px;
        line-height: 22px;
      }
      .des {
        padding: 10px 20px;
        background-color: #eee;
      }
      .weapp-icon {
        font-size: 18px;
      }
      .xiaochengxu-icon {
        margin-right: 5px;
      }
      p {
        font-size: 18px;
      }
      .name {
        font-size: 14px;
        margin-bottom: 10px;
        line-height: 28px;
        border-bottom: 1px solid #ddd;
      }
    }
    .card-tip {
      line-height: 20px;
      .xiaochengxu-icon {
        color: #808dde;
        margin-right: 5px;
      }
    }
    img {
      width: 68px;
      height: 68px;
    }
  }
}
.right {
  /*使左右的对话框分开*/
  max-width: 50%;
  top: 5px;
  left: -20px;
  background-color: #fff;
  .card-warp {
    min-width: 400px;
    .card-top {
      .weapp-icon {
        font-size: 18px;
      }
      .xiaochengxu-icon {
        margin-right: 5px;
      }
      p {
        font-size: 18px;
      }
      .name {
        font-size: 14px;
        margin-bottom: 10px;
        line-height: 28px;
        border-bottom: 1px solid #ddd;
      }
    }
    .card-tip {
      line-height: 20px;
      .xiaochengxu-icon {
        color: #808dde;
        margin-right: 5px;
      }
    }
    img {
      width: 68px;
      height: 68px;
    }
  }
}
.left > div,
.right > div {
  margin: 10px 20px;
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
  border-right: 8px solid #f4f4f5;
  left: -16px;
}
.right:after {
  border-left: 8px solid #eee;
  right: -16px;
}

.weaapp-component {
  .left-warp,
  .right-warp {
    > p {
      text-align: center;
    }
  }
}
</style>
