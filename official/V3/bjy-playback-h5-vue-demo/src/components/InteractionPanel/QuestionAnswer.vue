<template>
  <div id="question-answer">
    <div class="placeholder"></div>
  </div>
</template>

<script>
const store = BJY.store
export default {
  components: {},
  data () {
    return {
      user: store.get('user')
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () { },
  mounted () {
    BJY.QuestionAnswer.create({
      element: $('#question-answer .placeholder'),
      replace: true,
      // 是否能够管理问题，老师或者助教传入true，学生传入false，会依据这个参数创建不同视图的面板
      canManageQuestion: false,
      // 每分钟限制发送的次数，可不传，默认值为10
      limitPerMinute: 100,
      // 每页显示的条数，可不传，默认为50
      countPerPage: 8,
      // 输入框可输入的最大长度，可不传，默认为140
      inputMaxLength: 140,
      // 是否是滑动翻页，仅在移动端时可用！！默认为false
      pageBySwipe: true,
      inputFieldVisible: false,
      // 复制完成时的回调
      onCopyFinish: function () {
      }
    })
  },
  beforeDestroy () { }
}
</script>

<style lang='scss'>
//@import url(); 引入公共css类
#question-answer {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  visibility: hidden;
  .bjy-question-answer {
    height: 100%;
    width: 100%;
    font-size: 14px;

    .bjy-footer {
      display: none;
    }

    .bjy-page-info {
      bottom: 52px;
      right: 10px;
    }

    .bjy-question-list {
      position: absolute;
      top: 0;
      bottom: 70px;
      width: 100%;

      .bjy-scrollable {
        height: 100%;
      }
    }

    .bjy-sender-box {
      display: none !important;
    }
  }
}
</style>
