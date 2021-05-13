<template>
    <div class="bjy-playback-notice"></div>
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
    BJY.Notice.create({
      element: $('.bjy-playback-notice'),
      defaultContent: '公告栏空空的...' // 没有公告时默认显示内容
    })
  },
  beforeDestroy () {}
}
</script>

<style lang='scss'>
//@import url(); 引入公共css类
.bjy-notice {
  position: absolute;
  top: -34px;
  width: 100%;
  left: 0;
  padding: 0;
  background: #fff;
  border-top: 1px solid #ccc;
  box-sizing: border-box;

  .bjy-super-notice {
    padding: 0 6px;
    background: #fff;
  }

  .bjy-content {
    line-height: 30px;
  }
}
</style>
