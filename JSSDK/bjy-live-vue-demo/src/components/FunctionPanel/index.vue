<template>
    <div class="function-panel">
        <!-- 举手菜单 -->
        <div class="btn-wrap">
            <SpeakApplyMenu/>
        </div>

        <!-- 屏幕分享菜单 -->
        <div class="btn-wrap">
            <ShareScreenMenu/>
        </div>

        <!-- 弹幕按钮 -->
        <div @click="toggleBarrage()" class="btn-wrap">
            <i v-if="isBarrageOn" class="icon icon-barrage-on"></i>
            <i v-else class="icon icon-barrage-off"></i>
            {{barrageState}}
        </div>

        <!-- 线路切换 -->
        <select class="cdn-node-list" v-if="cdnList.length > 1 && canSwitchCdn" v-model="currentNode" name="cdn" id="cdn-list">
            <option v-for="index in cdnList.length" :key="index" :value="index">{{index | cdnListFilter}}</option>
        </select>

    </div>
</template>

<script>
import language from '../../language/main'
import SpeakApplyMenu from './SpeakApplyMenu'
import ShareScreenMenu from './ShareScreenMenu'

let store = BJY.store
let eventEmitter = BJY.eventEmitter
let auth = BJY.auth

export default {
  components: {
    SpeakApplyMenu,
    ShareScreenMenu,
    MessageList
  },
  data () {
    return {
      status: '',
      language: language,
      isStudent: auth.isStudent(),
      barrage: null,
      isBarrageOn: false,
      cdnList: [],
      currentNode: 1,
      canSwitchCdn: !BJY.auth.isWebRTC()
    }
  },
  computed: {
    barrageState () {
      return this.isBarrageOn ? language.BARRAGE_ON : language.BARRAGE_OFF
    }
  },
  watch: {
    currentNode (newIndex, oldIndex) {
      console.log(newIndex)
      eventEmitter.trigger(
        eventEmitter.DOWNLINK_SERVER_NODE_CHANGE_TRIGGER,
        {
          index: newIndex - 1
        }
      )
    }
  },
  filters: {
    cdnListFilter (index) {
      return '线路' + index
    }
  },
  methods: {
    handleStart () {
      if (store.get('class.started')) {
        eventEmitter.trigger(eventEmitter.CLASS_END_TRIGGER)
      } else {
        eventEmitter.trigger(eventEmitter.CLASS_START_TRIGGER)
      }
    },
    toggleBarrage () {
      let isOpen = this.barrage.isOpened()
      if (isOpen) {
        this.barrage.close()
        this.isBarrageOn = false
      } else {
        this.barrage.open()
        this.isBarrageOn = true
      }
    }
  },
  created () {
    if (store.get('class.started')) {
      this.status = language.CLASS_END
    } else {
      this.status = language.CLASS_START
    }

    eventEmitter
      .on(
        eventEmitter.CLASS_START,
        () => {
          this.status = language.CLASS_END
          this.$Toast(language.TIP_CLASS_START)
        }
      )
      .on(
        eventEmitter.CLASS_END,
        () => {
          this.status = language.CLASS_START
          this.$Toast(language.TIP_CLASS_END)
        }
      )
    // 获取k可用的cdn节点
    this.cdnList = BJY.data.server.getLiveServerList()
  },
  mounted () {
    // 调用 create 方法创建弹幕组件
    // 弹幕组件不需要独立的容器，只需要在create中提供挂载的容器
    this.barrage = new BJY.Barrage({
    // 组件父容器
      container: $('.class-panel'),
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
        console.log(messageList.format(data.content));
        return data.content
      }
    })
  },
  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
.function-panel {
    display: flex;
    justify-content: space-around;
    align-items: center;

    & > * {
        margin: 0 10px;
        padding: 2px 8px;
        cursor: pointer;
        display: flex;

        &:hover {
            border-radius: 4px;
            background-color: rgba(255, 255, 255, .3);
            color: #fff;
            transition: all .3s;
        }
    }

    .btn-wrap {
        align-items: center;

        .icon-barrage-on, .icon-barrage-off {
            font-size: 22px;
            margin-right: 5px;
        }
    }
}
</style>
