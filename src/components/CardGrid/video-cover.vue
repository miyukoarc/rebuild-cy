<!--
 * @Author: your name
 * @Date: 2020-08-07 10:27:07
 * @LastEditTime: 2020-08-07 14:09:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \rebuild-cy\src\components\CardGrid\video-cover.vue
-->
<template>
  <el-image fit="cover" lazy v-if="coverImage" style="cursor:pointer;" :src="coverImage"></el-image>
  <video v-else width="0" height="0" ref="videoZoom" :src="`/api/public/file/${alterUrl}`"></video>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      coverImage: '',
    }
  },
  computed: {
    alterUrl() {
      return this.url
    },
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
  methods: {
    handleView(val) {
      this.$emit('handleView', val)
    },
  },
}
</script>

<style>
</style>