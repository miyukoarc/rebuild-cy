<!--
 * @Author: your name
 * @Date: 2020-06-19 19:47:00
 * @LastEditTime: 2020-07-17 15:52:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\messageTypeComponent\audioComponent.vue
-->
<template>
  <section class="voice-component">
    <div v-if="item.toUser == toUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar :src="item.avatar" />
        <div class="left">
          <!-- <audio controls src="http://10.10.10.198/public/file/5f115351fd03f674878f613e" class="audio-warp">
           您的浏览器不支持 audio 元素。
          </audio> -->
          <div
              class="audio-left display-flex align-items-center"
              @click="playAudio('http://10.10.10.198/public/file/5f115351fd03f674878f613e')"
            >
              <i
                class="play-audio"
                :class="isPlayAudio? 'el-icon-microphone' :'el-icon-turn-off-microphone'"
              />
          </div>
        </div>
      </div>
    </div>
    <div v-if="item.fromUser == toUserId" class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex justify-content-flex-end">
        <div class="right">
          <!-- <audio controls src="http://10.10.10.198/public/file/5f115351fd03f674878f613e" class="audio-warp">
            您的浏览器不支持 audio 元素。
          </audio> -->
          <div
            class="audio-right display-flex align-items-center"
            @click="playAudio('http://10.10.10.198/public/file/5f115351fd03f674878f613e')"
          >
            <i
              class="play-audio"
              :class="isPlayAudio? 'el-icon-microphone' :'el-icon-turn-off-microphone'"
            />
          </div>
        </div>
        <el-avatar :src="item.avatar" />
      </div>
    </div>
  </section>
</template>

<script>
import BenzAMRRecorder from "benz-amr-recorder";

export default {
  name: "VoiceComponent",
  props: {
    item: Object,
    toUserId: String,
    fromUserId: String
  },
  data() {
    return {
      isPlayAudio: false
    };
  },
  methods: {
    playAudio(url) {
      const that = this;
      var amr = new BenzAMRRecorder();
      amr.initWithUrl(url).then(() => {
        // amr.isPlaying() 返回音频的播放状态 是否正在播放 返回boolean类型
        if (amr.isPlaying()) {
          that.isPlayAudio = false;
          amr.stop();
        } else {
          amr.play();
          that.isPlayAudio = true;
        }
      });
      amr.onEnded(() => {
        this.isPlayAudio = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.voice-component {
  position: relative;
  p {
    text-align: center;
  }
  .left {
    max-width: 50%;
    left: 20px;
    margin-left: 10px;
  }
  .right {
    /*使左右的对话框分开*/
    max-width: 50%;
    left: -20px;
    margin-right: 10px;
  }
  .audio-warp {
    width: 200px;
    height: 40px;
  }
  .audio-left {
    // margin-top: 5px;
    margin-left: 20px;
    width: 200px;
    height: 40px;
    border-radius: 20px;
    background-color: rgb(64, 158, 255);
    .play-audio {
      color: #fff;
      margin-left: 20px;
      cursor: pointer;
    }
  }
  .audio-right {
    // margin-top: 5px;
    margin-right: 20px;
    width: 200px;
    height: 40px;
    border-radius: 20px;
    background-color: rgb(64, 158, 255);
    .play-audio {
      color: #fff;
      margin-left: 20px;
      cursor: pointer;
    }
  }
  .video-js .vjs-icon-placeholder {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
