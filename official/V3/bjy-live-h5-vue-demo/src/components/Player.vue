<template>
    <div id="h5-player"></div>
</template>

<script>
var eventEmitter = BJY.eventEmitter
export default {
  data () {
    return {
      started: false,
      instance: null
    }
  },
  mounted () {
    var teacherH5Player = window.player = BJY.H5Player.create({
        element: $('#h5-player'),
        // 参考对接文档 https://www.baijiayun.com/js-sdk/doc/#/h5-player 
        useBplayer: true, // 为 true 时，即开启 低延时播放，安卓和iOS 延时 低至500-2000ms；未开启时，安卓延时 4000ms，iOS 延时 8000ms 
        preLoad: true, // 是否预加载，usBplayer 配置为true 时，建议开启
        showControls: false,
        poster: ''
    })
    this.instance = teacherH5Player

    // iOS 退出全屏不触发 webkitendfullscreen 会触发暂停
    eventEmitter.on(
      eventEmitter.HTML_VIDEO_PAUSE,
      () => {
        setTimeout(() => {
          var video = $('video', '#h5-player')[0]
          BJY.os.ios && video && video.paused && video.play()
        }, 600)
      }
    )
  },
  beforeDestroy() {
    this.instance && this.instance.destroy()
  },
}
</script>

<style lang='scss'>
#h5-player {
  z-index: 1;
  width: 100%;
  background: #000;
  position: relative;

  video {
    object-fit: cover;
  }
}
</style>
