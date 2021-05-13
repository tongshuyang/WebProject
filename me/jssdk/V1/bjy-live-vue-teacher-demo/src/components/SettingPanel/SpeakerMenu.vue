<template>
  <div id="menu-speaker"></div>
</template>

<script>
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
    // 创建扬声器菜单
    BJY.SpeakerMenu.create({
      element: $("#menu-speaker"),
      canAdjustVolume: true,
      maxVolume: 100,
    });
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
