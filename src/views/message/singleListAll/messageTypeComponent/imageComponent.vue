<!--
 * @Author: your name
 * @Date: 2020-06-19 17:35:09
 * @LastEditTime: 2020-07-24 21:05:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\messageTypeComponent\imageComponent.vue
-->
<template>
  <section class="image-component">
    <div v-if="item.toUser == toUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar :src="item.fromAvatar" />
        <div>
          <div class="img-warp-left revoke-warp" v-if="item.messageMedias">
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
        </div>
      </div>
    </div>
    <div v-if="item.fromUser == toUserId" class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex justify-content-flex-end mb-5">
        <div v-if="item.type == 'revoke'" class="user-select revoke">你撤回了一条消息内容是</div>
        <div class="img-warp-right revoke-warp" v-if="item.messageMedias">
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
  name: "ImageComponent",
  props: {
    item: Object,
    toUserId: String,
    fromUserId: String
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.image-component {
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
  .img-warp-left {
    margin-top: 5px;
    margin-left: 20px;
  }
  .img-warp-right {
    margin-top: 5px;
    margin-right: 20px;
  }
}
</style>
