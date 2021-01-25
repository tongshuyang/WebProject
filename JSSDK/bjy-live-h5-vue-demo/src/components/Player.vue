<template>
  <div id="h5-player">
  </div>
</template>

<script>

var eventEmitter = BJY.eventEmitter
// store 存储着系统的权限信息
var store = BJY.store
// 获取创建播放器的 Player 对象
var Player = BJY.Player
var teacherH5Player

export default {
  components: {
  },
  data () {
    return {
      started: false
    }
  },
  computed: {},
  watch: {},
  methods: {
  },
  created () {
  },
  mounted () {
    window.player = teacherH5Player = BJY.H5Player.create({
        element: $('#h5-player'),
        showControls: false,
        poster: ''
    })
  },
  beforeDestroy () { }
}
</script>

<style lang='scss'>
//@import url(); 引入公共css类

#h5-player {
  z-index: 1;
  height: 210px !important;
  width: 100%;
  background: #000;
  position: relative;

  video {
    object-fit: cover;
  }
}
</style>
