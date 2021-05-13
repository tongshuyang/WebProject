<template>
  <div id="whiteboard" :class="{'min-doc': isPptAsMain}">
    <button class="btn" @click="toggleWhiteboardFull()">
      {{isFull?'退出全屏':'全屏'}}
    </button>
    <div class="placeholder"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['isPptAsMain'],
  data () {
    return {
      whiteboard: null,
      isFull: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    refresh () {
      this.whiteboard.refresh()
    },
    toggleWhiteboardFull () {
      var dom = document.getElementById('whiteboard')
      this.isFull ? this.exitFullScreen() : this.fullScreen(dom)
      this.isFull = !this.isFull
    },
    fullScreen (dom) {
      if (dom.requestFullscreen) {
        return dom.requestFullscreen()
      } else if (dom.webkitRequestFullScreen) {
        return dom.webkitRequestFullScreen()
      } else if (dom.mozRequestFullScreen) {
        return dom.mozRequestFullScreen()
      } else {
        return dom.msRequestFullscreen()
      }
    },
    exitFullScreen () {
      var dom = document
      if (dom.exitFullscreen) {
        dom.exitFullscreen()
      } else if (dom.webkitExitFullscreen) {
        return dom.webkitExitFullScreen()
      } else if (dom.mozRequestFullscreen) {
        return dom.mozExitFullscreen()
      } else {
        return dom.msExitFullscreen()
      }
    }
  },
  created () {},
  mounted () {
    // 新版白板
    this.whiteboard = BJY.Whiteboard.create({
      element: $('#whiteboard .placeholder'),
      // 填充模式： 1 自适应  2 撑满容器
      fit: 1,
      keepSize: false,
      // 给静态文档添加水印，如不需要可忽略。sdkVersion >= 0.3.1
      watermark: {
        text: 'text', // 水印文字，必传，不宜过长，否则阿里云图片处理会出错
        opacity: 8, // 可选，透明度
        size: 36, // 可选，字号
        rotate: 20, // 可选，旋转角度
        fill: 1 // 可选，是否铺满 0/1，默认1
      }
    })
  },
  beforeDestroy () {}
}
</script>

<style lang="scss">
//@import url(); 引入公共css类
#whiteboard {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  .btn {
    position: absolute;
    bottom: 50px;
    right: 20px;
    z-index: 1;
  }
}
</style>
