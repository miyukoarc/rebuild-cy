<!--
 * @Author: your name
 * @Date: 2020-06-19 19:47:00
 * @LastEditTime: 2020-08-10 19:57:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \chaoying_web\src\views\message\messageTypeComponent\audioComponent.vue
-->
<template>
  <section class="voice-component">
    <div v-if="item.fromUser != fromUserId" class="left-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex">
        <el-avatar :src="item.fromAvatar" />
        <div class="left">
          <div class="chat-name ml-20">{{item.fromUser != fromUserId?item.fromName:item.toName}}</div>
          <div class="revoke-content" v-show="item.revokeType">你撤回了一条消息：</div>
          <div style="height:42px;background-color:#fff">
            <audio controls :src="item.messageMedias[0].file" class="audio-warp">您的浏览器不支持 audio 元素。</audio>
          </div>
          <!-- <div
            class="audio-left display-flex align-items-center"
            @click="playAudio(item.messageMedias[0].file)"
          >
            <i
              class="play-audio"
              :class="isPlayAudio? 'el-icon-microphone' :'el-icon-turn-off-microphone'"
            />
          </div>-->
        </div>
      </div>
    </div>
    <div v-else class="right-warp">
      <p>{{ item.msgTime }}</p>
      <div class="display-flex justify-content-flex-end">
        <div class="right">
          <div class="chat-name mr-20" style="text-align:right">{{item.fromName}}</div>
          <div class="revoke-content" v-show="item.revokeType">你撤回了一条消息：</div>
          <div style="height:42px;background-color:#fff">
            <audio controls :src="item.messageMedias[0].file" class="audio-warp">您的浏览器不支持 audio 元素。</audio>
          </div>

          <!-- <div
            class="audio-right display-flex align-items-center"
            @click="playAudio(item.messageMedias[0].file)"
          >
            <i
              class="play-audio"
              :class="isPlayAudio? 'el-icon-microphone' :'el-icon-turn-off-microphone'"
            />
          </div>-->
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
    fromUserId: String,
  },
  data() {
    return {
      isPlayAudio: false,
    };
  },
  methods: {
    playAudio(url) {
      const that = this;
      // var amrFromMp3 = new BenzAMRRecorder();
      // amrFromMp3.initWithUrl(url).then(function () {
      //   window.location.href = window.URL.createObjectURL(amrFromMp3.getBlob());
      // });
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
    },
  },
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
    margin-left: 10px;
  }
  .right {
    /*使左右的对话框分开*/
    max-width: 50%;
    left: -20px;
    margin-right: 10px;
  }
  .audio-warp {
    width: 300px;
    height: 40px;
    margin-top: 1px;
  }
  audio {
    background-color: #fff;
  }
  .audio-left {
    // margin-top: 5px;
    margin-left: 20px;
    width: 200px;
    height: 40px;
    border-radius: 20px;
    background-color: #cce4fc;
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
    background-color: #cce4fc;
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
