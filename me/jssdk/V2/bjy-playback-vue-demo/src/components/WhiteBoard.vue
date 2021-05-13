<template>
    <div id="whiteboard">
      <div class="placeholder"></div>
    </div>
</template>

<script>
let eventEmitter = BJY.eventEmitter
export default {
  components: {},
  data () {
    return {

    }
  },
  mounted () {
    BJY.Whiteboard.create({
      element: $('#whiteboard .placeholder'),
      fit: 1
    })

    eventEmitter
      .on(
        eventEmitter.WHITEBOARD_LAYOUT_CHANGE,
        function (e, data) {
          // 重新设置白板的高度并让其居中
          console.log(data)
        }
      )
      .on(
        eventEmitter.DOC_IMAGE_LOAD_START,
        function () {
          console.log('翻页开始')
        }
      )
      .on(
        eventEmitter.DOC_IMAGE_LOAD_END,
        function () {
          console.log('翻页结束')
        }
      )
  },
  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>
