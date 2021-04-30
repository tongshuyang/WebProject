<template>
  <div id="h5-player"></div>
</template>

<script>
let eventEmitter = BJY.eventEmitter;

export default {
  components: {},
  data() {
    return {
      started: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    //   创建老师播放器
    createTeacherPlayer() {
        let player = new BJY.H5Player.create({
        element: $("#h5-player"),
        showControls: false,
        poster: "",
      })
    }
  },
  created() {
  },
  mounted() {
    eventEmitter.on(
      // 老师打开了媒体
      eventEmitter.TEACHER_MEDIA_ON,
      () => {
        // if (this.player) {
        //   this.player.destroy()
        // }
        this.createTeacherPlayer()
      }
    )
    this.createTeacherPlayer()
  },
  beforeDestroy() {},
};
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
