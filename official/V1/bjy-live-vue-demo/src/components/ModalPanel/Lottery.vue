<!-- 模态框组件：在老师端发起各种互动后弹出 -->
<!-- 如：点名、答题等 -->

<template>
  <div
    v-show="visible"
    id="bjy-lottery"
    :class="{ 'command-lottery-hint': commandLotteryDuration }"
  >
    <div v-if="!commandLotteryDuration" class="mask"></div>
    <div class="lottery-wrap">
      <div id="lottery">
        <div class="placeholder"></div>
        <div class="bjy-close" @click="close">X</div>
      </div>

      <div id="lottery-hit">
        <div class="placeholder"></div>
      </div>

      <div id="lottery-history">
        <div class="bjy-close" @click="close">
          X
        </div>
        <div class="placeholder"></div>
      </div>
    </div>

    <div v-if="commandLotteryDuration" class="command-lottery-count">
      <p>抽奖中，剩余{{ commandLotteryDuration }}秒</p>
      <div v-if="!isStudent" class="btn" @click="drawLottery">现在开奖</div>
      <div v-else>聊天框输入{{ lotteryCommand }}参与抽奖</div>
    </div>
  </div>
</template>

<script>
const eventEmitter = BJY.eventEmitter;
const auth = BJY.auth;

export default {
  data() {
    return {
      visible: false,
      commandLotteryDuration: 0,
      lotteryTimer: null,
      isStudent: auth.isStudent(),
      lotteryCommand: "",
      lottery: null,
    };
  },
  created() {
    BJY.Lottery.init();
    eventEmitter
      .on(eventEmitter.LOTTERY_HISTORY_RES, (event, data) => {
        this.show();
        $("#lottery").hide();
        $("#lottery-history").show();
        // 查看中奖纪录
        var historyComponent = BJY.LotteryHistory.create({
          replace: false,
          element: $("#lottery-history .placeholder"),
          list: data.history,
          roomId: +BJY.store.get("class.id"),
        });
      })
      //   标准抽奖
      .on(eventEmitter.STANDARD_LOTTERY_BEGIN, () => {
        this.show();
      })
      .on(eventEmitter.STANDARD_LOTTERY_BEGIN_TRIGGER, () => {
        $("#lottery").hide();
      })
      .on(eventEmitter.STANDARD_LOTTERY_END, (event, data) => {
        this.show();
        this.createHitList(data);
      })
      // 口令抽奖
      .on(eventEmitter.COMMAND_LOTTERY_ABORT, (event, data) => {
        this.show();
        this.createHitList(data);
      })
      .on(eventEmitter.COMMAND_LOTTERY_END_TRIGGER, (event, data) => {
        this.commandLotteryDuration = 0;
        $("#lottery").hide();
        console.log("command lottery end.");
      })
      .on(eventEmitter.COMMAND_LOTTERY_BEIGIN, (e, data) => {
        $("#lottery").hide();
        this.show();
        console.log(data);
        this.commandLotteryDuration = data.duration;
        this.lotteryCommand = data.command;
        if (this.lotteryTimer) {
          clearInterval(this.lotteryTimer);
          this.lotteryTimer = null;
        }
        this.lotteryTimer = setInterval(() => {
          if (this.commandLotteryDuration > 0) {
            --this.commandLotteryDuration;
          } else {
            auth.isTeacher() && this.drawLottery();
            clearInterval(this.lotteryTimer);
            this.lotteryTimer = null;
          }
        }, 1000);
      })
      .on("toggle_lottery", () => {
        this.visible = !this.visible;
        this.createLottery();
      });
  },
  mounted() {
    this.createLottery();
  },
  methods: {
    close() {
      this.visible = false;
      $("#lottery").show();
      $("#lottery-history").hide();
    },
    show() {
      this.visible = true;
    },
    // 口令开奖
    drawLottery() {
      clearInterval(this.lotteryTimer);
      this.lotteryTimer = null;
      this.commandLotteryDuration = 0;
      eventEmitter.trigger(eventEmitter.COMMAND_LOTTERY_ABORT_TRIGGER);
    },
    // 中奖名单
    createHitList(data) {
      $("#lottery").hide();
      $("#lottery-hit").show();
      var hitComponent = BJY.LotteryHit.create({
        element: $("#lottery-hit .placeholder"),
        list: data.hitList,
        replace: false,
        lotteryName: data.lotteryName,
        onClose: () => {
          console.log("lottery close.");
          $("#lottery-hit").hide();
          $("#lottery").show();
          this.close();
        },
        // 中奖者填写信息
        onSubmit: (name, tel) => {
          console.log(name, tel);
        },
      });

      if (!auth.isStudent() && !hitComponent.get('isHit')) {
          hitComponent.set('status', 0);
      }
    },

    createLottery() {
      console.log("create lottery.");
      if (auth.isTeacher()) {
        this.lottery = null;
        this.lottery = BJY.Lottery.create({
          replace: false,
          element: $("#lottery .placeholder"),
          // 可以传入自定义皮肤重写样式 默认红色
          skin: "red",
        });

        this.lottery.on("refresh", function () {
          // 抽奖模式更新 切换标准抽奖或者口令抽奖
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#bjy-lottery {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  box-shadow: none;
  z-index: 11;
  transform: none;

  &.command-lottery-hint {
    left: 10px;
    padding: 10px;
    bottom: 100px;
    top: unset;
    width: 240px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  }

  #lottery-history {
    background: #fff;
  }

  .mask {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 0;
    background: rgba(0, 0, 0, 0.2);
  }

  .lottery-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .bjy-close {
      position: absolute;
      top: -10px;
      right: -20px;
      color: #fff;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .command-lottery-count {
    .btn {
      background: #1795ff;
      color: #fff;
      padding: 0 20px;
      line-height: 30px;
      height: 30px;
      cursor: pointer;
    }
  }
}
</style>
