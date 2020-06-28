<!--
 * @Author: your name
 * @Date: 2020-06-19 19:44:55
 * @LastEditTime: 2020-06-22 19:13:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\messageTypeComponent\videoComponent.vue
-->
<template>
  <div class="video-component">
    <div v-if="item.toUserId == toUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <div class="left">
          <div class="demo">
            <video-player
              ref="videoPlayer"
              class="video-player vjs-custom-skin"
              style="object-fit:fill"
              :playsinline="true"
              :x5-video-player-fullscreen="true"
              :options="playerOptions(item,1)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="item.fromUser == fromUserId" class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex justify-content-flex-end">
        <div class="demo user-select right">
          <video-player
            ref="videoPlayer"
            class="video-player vjs-custom-skin"
            style="object-fit:fill"
            :playsinline="true"
            :x5-video-player-fullscreen="true"
            :options="playerOptions(item,2)"
          />
        </div>
        <el-avatar icon="el-icon-user-solid" />
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name:'VideoComponent',
  props:{
    item:Object,
    toUserId:String,
    fromUserId:String
  },
  data() {
    return{
      lPlayerOptions:{
        // 播放速度
        playbackRates:[0.5,1.0,1.5,2.0],
        // 如果true,浏览器准备好时开始回放。
        autoplay:false,
        // 默认情况下将会消除任何音频。
        muted:false,
        // 导致视频一结束就重新开始。
        loop:false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload:'auto',
        language:'zh-CN',
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio:'16:9',
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid:true,
        sources:[
          {
            // 类型
            type:'video/mp4',
            // url地址
            src:''
          }
        ],
        // 你的封面地址
        // poster: require("../../static/2.jpg"),
        // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage:'此视频暂无法播放，请稍后再试',
        controlBar:{
          timeDivider:true,
          durationDisplay:true,
          remainingTimeDisplay:false,
          // 全屏按钮
          fullscreenToggle:true
        }
      },
      rPlayerOptions:{
        // 播放速度
        playbackRates:[0.5,1.0,1.5,2.0],
        // 如果true,浏览器准备好时开始回放。
        autoplay:false,
        // 默认情况下将会消除任何音频。
        muted:false,
        // 导致视频一结束就重新开始。
        loop:false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload:'auto',
        language:'zh-CN',
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio:'16:9',
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid:true,
        sources:[
          {
            // 类型
            type:'video/mp4',
            // url地址
            src:''
          }
        ],
        // 你的封面地址
        // poster: require("../../static/2.jpg"),
        // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage:'此视频暂无法播放，请稍后再试',
        controlBar:{
          timeDivider:true,
          durationDisplay:true,
          remainingTimeDisplay:false,
          // 全屏按钮
          fullscreenToggle:true
        }
      }
    }
  },
  methods:{
    playerOptions(list,tag) {
      if(tag == 1) {
        this.lPlayerOptions.sources[0].src = list.medias[0].file
        return this.lPlayerOptions
      }else{
        this.rPlayerOptions.sources[0].src = list.medias[0].file
        return this.rPlayerOptions
      }
      console.log(list,'888')
    }
  }
}
</script>

<style lang="scss" scoped>
.video-component {
  position: relative;
  p {
    text-align: center;
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
  .demo {
    display: inline-block;
    width: 400px;
    height: 220px;
    text-align: center;
    line-height: 50px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    // margin-right: 4px;
  }

  .demo:hover {
    display: block;
  }
}
</style>
