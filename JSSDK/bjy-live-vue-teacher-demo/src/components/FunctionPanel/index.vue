<template>
  <div class="function-panel">
    <div class="left">
      <div class="bjy-spacer"></div>
      <!-- 上下课 -->
      <div v-if="!isStudent" @click="toggleClassStart">
        {{ statusTip }}
      </div>

      <!-- 录制按钮 -->
      <Record class="bjy-custom-record" v-if="!isStudent" />

      <div v-if="!isStudent" @click="toggleQuiz">测验</div>

      <div v-if="!isStudent" @click="toggleAnswer">答题器</div>

      <div v-if="!isStudent" @click="toggleMediaPlayer">播放</div>

      <div v-if="!isStudent" @click="toggleRollCall">点名</div>

      <div v-if="!isStudent" @click="toggleLottery">抽奖</div>

      <div v-if="!isStudent" @click="toggleAttentionDetection">专注度检测</div>
    </div>

    <div class="right">
      <!-- 举手菜单 -->
      <div v-if="isStudent" class="btn-wrap">
        <SpeakApplyMenu />
      </div>

      <!-- 屏幕分享菜单 -->
      <div class="btn-wrap">
        <ShareScreenMenu />
      </div>

      <!-- 弹幕按钮 -->
      <div @click="toggleBarrage()" class="btn-wrap">
        <i v-if="isBarrageOn" class="icon icon-barrage-on"></i>
        <i v-else class="icon icon-barrage-off"></i>
        {{ barrageState }}
      </div>

      <!-- 线路切换 -->
      <select
        class="cdn-node-list"
        v-if="cdnList.length > 1 && canSwitchCdn"
        v-model="currentNode"
        name="cdn"
        id="cdn-list"
      >
        <option v-for="index in cdnList.length" :key="index" :value="index">
          {{ index | cdnListFilter }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import language from "../../language/main";
import SpeakApplyMenu from "./SpeakApplyMenu";
import ShareScreenMenu from "./ShareScreenMenu";
import Record from "./Record";

let store = BJY.store;
let eventEmitter = BJY.eventEmitter;
let auth = BJY.auth;
let parser = BJY.parser;

export default {
  components: {
    SpeakApplyMenu,
    ShareScreenMenu,
    Record,
  },
  data() {
    return {
      statusTip: "",
      language: language,
      isStudent: auth.isStudent(),
      barrage: null,
      isBarrageOn: false,
      cdnList: [],
      currentNode: 1,
      canSwitchCdn: !BJY.auth.isWebRTC(),
    };
  },
  computed: {
    barrageState() {
      return this.isBarrageOn ? language.BARRAGE_ON : language.BARRAGE_OFF;
    },
  },
  watch: {
    currentNode(newIndex, oldIndex) {
      console.log(newIndex);
      eventEmitter.trigger(eventEmitter.DOWNLINK_SERVER_NODE_CHANGE_TRIGGER, {
        index: newIndex - 1,
      });
    },
  },
  filters: {
    cdnListFilter(index) {
      return "线路" + index;
    },
  },
  methods: {
    toggleClassStart() {
      if (store.get("class.started")) {
        eventEmitter.trigger(eventEmitter.CLASS_END_TRIGGER);
      } else {
        eventEmitter.trigger(eventEmitter.CLASS_START_TRIGGER);
      }
    },
    toggleBarrage() {
      let isOpen = this.barrage.isOpened();
      if (isOpen) {
        this.barrage.close();
        this.isBarrageOn = false;
      } else {
        this.barrage.open();
        this.isBarrageOn = true;
      }
    },
    toggleQuiz() {
      eventEmitter.trigger("toggle_quiz_dialog");
    },
    toggleAnswer() {
      eventEmitter.trigger("toggle_answer_dialog");
    },
    toggleMediaPlayer() {
      eventEmitter.trigger("toggle_media_player");
    },
    toggleRollCall() {
      eventEmitter.trigger("toggle_roll_call");
    },
    toggleLottery() {
      eventEmitter.trigger("toggle_lottery");
    },
    toggleAttentionDetection() {
      eventEmitter.trigger("toggle_attention_detection");
    },
  },
  created() {
    store.watch(
      "class.started",
      (started) => {
        if (started) {
          this.statusTip = language.CLASS_END;
          this.$Toast(language.TIP_CLASS_START);
        } else {
          this.statusTip = language.CLASS_START;
          this.$Toast(language.TIP_CLASS_END);
        }
        this.started = started;
      },
      true
    );
    // 获取k可用的cdn节点
    this.cdnList = BJY.data.server.getLiveServerList();
  },
  mounted() {
    // 调用 create 方法创建弹幕组件
    // 弹幕组件不需要独立的容器，只需要在create中提供挂载的容器
    this.barrage = new BJY.Barrage({
      // 组件父容器
      container: $(".class-panel"),
      // 移动速度，每秒移动多少个像素
      speed: 100,
      // 最长可显示多少个字，超过这个字数的会过滤
      maxLength: 20,
      // 在 top - bottom 的区间出现弹幕
      top: 30,
      bottom: 30,
      // 轨道高度
      trackHeight: 30,
      // 是否只显示文本消息
      textOnly: false,
      // 如果需要自定义弹幕内容，可实现此方法
      renderContent: function (data) {
        var paramData = data.data;
        var content = data.content;

        var renderEmoji = BJY.data.emotion.render;

        if (paramData) {
          if (paramData.type === "emoji") {
            content = renderEmoji(
              paramData.key,
              paramData.url || parser.getEmojiUrlByKey(paramData.key)
            );
          } else {
            return false;
          }
        } else {
          content = $.trim(content);
          if (parser.isPureText(content)) {
            content = parser.encodeHTML(content);
            content = parser.parseWhitespace(content);
            content = parser.parseBreakline(content);
            content = parser.parseEmoji(content, renderEmoji);
          } else {
            content = parser.parseEmoji(content, renderEmoji);
          }
        }
        return content;
      },
    });
  },
  beforeDestroy() {},
};
</script>

<style lang="scss">
//@import url(); 引入公共css类
.function-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;

  .left,
  .right {
    display: flex;

    & > * {
      margin: 0 4px;
      padding: 2px 12px;
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover {
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 0.3);
        color: #fff;
        transition: all 0.3s;
      }
    }

    .bjy-custom-record {
      display: flex;
      align-items: center;

      .bjy-menu-switcher {
        padding: 0;

        .bjy-label {
          margin-left: 0;
          vertical-align: unset;
        }

        &:hover {
          background: none;
          color: #bdc6cf;
        }
      }

      .bjy-cloud-record-ing:after {
        top: 5px;
        left: -7px;
      }
    }
  }

  .bjy-spacer {
    margin-right: 200px;
  }
}
</style>
