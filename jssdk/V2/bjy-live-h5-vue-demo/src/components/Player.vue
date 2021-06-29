<template>
    <div id="h5-player"></div>
</template>

<script>
export default {
  data () {
    return {
      started: false
    }
  },
  mounted () {
    var teacherH5Player = window.player = BJY.H5Player.create({
        element: $('#h5-player'),
        showControls: false,
        poster: ''
    })
  }
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
