<!--
 * @Author: your name
 * @Date: 2020-07-27 11:09:43
 * @LastEditTime: 2020-07-27 15:35:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\message\singleListAll\messageTypeComponent\revokeComponent.vue
--> 
<template>
  <section class="revoke-component clearfix">
    <div v-if="item.toUser == toUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar :src="item.fromAvatar" />
        <div class="left">
          <span class="revoke-text">你撤回了一条消息</span>
        </div>
      </div>
    </div>
    <div v-if="item.fromUser == toUserId" class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex justify-content-flex-end">
        <div class="right">
          <span class="revoke-text">你撤回了一条消息</span>
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
  text-align: center;
  border-radius: 5px;
}
.left {
  background-color: #d7d7d7;
  max-width: 50%;
  left: 20px;
  top: 8px;
}
.right {
  /*使左右的对话框分开*/
  max-width: 50%;
  left: -20px;
  top: 8px;
  background-color: #d7d7d7;
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
  border-left: 8px solid #d7d7d7;
  right: -16px;
}

.revoke-component {
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
  .revoke-text {
    background-color: #d7d7d7;
    color: #fff;
    border-radius: 5px;
  }
}
</style>
