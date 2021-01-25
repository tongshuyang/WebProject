<template>
    <div class="question-answer" :class="{'fold': isFold}">
      <div class="control-bar">
        <span class="title">问答</span>
        <span @click="toggleFold()" class="fold-toggle">{{checkFold()}}</span>
      </div>
      <div class="bjy-playback-question-answer"></div>
    </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      isFold: true
    }
  },
  computed: {},
  watch: {},
  methods: {
    toggleFold () {
      this.isFold = !this.isFold
    },
    checkFold () {
      if (this.isFold) {
        return '展开'
      } else {
        return '折叠'
      }
    }
  },
  created () {
  },
  mounted () {
    BJY.QuestionAnswer.create({
      element: $('.bjy-playback-question-answer'),
      replace: false,
      // 是否能够管理问题，老师或者助教传入true，学生传入false，会依据这个参数创建不同视图的面板
      canManageQuestion: false,
      // 每页显示的条数，可不传，默认为50
      countPerPage: 50,
      // 复制完成时的回调
      onCopyFinish: function () {
      }
    })
  },
  beforeDestroy () {}
}
</script>

<style lang='scss'>
//@import url(); 引入公共css类
.question-answer {
  overflow: hidden;
  background: #fff;
  width: 100%;
  position: absolute;
  top: -30px;
  left: 0;
  bottom: -36px;

  .control-bar {
    font-size: 13px;
    height: 30px;
    width: 100%;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 0 6px;
    align-items: center;

    .fold-toggle {
      cursor: pointer;
    }
  }

  .bjy-playback-question-answer {
    position: absolute;
    top: 30px;
    bottom: 0;
    width: 100%;

    .bjy-question-answer {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;

      // 回放里面不需要这些
      .bjy-sender-box {
        display: none;
      }

      // 回放不需要，隐藏
      .bjy-footer {
        display: none;
      }

      .bjy-question-list {
        height: 100%;

        .bjy-scrollable {
          height: 100%;
        }
      }
    }
  }
}
.fold {
  top: unset;
}
</style>
