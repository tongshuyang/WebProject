<template>
    <div class="barrage-wrap"></div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      barrage: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    open () {
      this.barrage.open()
    },
    close () {
      this.barrage.close()
    },
    isBarrageOn () {
      return this.barrage.isOpened()
    },
    toggle () {
      if (this.isBarrageOn()) {
        this.close()
        this.$Toast('弹幕关')
      } else {
        this.open()
        this.$Toast('弹幕开')
      }
    }
  },
  created () {},
  mounted () {
    // 挂载弹幕组件
    this.barrage = new BJY.Barrage({
    // 组件父容器
      container: $('.video-wrap'),
      // 移动速度，每秒移动多少个像素
      speed: 100,
      // 最长可显示多少个字，超过这个字数的会过滤
      maxLength: 20,
      // 在 top - bottom 的区间出现弹幕
      top: 30,
      bottom: 30,
      // 轨道高度
      trackHeight: 30,
      // 是否只显示文本消息
      textOnly: false,
      // 如果需要自定义弹幕内容，可实现此方法
      renderContent: function (data) {
        return data.content
      }
    })
  },
  beforeDestroy () {
  }
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
// .barrage-wrap {
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
// }
</style>
