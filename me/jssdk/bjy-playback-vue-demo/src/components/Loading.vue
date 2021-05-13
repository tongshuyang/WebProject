<template>
    <div id="bjy-loading-wrapper"></div>
</template>

<script>
export default {
  components: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {
    let loading = BJY.playback.Loading.create({
      element: $('#bjy-loading-wrapper'),
      // loading图片，可自定义
      logoUrl: 'http://img.baijiayun.com/0baijiacloud/logo/ydzb/v5/www-loading.png',
      onComplete: () => {
        this.$emit('loaded')
        loading.destroy()
      }
    })
  },
  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
.bjy-loading-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
