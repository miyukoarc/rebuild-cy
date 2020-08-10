<!--
 * @Author: your name
 * @Date: 2020-07-15 15:08:24
 * @LastEditTime: 2020-08-08 12:31:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\message\singleListAll\components\ChatInfomation.vue
--> 
<template>
  <div class="chat-info display-flex align-items-center">
    <img
      v-if="currnetMember.chatType != 'ROOM'"
      :src="currnetMember._id == currnetMember.fromUserId?currnetMember.fromAvatar: currnetMember.toAvatar"
      alt
    />
    <div v-else class="group-list-left flex-column-center-alinecenter">
      <svg-icon icon-class="groupChat" class="svg-icon" />
      <p style="margin:0px;">群聊</p>
    </div>
    <div class="flex-1">
      <p>
        <span
          v-if="currnetMember.chatType != 'ROOM'"
        >{{currnetMember._id == currnetMember.fromUserId?currnetMember.fromName: currnetMember.toName}}</span>
        <span v-else>{{currnetMember.groupName}}</span>
        <!-- <span>@微信</span> -->
      </p>
      <div
        v-show="currnetMember.toName || currnetMember.fromName"
      >昵称：{{currnetMember._id == currnetMember.fromUserId?currnetMember.fromName: currnetMember.toName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currnetMember: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    console.log(this.currnetMember, "CURR");
  },
};
</script>

<style lang="scss" scoped>
.chat-info {
  padding: 0 20px;
  height: 70px;
  font-size: 14px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 10px;
  }
  div {
    p {
      margin-bottom: 10px;
    }
  }
  .group-list-left {
    width: 40px;
    height: 40px;
    text-align: center;
    background-color: #1890ff;
    border-radius: 100%;
    margin-right: 20px;
    color: #fff;
    .svg-icon {
      font-size: 20px;
    }
    > p {
      font-size: 12px;
      line-height: 14px;
    }
  }
}
</style>