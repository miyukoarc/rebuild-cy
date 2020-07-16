<!--
 * @Author: your name
 * @Date: 2020-07-15 14:16:35
 * @LastEditTime: 2020-07-15 22:41:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\message\singleListAll\components\ChatSideBarItem.vue
--> 
<template>
  <li class="item display-flex align-items-center"  :class="{ 'active' : active }">
    <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt />
    <div class="flex-1">
      <p class="display-flex justify-content-space-between">
        <strong>{{item.name}}</strong>
        <span>{{item.time}}</span>
      </p>
      <div class="text-over">{{item.content}}</div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      }
    },
    active:Boolean
  },
  watch: {},
  data() {
    return {
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
li {
  height: 60px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  line-height: 14px;
  padding: 0 10px;
  > img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin-right: 20px;
  }
  div {
    > p {
      margin-bottom: 10px;
      span {
        font-size: 12px;
      }
    }
    .text-over {
      font-size: 13px;
      color: #777;
    }
  }
}
li:hover {
  background-color: #eee;
  cursor: pointer;
}
.active {
  background-color: #eee;
}
</style>