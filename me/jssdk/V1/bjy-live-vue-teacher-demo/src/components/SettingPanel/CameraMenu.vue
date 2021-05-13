<template>
  <div id="menu-camera"></div>
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
    // 创建摄像头菜单
    BJY.CameraMenu.create({
      element: $("#menu-camera"),
      canSelectDevice: true,
      onSwitcherClick: () => {
        if (!store.get("class.started")) {
          this.$Toast(language.TIP_CLASS_NOT_START);
          return;
        }
        if (
          !BJY.auth.isTeacher() &&
          store.get("class.speakState") == config.SPEAK_STATE_LIMIT
        ) {
          this.$Toast(language.TIP_SPEAK_LIMIT);
          return;
        }
        // 获取我的播放器
        var player = BJY.Player.instances[BJY.store.get("user.id")];
        // 设置摄像头设备
        BJY.userPublish.setDevice(player, !player.videoOn);
      },
    });
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped></style>
