<!-- 点名组件实现： 点名没有独立的组件来实现，我们提供了一套事件驱动的点名系统 -->

<template>
  <div id="roll-call-dialog"></div>
</template>

<script>
import language from "../../language/main";

let auth = BJY.auth;
let eventEmitter = BJY.eventEmitter;

export default {
  components: {},
  data() {
    return {
      language: language,
      status: 0,
      isStudent: auth.isStudent(),
      applyTimer: null,
      timeLeft: "",
      result: "",
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {
    eventEmitter.on(
      eventEmitter.ROLL_CALL, // 老师发起了点名
      (e, data) => {
        this.timeLeft = data.duration;
        this.$Dialog
          .show({
            title: "点名",
            content: `请在<span id="roll-call-time-left">${data.duration}</span>秒内响应`,
            confirmText: "答到",
          })
          .then(() => {
            eventEmitter.trigger(eventEmitter.ROLL_CALL_RES);
          })
          .catch((e) => {
            console.log(e);
          });

        this.applyTimer = setInterval(() => {
          if (this.timeLeft === 0) {
            clearInterval(this.applyTimer);
            this.$Dialog.hide();
          }
          $("#roll-call-time-left").text(this.timeLeft);
          this.timeLeft--;
        }, 1000);
      }
    );
  },
  mounted() {},
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
