<template>
  <div class="bjy-playback-player">
    <video id="bjy-player-teacher" src=""></video>
  </div>
</template>

<script>
const store = BJY.store
export default {
  props: ["videoInfo"],
  components: {},
  data() {
    return {
      videoEl: null,
    };
  },
  methods: {
    play() {
      this.videoEl.play();
    },
    pause() {
      this.videoEl.pause();
    },
    togglePlay() {
      this.videoEl.paused ? this.videoEl.play() : this.videoEl.pause();
    },
    setVolume(value) {
      this.videoEl.volume = value;
    },

    loadVideo(quality) {
      const data = this.videoInfo;
      if (data && data.videos) {
        quality = quality || data.defaultDefinition;
        let url = data.videos[quality][0].url;
        url = url.replace("https:", "").replace("http:", "");

        if (url.indexOf("ev1") > -1 && window.flvjs) {
          // 使用flvjs 播放加密格式视频
          const player = window.flvjs.createPlayer(
            {
              type: "ev1",
              url: url,
              cors: true,
            },
            {
              stashInitialSize: 1024,
            }
          );
          player.attachMediaElement(this.videoEl);
          player.load();
        } else {
          this.videoEl.src = url;
        }
        store.set('isPlaying', false)
      } else {
        alert("获取回放视频信息失败!");
      }
    },
  },
  mounted() {
    const videoEl = this.videoEl = document.getElementById("bjy-player-teacher");
    store.set('teacherVideo', videoEl);
    store.set('isPlaying', false);
    const data = this.videoInfo;
    this.loadVideo();

    // 播放器初始化完成之后在这里实现记忆播放之类的逻辑
    BJY.playback.start(0);

    videoEl.onplay = function () {
      BJY.playback.play();
      store.set('isPlaying', true)
    };

    videoEl.onpause = function () {
      BJY.playback.pause();
      store.set('isPlaying', false)
    };

    // 影响白板和回放的同步
    videoEl.onseeked = function () {
      BJY.playback.seek(videoEl.currentTime)
      BJY.playback.play()
    };

    /**
     * 必须监听视频的timeupdate事件，来告诉回放去根据视频时间更新数据
     * 注意：不要使用videoEl.ontimeupdate的方式来设置监听，可能会被其他地方覆盖，使得无法同步信令
     */
    videoEl.addEventListener('timeupdate', function () {
      BJY.playback.timeupdate(videoEl.currentTime);
    })

    // 视频加载后会触发durationchange事件，此时再去创建playerslider组件(playerslider需要duration参数)
    videoEl.ondurationchange = () => {
      this.$emit("getDuration");
    };
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
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
