<template>
  <div id="record-menu"></div>
</template>

<script>
import language from "../../language/main";

let store = BJY.store;
let eventEmitter = BJY.eventEmitter;
let auth = BJY.auth;

export default {
  data() {
    return {
        record: null
    };
  },

  methods: {},
  created() {},
  mounted() {
    // 创建录制按钮组件
    this.record = BJY.Record.create({
      element: $("#record-menu"),
      // 是否可以使用快捷键
      canUseHotKey: true,
      // 停止本地录制的快捷键
      stopLocalRecordHotKey: "ctrl + s",
      // 是否可以云端录制
      canUseCloudRecord: true,
      // 是否可以本地录制(仅客户端支持)
      canUseLocalRecord: false,
      // 开始云端录制回调
      // 如果需要用户自己选择长期课在已经存在一段录制的情况下是否开始新的录制，需要像以下的方式传入此回调函数，否则默认会继续上一段录制
      onStartCloudRecord: function (deferred) {
        // 长期课程如果已经存在一段录制，需要确认"继续录制"或者"开始新的录制"
        // 如果需要确认才会有deferred参数传入，因此需要先判断是否有Promise需要被处理
        if (deferred) {
          // 注意：不论是否要开始新的录制，都需要resolve该Promise。返回0表示继续录制，1表示开始新的录制
          if (confirm("是否开始新的录制？")) {
            deferred.resolve(1);
          } else {
            deferred.resolve(0);
          }
        }
      },
      // 开始本地录制回调，可以通过返回一个对象来指定本地录制的画面尺寸
      // 这个回调不是必需的，默认录制的尺寸为document.body的大小
      onStartLocalRecord: function () {
        return {
          width: 500,
          height: 300,
        };
      },
      // 向用户确认是否立即生成回放
      // 这个回调不是必需的，默认为不立即生成回放
      onPlaybackGenerateConfirm: function (deferred) {
        if (confirm("是否立即生成回放？")) {
          deferred.resolve(1);
        } else {
          deferred.resolve(0);
        }
      },
    });
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped></style>
