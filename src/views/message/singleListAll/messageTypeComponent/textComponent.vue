<!--
 * @Author: your name
 * @Date: 2020-06-19 14:24:40
 * @LastEditTime: 2020-07-28 16:01:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\messageTypeComponent\text.vue
-->
<template>
  <section class="text-component clearfix">
    <div v-if="item.toUser == toUserId" class="text-left">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar :src="item.fromAvatar" />
        <div style="margin-right:20px;margin-top:5px">
          <div class="revoke-content" v-show="item.revokeType">你撤回了一条消息：</div>
          <div class="right">
            <span>{{ item.msgContent }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="item.fromUser == toUserId" class="text-right">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex justify-content-flex-end">
        <div style="margin-right:20px;margin-top:5px">
          <div class="revoke-content" v-show="item.revokeType">你撤回了一条消息：</div>
          <div class="right">
            <span>{{ item.msgContent }}</span>
          </div>
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
.left,
.right {
  min-height: 35px;
  position: relative;
  display: table;
  // text-align: center;
  border-radius: 5px;
}
.left {
  background-color: #fff;
  max-width: 50%;
  left: 20px;
  top: 8px;
}
.right {
  /*使左右的对话框分开*/
  // max-width: 50%;
  // left: -20px;
  // top: 8px;
  background-color: #cce4fc;
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
  border-left: 8px solid #cce4fc;
  right: -16px;
}

.text-component {
  margin: 0 10px 20px 10px;
  .text-left {
    > p {
      font-size: 13px;
      line-height: 18px;
      text-align: left;
    }
  }
  .text-right {
    > p {
      font-size: 13px;
      line-height: 18px;
      text-align: right;
    }
  }
}
</style>
