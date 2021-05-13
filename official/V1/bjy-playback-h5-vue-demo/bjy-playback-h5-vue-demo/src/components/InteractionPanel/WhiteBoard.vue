<template>
  <div id="whiteboard">
    <button class="btn" @click="toggleWhiteboardFull()">
      {{isFull?'退出全屏':'全屏'}}
    </button>
    <div class="placeholder"></div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      isFull: false
    }
  },
  computed: {},
  watch: {},
  methods: {
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
    BJY.Whiteboard.create({
        element: $('#whiteboard .placeholder')
    });
  },
  beforeDestroy () {}
}
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
#whiteboard {
  height: 100%;
  width: 100%;

  .bjy-whiteboard-wrapper {
    width: 100%;
  }

  .btn {
    position: absolute;
    bottom: 50px;
    right: 20px;
    z-index: 1;
    background: #888;
  }
}
</style>
