<template>
  <div id="loading"></div>
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
    let loading = BJY.Loading.create({
      // 占位元素
      element: $("#loading"),
      // logo URL 可自定义自己的加载 logo
      logoUrl: "http://img.baijiayun.com/0baijiacloud/logo/ydzb/v5/www-loading.png",
    });

    // 获取事件处理对象 eventEmitter
    var eventEmitter = BJY.eventEmitter;
    eventEmitter
      // 监听 loading 开始加载事件， one() 函数表示事件只处理一次，若需要一直监听请使用 on() 函数
      .one(eventEmitter.LOADING_PANEL_START, (event, data) => {
        // loading 开始加载时要做的事情
      })
      // 监听 loading 结束加载事件
      .one(eventEmitter.LOADING_PANEL_END, (event, data) => {
        // loading 结束加载时要做的事情

        /*
         * 销毁 Loading 对象，可在此销毁进度条，
         * 若此时直播尚未开始，可以先进入倒计时等待页面，直到接收到事件 eventEmitter.VIEW_RENDER_TRIGGER
         */
        loading.destroy();
      })
      // 监听初始化事件
      .one(eventEmitter.VIEW_RENDER_TRIGGER, (event, data) => {
        // 服务器已准备就绪，开始初始化业务界面，进入直播页面
        // 加载直播需要的各种组件，包括播放器，白板，用户列表等等
      });
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
