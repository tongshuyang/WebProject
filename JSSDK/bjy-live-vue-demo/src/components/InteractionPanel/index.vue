<template>
    <div class="interaction">
        <div class="list-wrap">
          <div class="tab-title">
            <span @click="setTab('user')" id="btn-user-list" class="tab-list" :class="{'active':checkActive('user')}">
                用户列表
                <label id="user-count">(1)</label>
            </span>
            <span @click="setTab('message')" id="btn-message-list" class="tab-list" :class="{'active':checkActive('message')}">
                聊天列表
            </span>
            <span @click="setTab('action')" id="btn-action-list" class="tab-list" :class="{'active':checkActive('action')}">
                发言列表
            </span>
          </div>

          <div class="tab-container">
            <!-- 用户列表 -->
            <div class="user-list" :class="{'active':checkActive('user')}">
              <UserList/>
            </div>
            <!-- 聊天 -->
            <div class="message-list" :class="{'active':checkActive('message')}">
              <MessageList/>
            </div>
            <!-- 发言列表 -->
            <div class="action-list" :class="{'active':checkActive('action')}">
              <ActiveList/>
            </div>
            <!-- 问答 -->
            <div class="question-answer fold">
              <QuestionAnswer/>
            </div>
          </div>

        </div>
    </div>
</template>

<script>
import MessageList from './MessageList'
import UserList from './UserList'
import ActiveList from './ActiveList'
import QuestionAnswer from './QuestionAnswer'

export default {
  components: {
    MessageList,
    UserList,
    ActiveList,
    QuestionAnswer
  },
  data () {
    return {
      activeTab: 'user'
    }
  },
  computed: {},
  watch: {},
  methods: {
    setTab (tab) {
      this.activeTab = tab
    },
    checkActive (tab) {
      return tab === this.activeTab
    }
  },
  created () {
    // 这里监听一下举手被接收，切换到发言列表tab
    BJY.eventEmitter.on(
      BJY.eventEmitter.SPEAK_APPLY_RESULT_ACCEPT,
      (e, data) => {
        this.activeTab = 'action'
      }
    )
  },
  mounted () {},
  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
.interaction {
  position: absolute;
  top: 208px;
  left: 12px;
  right: 12px;
  bottom: 0;
  font-size: 13px;

  .list-wrap {
    width: 100%;
    height: 100%;

    .tab-title {
      width: 100%;
      border-bottom: 1px solid #ddd;
      .tab-list {
        width: 33.33%;
        padding: 8px 0;
        display: inline-block;
        text-align: center;
        cursor: pointer;
        position: relative;
      }
      .active {
        border-bottom: 2px solid #6db6f4;
      }

      .has-new {
        &:after {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 2px;
          background: red;
          position: absolute;
          top: 5px;
          right: 8px;
        }
      }
    }

    .tab-container {
      position: absolute;
      top: 37px;
      bottom: 0;
      left: 0;
      right: 0;

      .user-list, .message-list, .action-list {
        position: absolute;
        top: 0;
        bottom: 36px;
        right: 0;
        left: 0;
        opacity: 0;
      }

      .active {
        left: 0;
        opacity: 1;
        z-index: 1;
      }

      .question-answer {
        position: absolute;
        bottom: 0;
        top: 0;
        width: 290px;
        left: -12px;
        background: #fff;
        transition: .3s all;
        z-index: 1;
      }

      .fold {
        top: unset;
        height: 36px;
      }
    }
  }
}
</style>
