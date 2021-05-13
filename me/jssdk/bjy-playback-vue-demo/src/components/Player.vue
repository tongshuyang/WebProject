<template>
    <div class="bjy-playback-player">
      <video id="bjy-player-teacher" src=""></video>
    </div>
</template>

<script>
export default {
  props: ['videoData'],
  components: {},
  data () {
    return {
      player: null,
      video: null
    }
  },
  methods: {
    play () {
      console.log('play')
      this.video.play()
    },
    pause () {
      console.log('pause')
      this.video.pause()
    },
    volume (value) {
      this.video.volume = value
    },
    isPlaying () {
      return !this.video.paused
    },
    changeQuality (quality) {
      let data = this.videoData
      if (data.videos) {
        let url = data.videos[quality][0].url
        url = url.replace('https:', '').replace('http:', '')
        if (url.indexOf('ev1') > -1 && window.flvjs) {
        // 使用flvjs 播放加密格式视频
          this.player = window.flvjs.createPlayer({
            type: 'ev1',
            url: url,
            cors: true
          }, {
            stashInitialSize: 1024
          })
          this.player.attachMediaElement(window.video)
          this.player.load()
        } else {
          window.video.src = url
        }
      }
    }
  },
  mounted () {
    let video = window.video = this.video = document.getElementById('bjy-player-teacher')
    let data = this.videoData
    if (data.videos) {
      var url = data.videos[data.defaultDefinition][0].url
      url = url.replace('https:', '').replace('http:', '')
      if (url.indexOf('ev1') > -1 && window.flvjs) {
        // 使用flvjs 播放加密格式视频
        this.player = window.flvjs.createPlayer({
          type: 'ev1',
          url: url,
          cors: true
        }, {
          stashInitialSize: 1024
        })
        this.player.attachMediaElement(video)
        this.player.load()
      } else {
        video.src = url
      }

      video.addEventListener('play', function () {
        BJY.playback.play()
      })

      video.addEventListener('pause', function () {
        BJY.playback.pause()
      })

      video.addEventListener('seeked', function () {
        BJY.playback.seek(video.currentTime)
        BJY.playback.play()
      })

      // 必须监听视频的timeupdate事件，来告诉回放去根据视频时间更新数据
      video.addEventListener('timeupdate', function () {
        BJY.playback.timeupdate(video.currentTime)
      })

      // 视频加载后会触发durationchange事件，此时再去创建playerslider组件(playerslider需要duration参数)
      video.addEventListener('durationchange', () => {
        this.$emit('getDuration')
      })
    }
  },
  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
.bjy-playback-player {
  width: 100%;
  height: 100%;
  video {
    width: 100%;
    height: 100%;
  }
}
</style>
