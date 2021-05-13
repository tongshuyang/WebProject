<template>
    <div class="bjy-playback-volume"></div>
</template>

<script>
export default {
  components: {},
  data () {
    return {

    }
  },
  mounted () {
    BJY.VolumeSlider.create({
      element: $('.bjy-playback-volume'),
      min: 0,
      max: 100,
      value: 30, // 默认音量
      onChange: function (value) {
        // <!-- 音量改变的时候触发，请在此处修改您的视频音量 -->
        BJY.store.set('teacherVideo.volume', value / 100);
      }
    })
  },
  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>
