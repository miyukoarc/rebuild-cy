<!--
 * @Author: your name
 * @Date: 2020-07-27 15:26:03
 * @LastEditTime: 2020-07-28 19:02:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\views\message\singleListAll\messageTypeComponent\locationComponent.vue
--> 
<template>
  <section class="revoke-component clearfix">
    <div v-if="item.toUser == toUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar :src="item.fromAvatar" />
        <div class="left amap-page-container">
          <div class="revoke-content" v-show="item.revokeType">你撤回了一条消息：</div>
          <div id="mapa" class="map-container">
            <!-- <div id="container-left"></div> -->
            <el-amap class="amap-box" ref="amap" :zoom="zoom" :center="center" >
              <el-amap-marker
                v-for="marker in markers"
                :position="marker.position"
                :key="marker.id"
                :icon="marker.icon"
              ></el-amap-marker>
            </el-amap>
            <div class="address">
              <span>{{item.messageMedias[0].title}}</span>
              <p>{{item.messageMedias[0].address}}</p>
            </div>
          </div>
          <!-- <el-amap vid="amap"></el-amap> -->
        </div>
      </div>
    </div>
    <div v-if="item.fromUser == toUserId" class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex justify-content-flex-end">
        <div class="right amap-page-container">
          <div class="revoke-content" v-show="item.revokeType">你撤回了一条消息：</div>
          <div id="mapa" class="map-container">
            <!-- <div id="container-right"></div> -->
            <!-- <el-amap class="amap-box" ref="amap" :zoom="zoom" :center="center" :events="events"> -->
              <el-amap class="amap-box" ref="amap" :zoom="zoom" :center="center">
              <el-amap-marker
                v-for="marker in markers"
                :position="marker.position"
                :key="marker.id"
                :icon="marker.icon"
              ></el-amap-marker>
            </el-amap>
            <div class="address">
              <span>{{item.messageMedias[0].title}}</span>
              <p>{{item.messageMedias[0].address}}</p>
            </div>
          </div>
        </div>
        <el-avatar :src="item.fromAvatar" />
      </div>
    </div>
  </section>
</template>

<script>
// import { amapManager } from "vue-amap";
// let amapManager = new VueAMap.AMapManager();
// import MapLoader from "@/assets/js/AMap.js";

export default {
  name: "TextComponent",
  props: {
    item: Object,
    toUserId: String,
    fromUserId: String,
  },
  data() {
    return {
      center: [121.539693, 31.126667], //地图中心点坐标
      zoom: 16, //初始化地图显示层级
      events: {
        init(o) {
          // console.log(o, "00000");
        },
        zoomchange: (e) => {
          // console.log(e);
        },
        zoomend: (e) => {
          //获取当前缩放zoom值
          // console.log(this.$refs.amap.$$getInstance().getZoom());
          // console.log(e);
        },
        click: (e) => {
          // alert("map clicked");
        },
      },
      markers: [
        {
          position: [121.539693, 31.126667],
          icon: "",
          visible: true,
        },
      ],
      // plugin: [
      //   {
      //     pName: "Scale",
      //     events: {
      //       init(instance) {
      //         console.log(instance);
      //       },
      //     },
      //   },
      //   {
      //     pName: "ToolBar",
      //     events: {
      //       init(instance) {
      //         console.log(instance);
      //       },
      //     },
      //   },
      // ],
    };
  },

  created() {
    // this.initMap();
  },
  mounted() {
    // var map = new AMap.Map("container-left", {
    //   zoom: 11, //级别
    //   center: [116.397428, 39.90923], //中心点坐标
    //   viewMode: "3D", //使用3D视图
    // });

    // var map = new AMap.Map("container-right", {
    //   zoom: 11, //级别
    //   center: [116.397428, 39.90923], //中心点坐标
    //   viewMode: "3D", //使用3D视图
    // });

    document.addEventListener(
      "touchmove",
      function (event) {
        event.preventDefault();
      },
      {
        passive: false,
      }
    );

    this.markers.forEach((item) => {
      this.$nextTick(() => {
        this.center = [
          this.item.messageMedias[0].longitude,
          this.item.messageMedias[0].latitude,
        ];
        item.position = [
          this.item.messageMedias[0].longitude,
          this.item.messageMedias[0].latitude,
        ];
      });
    });
  },
  methods: {
    // initMap() {
    //   let that = this;
    //   MapLoader().then(
    //     (AMap) => {
    //       console.log("地图加载成功");
    //       that.map = new AMap.Map("mapa", {
    //         center: [117.000923, 36.675807],
    //         zoom: 11,
    //       });
    //     },
    //     (e) => {
    //       console.log("地图加载失败", e);
    //     }
    //   );
    // },
  },
};
</script>

<style lang="scss" scoped>
.amap-box,
.AMap.Map {
  touch-action: none;
}
.amap-demo {
  height: 300px;
}
.left,
.right {
  min-height: 35px;
  position: relative;
  display: table;
  text-align: center;
  border-radius: 5px;
}
.left {
  max-width: 50%;
  left: 20px;
  top: 8px;
}
.right {
  /*使左右的对话框分开*/
  max-width: 50%;
  left: -20px;
  top: 8px;
}
.left > span,
.right > span {
  /*使内容居中*/
  display: table-cell;
  vertical-align: middle;
  padding: 5px 10px;
  text-align: left;
  font-size: 13px;
  line-height: 14px;
}
// .left:before,
// .right:after {
//   /*用伪类写出小三角形*/
//   content: "";
//   display: block;
//   width: 0;
//   height: 0;
//   border: 8px solid transparent;
//   position: absolute;
//   top: 5px;
// }
/*分别给左右两边的小三角形定位*/
// .left:before {
//   border-right: 8px solid #fff;
//   left: -16px;
// }
// .right:after {
//   border-left: 8px solid #d7d7d7;
//   right: -16px;
// }

.revoke-component {
  margin: 0 10px 20px 10px;
  .map-container {
    position: relative;
    width: 295px;
    height: 185px;
    .address {
      width: 295px;
      height: 32px;
      position: absolute;
      z-index: 999;
      bottom: 0;
      left: 0;
      color: #fff;
      text-align: left;
      text-indent: 1em;
      line-height: 16px;
      font-size: 12px;
      background-color: rgba(0, 0, 0, 0.7);
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
    }
  }
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
  .revoke-text {
    background-color: #d7d7d7;
    color: #fff;
    border-radius: 5px;
  }
}
</style>
