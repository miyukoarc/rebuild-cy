<!--
 * @Author: your name
 * @Date: 2020-07-15 11:31:01
 * @LastEditTime: 2020-07-15 22:42:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\message\singleListAll\components\ChatSideBar.vue
--> 
<template>
  <div class="chat-side-bar">
    <div class="chat-top-warp display-flex align-items-center">
      <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt />
      <div>
        <strong>超盈客服--薛强</strong>
      </div>
    </div>
    <div class="chat-side-bar-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="side-bar-search flex-between-alinecenter">
          <span style="font-size:13px">共有1899位好友</span>
          <div style="width:150px">
            <el-autocomplete
              size="mini"
              class="inline-input"
              v-model="sideBarsearchValue"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="handleSelect"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-autocomplete>
            <!-- <el-input placeholder="请输入内容" size="mini" v-model="sideBarsearchValue">
              <i slot="prefix" class="el-input__icon el-icon-search" @click="handleClickSearch"></i>
            </el-input>-->
          </div>
        </div>
        <el-tab-pane v-for="(tab,index) in tabs" :key="index" :label="tab.label" :name="tab.name">
          <ul class="all-chat chat-warp" v-if="tab.name == activeName">
            <chat-side-bar-item
              :active="activeIdx===itemIndex ? true : false"
              v-for="(item,itemIndex) in chatSideData"
              :key="itemIndex"
              :item="item"
              @click.native="a(item,itemIndex)"
            ></chat-side-bar-item>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import ChatSideBarItem from "./ChatSideBarItem.vue";
export default {
  name: "chatSideBar",
  components: {
    ChatSideBarItem
  },
  data() {
    return {
      activeIdx:0,
      // 聊天侧边顶部切换
      activeName: "1",
      tabs: [
        {
          label: "全部",
          name: "1"
        },
        {
          label: "外部",
          name: "2"
        },
        {
          label: "群聊",
          name: "3"
        }
      ],
      sideBarsearchValue: "",
      active: "",
      chatSideData: [
        {
          name: "超盈客服--薛强",
          time: "12-21",
          content: "你大法师打发斯蒂芬"
        },
        {
          name: "超盈客服--陆浩然",
          time: "12-22",
          content: "阿斯顿发送到发送到发"
        },
        {
          name: "超盈客服--陆浩然",
          time: "12-22",
          content: "阿斯顿发送到发送到发"
        },
        {
          name: "超盈客服--陆浩然",
          time: "12-22",
          content: "阿斯顿发送到发送到发"
        },
        {
          name: "超盈客服--陆浩然",
          time: "12-22",
          content: "阿斯顿发送到发送到发"
        },
        {
          name: "超盈客服--陆浩然",
          time: "12-22",
          content: "阿斯顿发送到发送到发"
        },
        {
          name: "超盈客服--陆浩然",
          time: "12-22",
          content: "阿斯顿发送到发送到发"
        }
      ]
    };
  },
  created() {},
  methods: {
    handleClick() {},
    handleClickSearch() {
      console.log("搜索s");
    },
    // handleClickItem(index, e) {
    //   console.log(e, "44", index);
    // },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    a(item,index){
      this.activeIdx=index;
      console.log(item,index,'333')
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-side-bar {
  border: 1px solid #eee;
  border-right: none;
  .chat-top-warp {
    margin: 10px 10px;
    > img {
      width: 50px;
      height: 50px;
      border-radius: 100%;
      margin-right: 10px;
    }
  }
  .chat-side-bar-content {
    .side-bar-search {
      margin-bottom: 5px;
      padding: 0 10px;
    }
    .chat-warp {
      overflow-y: scroll;
      height: 65vh;
    }
    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: rgba(144, 147, 153, 0.3);
      border-radius: 3px;
    }
  }
}
</style>

<style lang="scss">
.chat-side-bar {
  .el-tabs__nav {
    text-align: center;
    width: 100%;
  }
  .el-tabs__active-bar {
    left: 52px;
  }
  .list-single .el-tabs__content {
    background-color: #fff;
  }
}
</style>