<!--
 * @Author: your name
 * @Date: 2020-07-15 15:08:24
 * @LastEditTime: 2020-07-15 15:41:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\message\singleListAll\components\ChatInfomation.vue
--> 
<template>
  <div class="chat-info display-flex align-items-center">
    <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt />
    <div class="flex-1">
      <p>
        <span>林天华</span>
        <span>@微信</span>
      </p>
      <div>昵称：悍然</div>
    </div>
  </div>
</template>

<script>
export default {};
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
}
</style>