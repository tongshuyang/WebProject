<template>
  <div id="menu-mic"></div>
</template>

<script>
import language from "../../language/main";

let store = BJY.store;
let config = BJY.config;

export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
    // 创建麦克风菜单
    BJY.MicMenu.create({
      element: $("#menu-mic"),
      maxVolume: 100,
      canSelectDevice: true,
      canAdjustVolume: true,
      onSwitcherClick: () => {
        if (!store.get("class.started")) {
          // 针对教室状态给出相应的提示，你可以使用任何你喜欢的UI来处理他们，这里我使用的是自定义的全局tip，下同
          this.$Toast(language.TIP_CLASS_NOT_START);
          return;
        }
        if (store.get("class.speakState") == config.SPEAK_STATE_LIMIT) {
          this.$Toast(language.TIP_SPEAK_LIMIT);
          return;
        }
        // 获取我的播放器
        var player = BJY.Player.instances[BJY.store.get("user.id")];
        // 设置麦克风设备
        BJY.userPublish.setDevice(player, null, !player.audioOn);
      },
    });
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
