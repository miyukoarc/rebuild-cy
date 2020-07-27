<!--
 * @Author: your name
 * @Date: 2020-07-25 17:44:32
 * @LastEditTime: 2020-07-25 18:18:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\message\singleListAll\messageTypeComponent\chatrecordComponent.vue
--> 
<template>
  <section class="chatrecord-component clearfix">
    <div v-if="item.toUser == toUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar :src="item.fromAvatar" />
        <div class="left">
          <div class="chat-record-title">{{item.fromName}}和{{item.toName}}的聊天记录</div>
          <ul>
            <li>{{item.fromName}}：44333333</li>
            <li>{{item.toName}}：44333333</li>
          </ul>
          <div class="line"></div>
          <div v-show="item" class="show-more">查看更多</div>
        </div>
      </div>
    </div>
    <div v-if="item.fromUser == toUserId" class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex justify-content-flex-end">
        <div class="right">
          <div class="chat-record-title">{{item.fromName}}和{{item.toName}}的聊天记录</div>
          <ul>
            <li>{{item.fromName}}：44333333</li>
            <li>{{item.toName}}：44333333</li>
          </ul>
          <div class="line"></div>
          <div v-show="item" class="show-more">查看更多</div>
        </div>
        <el-avatar :src="item.fromAvatar" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TextComponent",
  props: {
    item: Object,
    toUserId: String,
    fromUserId: String,
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.chatrecord-component {
  margin: 0 10px 20px 10px;
  .left-warp {
    > p {
      font-size: 13px;
      line-height: 18px;
      text-align: left;
    }
    .left {
      background-color: #fff;
      border: 1px solid #edeef0;
      max-width: 50%;
      left: 20px;
      top: 5px;
      padding: 10px 10px 0px 10px;
      .chat-record-title {
        font-size: 14px;
        line-height: 16px;
        font-weight: 600;
        margin-bottom: 10px;
      }
      ul {
        margin-bottom: 5px;
        li {
          color: #b2b2b2;
          font-size: 13px;
          line-height: 16px;
        }
      }
      .line {
        border-bottom: 1px solid #eee;
      }
      .show-more {
        font-size: 12px;
        line-height: 24px;
        color: #666;
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
      background-color: #fff;
      border: 1px solid #edeef0;
      max-width: 50%;
      right: 20px;
      top: 5px;
      padding: 10px 10px 0px 10px;
      .chat-record-title {
        font-size: 14px;
        line-height: 16px;
        font-weight: 600;
        margin-bottom: 10px;
      }
      ul {
        margin-bottom: 5px;
        li {
          color: #b2b2b2;
          font-size: 13px;
          line-height: 16px;
        }
      }
      .line {
        border-bottom: 1px solid #eee;
      }
      .show-more {
        font-size: 12px;
        line-height: 24px;
        color: #666;
      }
    }
  }
}

.left,
.right {
  min-height: 35px;
  position: relative;
  display: table;
  border-radius: 5px;
}

.right:hover,
.left:hover {
  cursor: pointer;
  // background-color: #f2f3f5;
  &:before {
    // border-right: 8px solid #f2f3f5;
  }
}

.left > span,
.right > span {
  /*使内容居中*/
  display: table-cell;
  vertical-align: middle;
  padding: 5px 10px;
  text-align: left;
  font-size: 13px;
  line-height: 14px;
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
  top: 5px;
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
</style>
