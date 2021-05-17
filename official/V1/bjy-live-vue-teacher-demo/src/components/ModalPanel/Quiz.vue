<!-- 小测组件 -->
<template>
  <div v-show="visible" :class="isTeacher ? 'teacher' : 'student'" id="quiz-placeholder">
    <div class="close-bar">
      <span v-show="isTeacher || !forceJoin" @click="close" class="bjy-close">X</span>
    </div>
    <div class="placeholder"></div>
  </div>
</template>

<script>
const eventEmitter = BJY.eventEmitter;
const auth = BJY.auth;

export default {
  data() {
    return {
      visible: false,
      isTeacher: auth.isTeacher(),
      forceJoin: false
    };
  },
  methods: {
    open(data) {
      this.visible = true;
      this.$nextTick(() => {
        !this.isTeacher &&
          BJY.quizStudent.open({
            // 占位元素
            element: $("#quiz-placeholder .placeholder")[0],
            replace: false,
            // 是否强制参加 学生端答题时传入
            forceJoin: data.forceJoin,
            // 试卷id
            quizId: data.quizId,
            // 试题答案 学生端查看答案时传入
            solution: data.solution,

            // 就绪回调
            onReady: function () {},
            // 错误回调
            onError: function () {},
          });
      });
    },
    close() {
      this.visible = false;
    },
    initTeacher() {
      BJY.quizTeacher.init({
        element: $("#quiz-placeholder .placeholder")[0],
        replace: false,
        // 错误回调
        onError: function (data) {
          alert(data.msg);
        },
        // 开始小测前回调，返回 true 会开始执行小测，返回false不会执行，可用于条件判断
        onBeforeStartQuiz: function () {
          return true;
        },
        // 开始发布试卷前回调，返回 true 会执行发布，返回false不会执行，可用于条件判断
        onBeforePublishSolution: function () {
          return true;
        },
        onBeforeQuizDelete: function () {
            var promise = $.Deferred();
            var sure = confirm('确定要删除吗？');
            if (sure) {
              promise.resolve(true);
            } else {
              promise.resolve(false);
            }
            return promise
        },
      });
    },
    initStudent() {
      BJY.quizStudent.init();
    },
  },
  created() {
    eventEmitter
      .on(
        // 小测开始事件
        eventEmitter.QUIZ_START,
        (e, data) => {
          console.log(data);
          this.forceJoin = data.forceJoin;
          this.open(data);
        }
      )
      // 测验结束
      .on(eventEmitter.QUIZ_END, (e, data) => {
        !this.isTeacher && this.close();
      })
      .on(eventEmitter.QUIZ_CLOSE, (e, data) => {
        if (!data.force && $.isEmptyObject(data.solution)) {
            alert('请至少回答一个题目之后提交');
            return;
        }
        this.close();
      })
      .on(
        // 查看小测答案
        eventEmitter.QUIZ_SOLUTION,
        (e, data) => {
          this.forceJoin = false;
          this.open(data);
        }
      )
      .on(eventEmitter.QUIZ_SUBMIT, (e, data) => {
        console.log(data);
        this.close();
      })
      .on("toggle_quiz_dialog", (e, data) => {
        this.visible ? this.close() : this.open();
      });
    eventEmitter.trigger(eventEmitter.QUIZ_REQ);
  },
  mounted() {
    this.isTeacher ? this.initTeacher() : this.initStudent();
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
#quiz-placeholder {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  background: #fff;

  &.student {
    width: 600px;
    height: 80%;

    .close-bar {
      position: absolute;
      width: 100%;
      top: 0;
    }
    .placeholder {
      top: 30px;
      bottom: 0;
      position: absolute;
      width: 100%;
    }
  }
  &.teacher {
    width: 800px;
  }

  .close-bar {
    background: #232323;
    height: 30px;
    text-align: right;

    .bjy-close {
      line-height: 30px;
      color: #fff;
      font-size: 20px;
      margin-right: 16px;
      cursor: pointer;
    }
  }
}
</style>
