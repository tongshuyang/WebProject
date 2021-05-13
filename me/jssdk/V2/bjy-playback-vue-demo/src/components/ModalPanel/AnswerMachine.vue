<!-- 答题器组件 -->
<template>
    <div class="answer-machine"></div>
</template>

<script>
let eventEmitter = BJY.eventEmitter
let auth = BJY.auth

export default {
  components: {},
  data () {
    return {
      isStudent: auth.isStudent()
    }
  },
  methods: {
    open (data, isShowResult) {
      // 显示占位元素
      $('.answer-machine').show()
      BJY.AnswerStudent.open(
        $.extend(
          {
            element: $('.answer-machine')[0],
            // 是否在提交之后关闭，默认为false
            autoCloseAfterSubmit: false,
            // 组件内部不提供UI隐藏，由外层隐藏
            onClose: () => {
              // 隐藏元素
              $('.answer-machine').hide()
            },
            replace: false,
            // // 显示答案
            showResult: isShowResult,
            // 提交后立即显示答案
            autoShowResultAfterEnd: !!data.isShowCorrectAnswer,
            onSubmitClick: (myAnswer, rightAnswer) => {
              data.showResult = true;
              if (myAnswer && myAnswer.length) {
                $.each(data.options, function(index, item) {
                  $.each(myAnswer, function(answerIndex, answerItem) {
                    if (item.text === answerItem.text) {
                      item.isSelected = true;
                    }
                  });
                });
              }
              this.open(Yox.object.extend({}, data));
            }
          },
          data
        )
      )
    }
  },
  mounted () {
    BJY.AnswerStudent.init()
    //   学生端需要监听事件
    if (auth.isStudent()) {
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
          function () {
            $('.answer-machine').hide()
          }
        )
        // 展示答题结果
        .on(
          eventEmitter.ANSER_RESULT_SHOW,
          (event, data) => {
            this.open(data, true)
          }
        )
    }
  },
  beforeDestroy () {}
}
</script>

<style lang='scss'>
//@import url(); 引入公共css类
/*答题器样式*/
.answer-machine {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 320px !important;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    background: #fff;
}
</style>
