<!-- 小测组件 -->
<template>
  <div v-show="showDialog" id="quiz-student">
    <div class="title-bar">
      <span class="text">测验</span>
      <span @click="closeDialog()" class="close">X</span>
    </div>
    <div class="placeholder"></div>
  </div>
</template>

<script>
let eventEmitter = BJY.eventEmitter
let quizStudent = BJY.quizStudent

export default {
  components: {},
  data () {
    return {
      showDialog: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    open (data) {
      this.showDialog = true
      this.$nextTick(() => {
        quizStudent.open({
          // 占位元素
          element: $('#quiz-student .placeholder')[0],
          replace: false,
          // 是否强制参加 学生端答题时传入
          forceJoin: data.forceJoin,
          // 试卷id
          quizId: data.quizId,
          // 试题答案 学生端查看答案时传入
          solution: data.solution,

          // 就绪回调
          onReady: function () { },
          // 错误回调
          onError: function () { }
        })
      })
    },
    closeDialog () {
      this.showDialog = false
    }
  },
  created () {
    quizStudent.init()
    eventEmitter
      .on(
        // 小测开始事件
        eventEmitter.QUIZ_START,
        (e, data) => {
          console.log(data)
          this.open(data)
        }
      )
      // 测验结束
      .on(
        eventEmitter.QUIZ_END,
        (e, data) => {
          this.closeDialog()
        }
      )
      .on(
        // 查看小测答案
        eventEmitter.QUIZ_SOLUTION,
        (e, data) => {
          this.open(data)
        }
      )
      .on(
        eventEmitter.QUIZ_SUBMIT,
        (e, data) => {
          console.log('submit:' + data)
          this.closeDialog()
        }
      )
    eventEmitter.trigger(eventEmitter.QUIZ_REQ)
  },
  mounted () {
  },
  beforeDestroy () { }
}
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
#quiz-student {
  position: absolute;
  z-index: 1;
  width: 400px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);

  .title-bar {
    position: absolute;
    top: 0;
    height: 30px;
    width: 100%;
    background: #444c63;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
    color: #fff;

    .close {
      cursor: pointer;
    }
  }

  .placeholder {
    position: absolute;
    top: 30px;
    width: 100%;
    bottom: 0;
  }
}
</style>
