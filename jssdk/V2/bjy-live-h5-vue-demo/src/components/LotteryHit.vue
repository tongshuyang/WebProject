<template>
  <div class="lottery-container">
    <div class="lottery-hit"></div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    destoryHitComp: function () {
      if (this.lotteryHitComp) {
        this.lotteryHitComp.destroy();
      }
    },

    createLotteryHit: function (data) {
      // 中奖记录
      let me = this;
      let store = BJY.store;
      me.destoryHitComp();
      me.lotteryHitComp = BJY.LotteryHit.create({
        element: $(".lottery-hit"),
        list: data.hitList,
        lotteryName: data.lotteryName,
        replace: false,
        skin: "h5-red",
        onSubmit: function (name, tel) {
          // 留存中奖记录
        },
        onClose: function () {
          me.destoryHitComp();
        },
      });
    },
  },
  created() {},
  mounted() {
    let eventEmitter = BJY.eventEmitter;
    let me = this;
    // 初始化抽奖事件和开奖动画
    BJY.Lottery.init({
      needAnimation: true,
    });

    eventEmitter
      .on(
        eventEmitter.STANDARD_LOTTERY_END,
        function (event, data) {
          me.createLotteryHit(data);
        }
      )
      .on(
        eventEmitter.COMMAND_LOTTERY_ABORT,
        function (event, data) {
          me.createLotteryHit(data);
        }
      )
      .on(
        eventEmitter.COMMAND_LOTTERY_BEIGIN,
        function (event, data) {
          // 口令抽奖开始 这里可处理引导用户输入口令
          let command = data.command;
        }
      )
  },
  beforeDestroy() {},
};
</script>

<style lang="scss">
.lottery-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  .bjy-lottery-hit-red .bjy-container {
    box-sizing: border-box;

    .bjy-lottery-name {
      padding-right: 0 !important;
    }
  }
}

#lottery-animation-placeholder.bjy-lottery-interlude {
  .bjy-golden-egg-fall-keyframe,
  .bjy-countdown,
  .bjy-golden-egg-boom-keyframe {
    z-index: 2;
    width: 258px;
    height: 390px;
  }

  .bjy-golden-egg-fall-keyframe {
    background-size: 100%;
    background-position: 0 -500px;
    animation: eggFallMoblie 0.8s ease-in;
  }

  .bjy-countdown {
    height: 450px;
    background-size: 100%;
    .bjy-time {
      bottom: -320px;
      font-size: 25px;
    }
  }

  .bjy-golden-egg-boom-keyframe {
    bottom: -270px;
  }
}

@keyframes eggFallMoblie {
  0% {
    background-position: 0 -500px;
    opacity: 1;
  }

  60% {
    background-position: 0 -96px;
    opacity: 1;
  }

  80% {
    background-position: 0 -116px;
    opacity: 1;
  }

  99% {
    background-position: 0 -96px;
    opacity: 1;
  }
  100% {
    background-position: 0 -96px;
    opacity: 0;
  }
}
</style>
