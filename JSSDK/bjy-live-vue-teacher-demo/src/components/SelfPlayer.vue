<template>
  <div id="live-self-player"></div>
</template>

<script>
let store = BJY.store;
let eventEmitter = BJY.eventEmitter;
export default {
  components: {},
  data() {
    return {
      player: null,
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 创建自己的播放器
    createMyPlayer(element) {
      this.player = BJY.DefaultThemePlayer.create({
        element: $("#live-self-player"),
        replace: false,
        user: store.get("user"),
        extension: BJY.getExtension(),
        canFold: true,
        canSwitchCamera: true,
        canSwitchMic: true,
        onComplete: function () {
          eventEmitter.trigger(eventEmitter.MEDIA_SWITCH_TRIGGER, {
            videoOn: false,
            audioOn: false,
          });
        },
      });
    },
  },
  created() {},
  mounted() {
    this.createMyPlayer();
    eventEmitter.on(
      // 监听自己摄像头和麦克风变化
      eventEmitter.MEDIA_SWITCH_TRIGGER,
      function (event, data) {
        var player = BJY.Player.instances[store.get("user.id")];
        player && BJY.userPublish.setDevice(player, data.videoOn, data.audioOn);
      }
    );

    // 监听自己播放器是否折叠
    this.player &&
      this.player.watch("isFolded", (isFolded) => {
        var element = $(".live-self-player");
        if (isFolded) {
          // 执行折叠
          element.addClass("hide");
        } else {
          // 执行展开
          element.removeClass("hide");
        }
      });
  },
  beforeDestroy() {},
};
</script>

<style lang="scss">
//@import url(); 引入公共css类
#live-self-player {
  width: 100%;
  height: 100%;
}
</style>
