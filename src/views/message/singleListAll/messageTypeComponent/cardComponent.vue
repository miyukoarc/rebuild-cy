<!--
 * @Author: your name
 * @Date: 2020-06-19 14:24:40
 * @LastEditTime: 2020-06-22 19:11:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\messageTypeComponent\text.vue
-->
<template>
  <section class="card-component clearfix">
    <div v-if="item.toUserId == toUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <div class="left">
          <div>{{ item.msgContent }}</div>
        </div>
      </div>
    </div>
    <div v-if="item.fromUser == toUserId" class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex justify-content-flex-end">
        <div class="right">
          <div class="card-warp">
            <div class="card-top">
              <div class="display-flex justify-content-space-between">
                <p>腾讯</p>
                <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt>
              </div>
              <strong>ddasdfasdfadf</strong>
              <p class="name">陆浩然</p>
            </div>
            <div class="card-tip">个人名片</div>
          </div>
        </div>
        <el-avatar icon="el-icon-user-solid" />
      </div>
    </div>
  </section>
</template>

<script>
export default{
  name:'CardComponent',
  props:{
    item:Object,
    toUserId:String,
    fromUserId:String
  }
}
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
  background-color: #f4f4f5;
  max-width: 50%;
  left: 20px;
  margin-top: 5px;
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

.card-component {
  .left-warp,
  .right-warp {
    > p {
      text-align: center;
    }
  }
}
</style>
