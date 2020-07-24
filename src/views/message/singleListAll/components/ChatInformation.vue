<!--
 * @Author: your name
 * @Date: 2020-07-15 15:08:24
 * @LastEditTime: 2020-07-24 15:35:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\message\singleListAll\components\ChatInfomation.vue
--> 
<template>
  <div class="chat-info display-flex align-items-center">
    <img
      v-if="currnetMember.chatType != 'ROOM'"
      :src="name == currnetMember.fromName? currnetMember.toAvatar:currnetMember.fromAvatar"
      alt
    />
    <div v-else class="group-list-left flex-column-center-alinecenter">
      <svg-icon icon-class="groupChat" class="svg-icon" />
      <p style="margin:0px;">群聊</p>
    </div>
    <div class="flex-1">
      <p>
        <span>{{name == currnetMember.fromName? currnetMember.toName:currnetMember.fromName}}</span>
        <span>@微信</span>
      </p>
      <div
        v-show="currnetMember.toName || currnetMember.fromName"
      >昵称：{{name == currnetMember.fromName? currnetMember.toName:currnetMember.fromName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currnetMember: {
      type: Object,
      default: () => {}
    },
    name: String
  },
  mounted() {
    console.log(this.currnetMember, "CURR", this.name);
  }
};
</script>

<style lang="scss" scoped>
.chat-info {
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