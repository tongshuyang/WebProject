<template>
  <div id="active" :class="{ empty: noOneSpeaking }">
    <div v-if="isTeacher" id="active-list">
      <div class="placeholder"></div>
    </div>

    <!-- 申请列表 -->
    <div v-if="isTeacher" class="bjy-apply-list">
      <div class="placeholder"></div>
    </div>

    <!-- 自己播放器 -->
    <div v-else class="live-self-player">
      <SelfPlayer />
    </div>
  </div>
</template>

<script>
// 自己播放器
import SelfPlayer from "../SelfPlayer";
const eventEmitter = BJY.eventEmitter;
const auth = BJY.auth;

export default {
  name: "activeList",
  components: {
    SelfPlayer,
  },
  data() {
    return {
      activeList: null,
      noOneSpeaking: true,
      isTeacher: false,
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {
    this.isTeacher = auth.isTeacher();
  },
  mounted() {
    if (this.isTeacher) {
      const activeList = BJY.ActiveList.create({
        element: $("#active-list .placeholder"), // 父容器
        extension: BJY.getExtension(), // 播放器扩展
        width: 260, // 父容器宽度，用于计算播放器的高度
        replace: false, // 是否替换父容器下的 DOM
      });

      eventEmitter.on(
        eventEmitter.ACTIVE_LIST_PRESENTER_CHANGE_TRIGGER,
        function (event, data) {
          activeList.changePresenter(data.newPresenter, data.oldPresenter);
        }
      );

      activeList.watch("userList.length", (newValue, oldValue) => {
        if (newValue !== 0) {
          this.noOneSpeaking = false;
        } else {
          this.noOneSpeaking = true;
        }
      });

      BJY.ApplyList.create({
        element: $(".bjy-apply-list .placeholder"), // 组件父容器
        replace: false, // 是否替换父容器下的 DOM
      });
    }
  },
};
</script>

<style lang="scss">
//@import url(); 引入公共css类
#active {
  .live-self-player {
    height: 200px;
    width: 266px;
    position: absolute;
    bottom: 0;
    transition: 0.2s bottom;
  }
  & > .hide {
    bottom: -200px !important;
  }

  & > .hide .bjy-fold-bar {
    top: -24px !important;
  }

  & > .hide .bjy-fold-bar .bjy-fold-toggle {
    background: #424242 !important;
  }
}
.empty {
  height: 100%;
  width: 100%;
  background: url("../../assets/img/active-user-list-empty.png") center center no-repeat;
}
</style>
