<template>
  <el-image
    fit="contain"
    lazy
    v-if="coverImage"
    :src="coverImage"
  ></el-image>
  <video v-else width="0" height="0" ref="videoZoom" :src="`/api/public/file/${alterUrl}`"></video>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      coverImage: ''
    }
  },
  computed: {
    alterUrl() {
      return this.url
    }
  },
  mounted() {
    this.$nextTick(() => {
      const video = this.$refs['videoZoom']
      video.currentTime = 1
      const canvas = document.createElement('canvas')
      // 等待video获取到第一帧后
      video.oncanplay = () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
        // 利用canvas对象方法绘图
        canvas
          .getContext('2d')
          .drawImage(video, 0, 0, canvas.width, canvas.height)
        // 转换成base64形式
        const img = canvas.toDataURL('image/jpeg') // 这个就是图片的base64
        this.coverImage = img
      }
    })
  },
}
</script>

<style>
</style>