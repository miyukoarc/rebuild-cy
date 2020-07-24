<!--
 * @Author: your name
 * @Date: 2020-06-22 13:50:04
 * @LastEditTime: 2020-07-24 16:04:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\messageTypeComponent\linkComponent.vue
-->
<template>
  <section class="link-component clearfix">
    <div v-if="item.toUserId == toUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <div class="left">
          <span>
            <a>{{ item.msgContent }}</a>
          </span>
        </div>
      </div>
    </div>
    <div v-if="item.fromUser == toUserId" class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex justify-content-flex-end">
        <div class="right">
          <span>
            <a>{{ item.msgContent }}</a>
          </span>
        </div>
        <el-avatar icon="el-icon-user-solid" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LinkComponent",
  props: {
    item: Object,
    toUserId: String,
    fromUserId: String
  }
};
</script>

<style lang="scss" scoped>
.left,
.right {
  min-height: 40px;
  position: relative;
  display: table;
  text-align: center;
  border-radius: 5px;
  span {
    a {
      color: #1890ff;
    }
  }
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
  background-color: #9eea6a;
}
.left > span,
.right > span {
  /*使内容居中*/
  display: table-cell;
  vertical-align: middle;
  padding: 5px 10px;
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
  border-left: 8px solid #9eea6a;
  right: -16px;
}

.link-component {
  margin-bottom: 10px;
  .left-warp {
    > p {
      font-size: 13px;
      line-height: 18px;
      text-align: left;
    }
  }
  .right-warp {
    margin-right: 5px;
    > p {
      font-size: 13px;
      line-height: 18px;
      text-align: right;
    }
  }
}
</style>
