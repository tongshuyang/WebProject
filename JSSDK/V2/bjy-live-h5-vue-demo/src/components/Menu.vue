<template>
  <div class="menu">
    <span class="user-count">{{userCount}}人在线</span>

    <span class="btn-wrap">
      <select class="cdn-node-list" v-if="cdnList.length > 1 && canSwitchCdn" v-model="currentNode" name="cdn" id="cdn-list">
        <option v-for="index in cdnList.length" :key="index" :value="index">{{index | cdnListFilter}}</option>
      </select>
      <i v-if="isPptAsMain" class="icon icon-teacher" @click="swap()"></i>
      <i class="icon icon-notice-btn" @click="noticeToggle()"></i>
      <i v-if="isBarrageOn" class="icon icon-barrage-on" @click="barrageToggle()"></i>
      <i v-else class="icon icon-barrage-off" @click="barrageToggle()"></i>
      <i class="icon icon-refresh" @click="refresh()"></i>
      <i class="icon icon-full-screen" @click="fullScreen()"></i>
    </span>
  </div>
</template>

<script>
const eventEmitter = BJY.eventEmitter

export default {
  components: {},
  props: ['isPptAsMain'],
  data () {
    return {
      userCount: 1,
      isBarrageOn: false,
      cdnList: [],
      currentNode: 1,
      canSwitchCdn: !BJY.auth.isWebRTC()
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
    swap () {
      this.$emit('buttonPress', 'swap')
    },
    noticeToggle () {
      this.$emit('buttonPress', 'notice')
    },
    barrageToggle () {
      this.$emit('buttonPress', 'barrage')
    },
    refresh () {
      this.$emit('buttonPress', 'refresh')
    },
    fullScreen () {
      this.$emit('buttonPress', 'fullscreen')
    },
    toggleIcon (isBarrageOn) {
      this.isBarrageOn = isBarrageOn
    }
  },
  created () {
    eventEmitter.on(
      eventEmitter.USER_COUNT_CHANGE,
      (e, data) => {
        this.userCount = data.userCount
      }
    )

    // 获取k可用的cdn节点
    this.cdnList = BJY.data.server.getLiveServerList()
  },
  mounted () { },
  beforeDestroy () { }
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
.menu {
  width: 100%;
  background: #000;
  padding: 6px 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.6);

  .btn-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .icon {
      font-size: 24px;
      margin: 0 6px;
    }

    .cdn-node-list {
      background: #fff;
    }
  }
}
</style>
