<!--
 * @Author: your name
 * @Date: 2020-07-25 17:44:32
 * @LastEditTime: 2020-09-02 20:27:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\message\singleListAll\messageTypeComponent\chatrecordComponent.vue
--> 
<template>
  <section class="chatrecord-component clearfix">
    <div v-if="item.fromUser != fromUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar :src="item.fromAvatar" />
        <div class="left">
          <div class="chat-name">{{item.fromUser != fromUserId?item.fromName:item.toName}}</div>
          <div class="revoke-content" v-show="item.revokeType">你撤回了一条消息：</div>
          <div class="chat-record-title">{{item.title}}的聊天记录</div>
          <ul>
            <li v-for="(msg,index) in item.messageMedias" :key="index" class="display-flex">
              <span>：</span>
              <p
                class="text-over-2"
              >{{ msg.msgType =='text' ? msg.content:msg.fileName + chatContentType[msg.msgType]}}</p>
            </li>
          </ul>
          <div class="line"></div>
          <div v-show="item" class="show-more" @click="handleClickViewMore(item)">查看更多</div>
        </div>
      </div>
    </div>
    <div v-else class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex justify-content-flex-end">
        <div class="right">
          <div class="chat-name" style="text-align:right">{{item.fromName}}</div>
          <div class="revoke-content" v-show="item.revokeType">你撤回了一条消息：</div>
          <div class="chat-record-title">{{item.title}}的聊天记录</div>
          <ul>
            <li v-for="(msg,index) in item.messageMedias" :key="index" class="display-flex">
              <span>：</span>
              <p
                class="text-over-2"
              >{{ msg.msgType =='text' ? msg.content:msg.fileName + chatContentType[msg.msgType]}}</p>
            </li>
          </ul>
          <div class="line"></div>
          <div v-show="item" class="show-more" @click="handleClickViewMore(item)">查看更多</div>
        </div>
        <el-avatar :src="item.fromAvatar" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "TextComponent",
  props: {
    item: Object,
    toUserId: String,
    fromUserId: String,
  },
  computed: {
    ...mapState({
      chatContentType: (state) => state.enum.chatContentType,
    }),
  },
  mounted() {},
  methods: {
    handleClickViewMore(item) {
      this.$emit("handleClickViewMore", item);
    },
  },
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
          width: 260px;
          color: #b2b2b2;
          font-size: 13px;
          line-height: 16px;
          p {
            max-height: 32px;
            width: 200px;
            font-size: 13px;
            line-height: 16px;
          }
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
      .show-more:hover {
        cursor: pointer;
        color: #1890ff;
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
          width: 260px;
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
      .show-more:hover {
        cursor: pointer;
        color: #1890ff;
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
  // cursor: pointer;
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
