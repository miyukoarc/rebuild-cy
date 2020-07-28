<!--
 * @Author: your name
 * @Date: 2020-06-19 18:01:25
 * @LastEditTime: 2020-07-24 20:20:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\messageTypeComponent\videoComponent.vue
-->
<template>
  <section class="emotion-component">
    <div v-if="item.toUser == toUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar :src="item.fromAvatar" />
        <div>
          <div class="img-warp revoke-warp mb-5 ml-20" v-if="item.messageMedias">
            <el-popover placement="right" title trigger="hover">
              <img
                :src="item.messageMedias[0].file"
                style="width:400px;height:400px;margin-left:20px"
              />
              <img
                slot="reference"
                :src="item.messageMedias[0].file"
                alt
                style="max-height: 100px;max-width: 150px"
              />
            </el-popover>
          </div>
        </div>
      </div>
    </div>
    <div v-if="item.fromUser == toUserId" class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex justify-content-flex-end mb-5">
        <div v-if="item.type == 'revoke'" class="user-select revoke">你撤回了一条消息内容是</div>
        <div class="img-warp revoke-warp mr-20" v-if="item.messageMedias">
          <el-popover placement="right" title trigger="hover">
            <img :src="item.messageMedias[0].file" style="width:400px;height:400px" />
            <img
              slot="reference"
              :src="item.messageMedias[0].file"
              alt
              style="max-height: 100px;max-width: 150px"
            />
          </el-popover>
        </div>
        <el-avatar :src="item.fromAvatar" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "EmotionComponent",
  props: {
    item: Object,
    toUserId: String,
    fromUserId: String
  }
};
</script>

<style lang="scss" scoped>
.emotion-component {
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
}
.img-warp {
  margin-top: 5px;
}
</style>
