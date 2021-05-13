<!-- 答题器组件 -->
<template>
    <div id="answer-machine">
      <div class="placeholder"></div>
    </div>
</template>

<script>
import language from '../../language/main'
let eventEmitter = BJY.eventEmitter

export default {
  components: {},
  data () {
    return {
      language
    }
  },
  computed: {},
  watch: {},
  methods: {
    open (data, isShowResult) {
      $('#answer-machine .placeholder').show()
      BJY.AnswerStudent.open(
        $.extend(
          {
            element: $('#answer-machine .placeholder')[0],
            // 是否在提交之后关闭，默认为false
            autoCloseAfterSubmit: false,
            // 组件内部不提供UI隐藏，由外层隐藏
            onClose: () => {
              // 隐藏元素
              $('#answer-machine .placeholder').hide()
            },
            replace: false,
            // // 显示答案
            showResult: isShowResult,
            // 提交后立即显示答案
            autoShowResultAfterEnd: !!data.isShowCorrectAnswer
          },
          data
        )
      )
    }
  },
  created () {
    //   学生端需要监听事件
    eventEmitter
      .on(
        eventEmitter.START_ANSWER,
        (event, data) => {
          console.log(data)
          this.open(data, false)
        }
      )
      .on(
        eventEmitter.END_ANSWER,
        () => {
          this.showAnswer = false
        }
      )
      // 展示答题结果
      .on(
        eventEmitter.ANSER_RESULT_SHOW,
        (event, data) => {
          this.open(data, true)
        }
      )
  },
  mounted () {
    BJY.AnswerStudent.init()
    $('#answer-machine .placeholder').hide()
  },
  beforeDestroy () {}
}
</script>

<style lang='scss'>
//@import url(); 引入公共css类
/*答题器样式*/
#answer-machine {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    z-index: 1;
    background-color: #fff;

    .placeholder {
      width: 320px;
      height: 320px;
    }
}
</style>
