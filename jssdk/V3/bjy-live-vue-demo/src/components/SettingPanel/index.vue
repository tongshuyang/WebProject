<template>
  <div id="setting">
    <CameraMenu />
    <MicMenu />
    <SpeakerMenu />
    <SettingMenu />
  </div>
</template>

<script>
import MicMenu from "./MicMenu";
import SpeakerMenu from "./SpeakerMenu";
import CameraMenu from "./CameraMenu";
import SettingMenu from "./SettingMenu";

export default {
  components: {
    MicMenu,
    SpeakerMenu,
    CameraMenu,
    SettingMenu
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
#setting {
  display: flex;
  align-items: center;
}
</style>
