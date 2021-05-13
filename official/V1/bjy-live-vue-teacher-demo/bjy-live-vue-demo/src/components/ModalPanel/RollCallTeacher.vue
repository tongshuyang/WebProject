<!-- 点名组件实现： 点名没有独立的组件来实现，我们提供了一套事件驱动的点名系统 -->

<template>
  <div v-show="visible" id="roll-call-dialog" class="teacher">
    <div v-show="status === statusMap.before" class="before-roll-call">
      <p>
        请设置学生需要在
        <input v-model="rollCallDuration" type="number" />
        秒内响应
      </p>
      <div @click="startRollCall" class="btn start-btn">发起点名</div>
    </div>

    <div v-show="status === statusMap.ing" class="roll-call-ing">学生正在陆续答到中，{{ resultTimer }}秒后可查看点名结果，请稍后</div>

    <div v-show="status === statusMap.after" class="after-roll-call">
      <p class="result">答到情况：答到{{ ackCount }}人，未答到{{ nackCount }}人</p>
      <div class="btn" @click="reCall">再次点名</div>
    </div>

    <div class="btn-close" @click="close">X</div>
  </div>
</template>

<script>
import language from "../../language/main";

const auth = BJY.auth;
const eventEmitter = BJY.eventEmitter;

const ROLL_CALL_STATUS = {
    before: 0,
    ing: 1,
    after: 2
}

export default {
  data() {
    return {
      language: language,
      status: 0,
      isTeacher: auth.isTeacher(),
      resultTimer: 60,
      nextTimer: 60,
      result: "",
      rollCallDuration: 60,
      visible: false,
      status: ROLL_CALL_STATUS.before,
      statusMap: ROLL_CALL_STATUS,
      resultInterval: null,
      ackCount: 0, // 答到人数
      nackCount: 0, // 未答到人数
    };
  },
  created() {
    eventEmitter
      .on("toggle_roll_call", () => {
        this.show();
      })
      .on(
        // 点名结果
        eventEmitter.ROLL_CALL_RESULT,
        (e, data) => {
          var result = data;
        //  点名结果 
          console.log(result);
          this.status = ROLL_CALL_STATUS.after

          this.ackCount = result.ackList.length
          this.nackCount = result.nackList.length
        }
      )
      .on(
        // 点名开始
        eventEmitter.ROLL_CALL,
        () => {
            this.resultTimer = this.rollCallDuration
            this.status = ROLL_CALL_STATUS.ing
            this.resultInterval = null
            this.resultInterval = setInterval(() => {
                if (this.resultTimer > 0) {
                    --this.resultTimer;
                } else {
                    // 时间到了需要老师端主动触发结束
                    eventEmitter.trigger(eventEmitter.ROLL_CALL_FINISH);
                    clearInterval(this.resultInterval)
                }
            }, 1000);
        }
      );
  },
  methods: {
    show() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    startRollCall() {
      eventEmitter.trigger(eventEmitter.ROLL_CALL_TRIGGER, {
        // 倒计时 秒
        duration: this.rollCallDuration,
      });
    },
    reCall() {
        this.status = ROLL_CALL_STATUS.before
    }
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
#roll-call-dialog {
  background: #fff;
  padding: 24px;
  font-size: 14px;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .before-roll-call {
  }

  .roll-call-ing {
  }

  .after-roll-call {
  }

  .btn {
    margin: 20px auto;
    background: #1795ff;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    cursor: pointer;
    color: #fff;
  }
}
</style>
