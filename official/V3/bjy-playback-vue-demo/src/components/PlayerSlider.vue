<template>
    <div class="bjy-playback-playslider"></div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
    }
  },
  mounted () {
    const teacherVideo = BJY.store.get('teacherVideo');

    const playerSlider = BJY.NewPlayerSlider.create({
      element: $('.bjy-playback-playslider'),
      currentTime: 0, // 视频播放时间
      duration: +teacherVideo.duration, // 视频总时长
      canUseHotKey: true, // 是否支持快捷键
      onBeforeDrag: function () {
        // <-- 建议在此暂停视频播放 -->
        teacherVideo.pause()
      },
      slideAnimation: function (style) {
        // <-- 可在此做滑动效果 -->
      },
      onAfterDrag: function (time) {
        // <-- 建议在此播放视频时间为 time -->
        teacherVideo.currentTime = time
        teacherVideo.play()
      },
      onBeforeSeek: function (time) {
        // <-- 建议在此暂停视频播放 -->
        teacherVideo.pause()
      },
      onAfterSeek: function (time) {
        // <-- 建议在此播放视频时间为 time -->
        teacherVideo.currentTime = time
        teacherVideo.play()
      },
      onBeforeBackward: function () {
        // <-- 快退之前，建议在此暂停视频播放 -->
        teacherVideo.pause()
      },
      onAfterBackward: function (time) {
        // time 是快退之后选中的时间 单位：s
        // <-- 快退之后，建议在此播放视频时间为 time -->
        teacherVideo.currentTime = time
        teacherVideo.play()
      },
      onBeforeForward: function () {
        // <-- 快进之前，建议在此暂停视频播放 -->
        teacherVideo.pause()
      },
      onAfterForward: function (time) {
        // time 是快退之后选中的时间 单位：s
        // <-- 快进之后，建议在此播放视频时间为 time -->
        teacherVideo.currentTime = time
        teacherVideo.play()
      },
      onSpacePress: function () {
        // <-- 建议在此判断视频的播放状态 当前为暂停就开始播放 当前为播放就暂停 -->
        teacherVideo.paused ? teacherVideo.play() : teacherVideo.pause()
      }
    })

    // 必须监听视频的timeupdate事件，来告诉回放去根据视频时间更新数据
    teacherVideo.addEventListener('timeupdate', function () {
      playerSlider && playerSlider.set('currentTime', teacherVideo.currentTime)
    })
  }
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>
