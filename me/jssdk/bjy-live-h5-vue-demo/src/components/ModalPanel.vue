<template>
  <transition name="pop">
    <div v-show="showModal" class="modal">
      <span v-if="showQuizClose" @click="closeModal()" class="quiz-close">X</span>
      <div class="container"></div>
    </div>
  </transition>
</template>

<script>
const eventEmitter = BJY.eventEmitter

export default {
  components: {},
  data () {
    return {
      showModal: false,
      showQuizClose: false
    }
  },
  computed: {},
  watch: {
    showModal (newValue, oldValue) {
      if (newValue) {
        // 安卓浏览器video标签层级过高，需要在有答题器、测验等modal的时候transform video容器，使其不遮挡到modal
        $('#h5-player').css('transform', 'translateX(10000px)')
      } else {
        $('#h5-player').css('transform', '')
      }
    }
  },
  methods: {
    quizOpen (data) {
      BJY.quizStudent.open({
        // 占位元素
        element: $('.modal .container')[0],
        replace: false,
        // 是否强制参加 学生端答题时传入
        forceJoin: data.forceJoin,
        // 试卷id
        quizId: data.quizId,
        // 试题答案 学生端查看答案时传入
        solution: data.solution,

        // 就绪回调
        onReady: function () {

        },
        // 错误回调
        onError: function (data) {
          console.log(data)
        }
      })
    },
    questionOpen (data, isShowResult) {
      this.showModal = true
      this.showQuizClose = false
      BJY.AnswerStudent.open(
        $.extend(
          {
            element: $('.modal .container')[0],
            // 是否在提交之后关闭，默认为false
            autoCloseAfterSubmit: false,
            // 组件内部不提供UI隐藏，由外层隐藏
            onClose: () => {
              // 隐藏元素
              this.showModal = false
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
    },
    closeModal () {
      this.showModal = false
      this.showQuizClose = false
    }
  },
  created () {
    BJY.AnswerStudent.init()
    BJY.quizStudent.init()

    // 答题器监听
    eventEmitter.on(eventEmitter.START_ANSWER, (e, data) => {
      this.questionOpen(data, false)
    })
    // 展示答题结果
      .on(
        eventEmitter.ANSER_RESULT_SHOW,
        (event, data) => {
          this.questionOpen(data, true)
        }
      )
    // 测验开始监听
      .on(eventEmitter.QUIZ_START, (e, data) => {
        this.showModal = true
        this.showQuizClose = true
        this.quizOpen(data)
      })
    // 测验发布答案监听
      .on(eventEmitter.QUIZ_SOLUTION, (e, data) => {
        this.showModal = true
        this.showQuizClose = true
        this.quizOpen(data)
      })
      // 测验提交
      .on(
        eventEmitter.QUIZ_SUBMIT,
        () => {
          this.closeModal()
        }
      )
      // 测验结束
      .on(
        eventEmitter.QUIZ_END,
        (e, data) => {
          this.closeModal()
        }
      )
    eventEmitter.trigger(eventEmitter.QUIZ_REQ)
  },
  mounted () { },
  beforeDestroy () { }
}
</script>

<style lang='scss'>
//@import url(); 引入公共css类
.modal{
  position: fixed;
  left: 0;
  right: 0;
  padding: 10px 5px;
  bottom: 0;
  top: 0;
  background: #fff;
  border-radius: 15px;

  .container {
    width: 100%;
    height: 100%;
  }

  .bjy-answer-student {
    height: unset;
    box-shadow: none;

    &-header{
      color: #111;
      padding: 10px;
      background-color: #fff;
      border-bottom: 1px solid #ccc
    }

    .bjy-center {
      background-color: #fff;
      margin: 30px 0;
    }
  }

  .quiz-close {
    position: absolute;
    height: 56px;
    line-height: 56px;
    top: 10px;
    right: 20px;
    color: #000;
    z-index: 2;
    cursor: pointer;
  }
}

.pop-enter-active, .pop-leave-active {
  transition: top .5s;
}
.pop-enter, .pop-leave-to {
  top: 100%;
}
</style>
