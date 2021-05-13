<template>
  <div id="bjy-playback-notice">
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {
    // 公告
    BJY.Notice.create({
      element: $('#bjy-playback-notice'), // 父容器
      replace: false,
      defaultContent: '这里空空如也...' // 默认无公告时显示文本
    })
  },
  beforeDestroy () {}
}
</script>

<style lang='scss'>
//@import url(); 引入公共css类
#bjy-playback-notice {
    position: absolute;
    top: 37px;
    width: 100%;
    padding: 0 8px;
    height: 36px;
    box-sizing: border-box;
    background: #fff;
    transition: 0.3s left;
    left: 0;
    z-index: 1;

    .bjy-super-notice {
      background: #fff;
    }
}
</style>
