<!--
 * @Author: your name
 * @Date: 2020-06-22 11:16:30
 * @LastEditTime: 2020-06-28 10:50:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\messageTypeComponent\ddd.vue
-->
<template>
  <section class="agree-component clearfix">
    <div v-if="item.toUserId == toUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <div class="left display-flex justify-content-center">
          <span>对方{{ item.agree?'同意':'不同意' }}存档会话内容,你{{ item.agree?'可以':'将无法' }}继续提供服务</span>
        </div>
      </div>
    </div>
    <div v-if="item.fromUser == fromUserId" class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex justify-content-flex-end">
        <div class="right display-flex justify-content-center align-items-center">
          <span>对方{{ item.agree?'同意':'不同意' }}存档会话内容,你{{ item.agree?'可以':'将无法' }}继续提供服务</span>
        </div>
        <el-avatar icon="el-icon-user-solid" />
      </div>
    </div>
  </section>
</template>

<script>
export default{
  name:'agreeComponent',
  props:{
    item:Object,
    toUserId:String,
    fromUserId:String
  }
}
</script>

<style lang="scss" scoped>
.agree-component {
  .right-warp,
  .left-warp {
    > p {
      text-align: center;
    }
  }
  .left,
  .right {
    width: 100%;
    text-align: center;
  }
  .left {
    span {
      margin-top: 5px;
      padding: 5px 10px;
      background-color: #e9eaed;
      border-radius: 5px;
    }
  }
  .right {
    span {
      margin-top: 5px;
      padding: 5px 10px;
      background-color: #e9eaed;
      border-radius: 5px;
    }
  }
}
</style>
