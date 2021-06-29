<!-- 答题器组件 -->
<template>
  <div v-show="visible && !isStudent" id="attention-detection">
    <div class="close-bar">
      <span @click="close" class="bjy-close">X</span>
    </div>
    <div class="placeholder"></div>
  </div>
</template>

<script>
import language from "../../language/main";
const eventEmitter = BJY.eventEmitter;
const auth = BJY.auth;

export default {
  components: {},
  data() {
    return {
      language,
      visible: false,
      isStudent: auth.isStudent(),
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
  },
  created() {
    // 学生端需要监听事件
    if (auth.isStudent()) {
      eventEmitter.on(eventEmitter.ATTENTION_DETECTION_ALERT, function (event, data) {
        if (data.content) {
          alert(data.content);
        }
      });
    }
    eventEmitter.on("toggle_attention_detection", () => {
      this.visible = !this.visible;
    });
  },
  mounted() {
    BJY.AttentionDetection.create({
      element: $("#attention-detection .placeholder"),
      replace: false,
      skin: "light",
    });
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
#attention-detection {
  background: #fff;
  min-width: 600px;

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
