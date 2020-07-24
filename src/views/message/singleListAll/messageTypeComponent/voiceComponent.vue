<!--
 * @Author: your name
 * @Date: 2020-06-19 19:47:00
 * @LastEditTime: 2020-07-24 21:04:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\messageTypeComponent\audioComponent.vue
-->
<template>
  <section class="voice-component">
    <div v-if="item.toUser == toUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar :src="item.fromAvatar" />
        <div class="left">
          <div class="user-select">
            <div
              class="audio-left display-flex align-items-center"
              @click="playAudio(item.messageMedias[0].file)"
            >
              <i
                class="play-audio"
                :class="isPlayAudio? 'el-icon-microphone' :'el-icon-turn-off-microphone'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="item.fromUser == toUserId" class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex justify-content-flex-end">
        <div class="user-select right">
          <div
            class="audio-right display-flex align-items-center"
            @click="playAudio(item.messageMedias[0].file)"
          >
            <i
              class="play-audio"
              :class="isPlayAudio? 'el-icon-microphone' :'el-icon-turn-off-microphone'"
            />
          </div>
        </div>
        <el-avatar :src="item.fromAvatar" />
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
  .left {
    max-width: 50%;
    left: 20px;
    margin-top: 5px;
  }
  .right {
    /*使左右的对话框分开*/
    max-width: 50%;
    top: 5px;
    left: -20px;
  }
  .audio-left {
    position: relative;
    // margin-top: 5px;
    margin-left: 20px;
    width: 200px;
    height: 40px;
    border-radius: 5px;
    background-color: #cce4fc;
    .play-audio {
      position: absolute;
      color: #000;
      left: 20px;
      cursor: pointer;
    }
  }
  .audio-right {
    position: relative;
    // margin-top: 5px;
    margin-right: 20px;
    width: 200px;
    height: 40px;
    border-radius: 5px;
    background-color: #cce4fc;
    .play-audio {
      position: absolute;
      color: #000;
      right: 20px;
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
