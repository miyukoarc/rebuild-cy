<!--
 * @Author: your name
 * @Date: 2020-07-28 13:56:39
 * @LastEditTime: 2020-08-07 16:52:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\message\singleListAll\messageTypeComponent\disagreeComponent.vue
--> 
<template>
  <section class="disagree-component clearfix">
    <div v-if="item.fromUser != fromUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar :src="item.fromAvatar" />
        <div class="left display-flex justify-content-center">
          <span>对方不同意存档会话内容,你将无法继续提供服务</span>
        </div>
      </div>
    </div>
    <div v-else class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex justify-content-flex-end">
        <div class="right display-flex justify-content-center align-items-center">
          <span>对方不同意存档会话内容,你将无法继续提供服务</span>
        </div>
        <el-avatar :src="item.fromAvatar" />
      </div>
    </div>
  </section>
</template>

<script>
export default{
  name:'disagreeComponent',
  props:{
    item:Object,
    toUserId:String,
    fromUserId:String
  }
}
</script>

<style lang="scss" scoped>
.disagree-component {
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
