<template>
  <div class="bjy-custom-interaction">
    <div class="tab-header">
      <span
        class="tab-message"
        :class="{'active': getCurrentTab('message')}"
        @click="setTab('message')"
      >聊天</span>
      <span
        class="tab-question"
        :class="{'active': getCurrentTab('question')}"
        @click="setTab('question')"
      >问答</span>
      <span v-if="!isPptAsMain"
        class="tab-board"
        :class="{'active': getCurrentTab('board')}"
        @click="setTab('board')"
      >白板</span>
    </div>
    <div class="tab-body" :class="{ 'can-switch': isPptAsMain }">
      <MessageList v-show="getCurrentTab('message')" />
      <QuestionAnswer v-show="getCurrentTab('question')" />
      <Player v-if="isPptAsMain"/>
      <WhiteBoard v-else v-show="getCurrentTab('board')" />
    </div>
  </div>
</template>

<script>
import MessageList from './MessageList'
import QuestionAnswer from './QuestionAnswer'
import WhiteBoard from './WhiteBoard'
import Player from '../Player'

// const eventEmitter = BJY.eventEmitter

export default {
  components: {
    MessageList,
    QuestionAnswer,
    WhiteBoard,
    Player
  },
  // ppt为主模版在布局上不一样，通过这个props来判断调整
  props: ['isPptAsMain'],
  data () {
    return {
      // 默认tab设置成白板，这样白板初始化的时候会自适应屏幕
      currentTab: this.isPptAsMain ? 'message' : 'board'
    }
  },
  computed: {},
  watch: {},
  methods: {
    getCurrentTab (tab) {
      return this.currentTab === tab
    },
    setTab (tab) {
      this.currentTab = tab
    }
  },
  created () { },
  mounted () {

  },
  beforeDestroy () { }
}
</script>

<style lang='scss'>
//@import url(); 引入公共css类
.bjy-custom-interaction {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .tab-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 36px;
    font-size: 16px;
    background: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    & > * {
      padding: 6px;
      flex-grow: 1;
      text-align: center;
      cursor: pointer;
      box-sizing: border-box;
      display: inline-block;
    }

    .active {
      border-bottom: 2px solid #1795ff;
      color: #1795ff;
    }
  }

  .tab-body {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    position: relative;
    overflow: hidden;

    &.can-switch {
      #h5-player, #whiteboard {
        position: absolute;
        right: 0 ;
        top: 40px;
        height: calc(50vw * 9 /16);
        width: 50%;
        font-size: 8px;
      }
    }
  }
}
</style>
