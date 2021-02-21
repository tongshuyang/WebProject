<!-- 问答组件 -->
<template>
  <div id="question-answer">
    <div class="question-answer-bar">
      <span style="display: flex; align-items: center">
        <i class="icon icon-answer-machine"></i>
        问答
      </span>
      <span @click="toggleQuestionAnswer()" class="toggle">
        {{ status }}
      </span>
    </div>
    <div class="placeholder"></div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      status: "展开",
    };
  },
  computed: {},
  watch: {},
  methods: {
    toggleQuestionAnswer() {
      let ele = $(".question-answer");
      if (ele.hasClass("fold")) {
        ele.removeClass("fold");
        this.status = "折叠";
      } else {
        ele.addClass("fold");
        this.status = "展开";
      }
    },
  },
  created() {},
  mounted() {
    BJY.QuestionAnswer.create({
      element: $("#question-answer .placeholder"),
      replace: true,
      // 是否能够管理问题，老师或者助教传入true，学生传入false，会依据这个参数创建不同视图的面板
      canManageQuestion: BJY.auth.isTeacher(),
      // 每分钟限制发送的次数，可不传，默认值为10
      limitPerMinute: 100,
      // 每页显示的条数，可不传，默认为50
      countPerPage: 50,
      // 输入框可输入的最大长度，可不传，默认为140
      inputMaxLength: 140,
      // 是否是滑动翻页，仅在移动端时可用！！默认为false
      pageBySwipe: false,
      // 复制完成时的回调
      onCopyFinish: function () {},
    });
  },
  beforeDestroy() {},
};
</script>

<style lang="scss">
//@import url(); 引入公共css类
#question-answer {
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 0;

  .bjy-question-answer {
    position: absolute !important;
    top: 36px !important;
    bottom: 0 !important;
    width: 100% !important;
  }

  .bjy-question-list .bjy-scrollable {
    position: absolute !important;
    bottom: 30px !important;
    top: 40px !important;
    width: 100% !important;
    height: unset;
  }

  .question-answer-bar {
    position: absolute;
    width: 100%;
    top: 0;
    height: 36px;
    border-top: 1px solid #979797;
    border-bottom: 1px solid #979797;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;

    .toggle {
      cursor: pointer;
      :hover {
        color: #1795ff;
      }
    }
  }
}
</style>
