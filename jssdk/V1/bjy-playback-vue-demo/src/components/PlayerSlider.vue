<template>
    <div class="bjy-playback-playslider"></div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      playerSlider: null,
      playing: false
    }
  },
  computed: {},
  watch: {
    playing (newValue, oldValue) {
      this.$emit('changeStatus', newValue)
    }
  },
  methods: {},
  created () {},
  mounted () {
    let video = window.video
    let me = this
    this.playerSlider = BJY.PlayerSlider.create({
      element: $('.bjy-playback-playslider'),
      currentTime: 0, // 视频播放时间
      duration: +window.video.duration, // 视频总时长
      canUseHotKey: true, // 是否支持快捷键
      onBeforeDrag: function () {
        // <-- 建议在此暂停视频播放 -->
        video.pause()
        me.playing = false
      },
      slideAnimation: function (style) {
        // <-- 可在此做滑动效果 -->
      },
      onAfterDrag: function (time) {
        // <-- 建议在此播放视频时间为 time -->
        video.currentTime = time
        video.play()
        me.playing = true
      },
      onBeforeSeek: function (time) {
        // <-- 建议在此暂停视频播放 -->
        video.pause()
        me.playing = false
      },
      onAfterSeek: function (time) {
        // <-- 建议在此播放视频时间为 time -->
        video.currentTime = time
        video.play()
        me.playing = true
      },
      onBeforeBackward: function () {
        // <-- 快退之前，建议在此暂停视频播放 -->
        video.pause()
        me.playing = false
      },
      onAfterBackward: function (time) {
        // time 是快退之后选中的时间 单位：s
        // <-- 快退之后，建议在此播放视频时间为 time -->
        video.currentTime = time
        video.play()
        me.playing = true
      },
      onBeforeForward: function () {
        // <-- 快进之前，建议在此暂停视频播放 -->
        video.pause()
        me.playing = false
      },
      onAfterForward: function (time) {
        // time 是快退之后选中的时间 单位：s
        // <-- 快进之后，建议在此播放视频时间为 time -->
        video.currentTime = time
        video.play()
        me.playing = true
      },
      onSpacePress: function () {
        // <-- 建议在此判断视频的播放状态 当前为暂停就开始播放 当前为播放就暂停 -->
        video.paused ? video.play() : video.pause()
        this.playing = !video.paused
      }
    })

    // 必须监听视频的timeupdate事件，来告诉回放去根据视频时间更新数据
    video.addEventListener('timeupdate', () => {
      this.playerSlider && this.playerSlider.set('currentTime', video.currentTime)
    })
  },
  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>
