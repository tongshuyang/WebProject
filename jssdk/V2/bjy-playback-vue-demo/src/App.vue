<template>
  <div id="app">
    <Loading @loaded="loadFinished()"/>
    <div v-if="loaded" id="main">
      <!-- 白板区域 -->
      <div class="left-panel">
        <Barrage ref="barrage"/>
        <WhiteBoard />
      </div>

      <!-- 右侧交互区域 -->
      <div class="right-panel">
        <!-- 播放器 -->
        <div class="player-panel">
          <Player ref="player" @getDuration="mountSlider = true" :videoInfo="videoInfo"/>
        </div>
        <!-- 聊天列表、用户列表、发言列表、公告、问答等 -->
        <div class="interaction-panel">
          <div class="tab-title">
            <span @click="setTab('user')" class="title" :class="{'active': checkActiveTab('user')}">用户列表</span>
            <span @click="setTab('message')" class="title" :class="{'active': checkActiveTab('message')}">聊天</span>
            <span @click="setTab('action')" class="title" :class="{'active': checkActiveTab('action')}">发言列表</span>
          </div>
          <div class="tab-body">
            <Notice />

            <div class="tab-item" v-show="activeTab === 'user'">
              <UserList />
            </div>
            <div class="tab-item"  v-show="activeTab === 'message'">
              <MessageList />
            </div>
            <div class="tab-item" v-show="activeTab === 'action'">
              <ActiveList />
            </div>

            <QuestionAnswer />
          </div>
        </div>
      </div>

      <!-- 回放控制条 -->
      <div class="footer-panel">
        <span class="volume-control">
          <!-- 音量控制 -->
          <i @click="toggleVolumeSlider()" class="icon icon-volume"></i>
          <div v-show="showVolumeSlider">
            <VolumeSlider />
          </div>
        </span>
        <!-- 播放暂停 -->
        <i @click="togglePlay()" class="icon" :class="isPlaying ? 'icon-play' : 'icon-pause'"></i>
        <!-- 控制条 -->
        <PlayerSlider v-if="mountSlider" />
        <!-- 弹幕 -->
        <i @click="toggleBarrage()" class="icon" :class="barrageOn ? 'icon-barrage-on' : 'icon-barrage-off'"></i>
        <!-- 倍速 -->
        <select v-model="currentSpeed" name="speed" id="speed-control" title="速度">
          <option value="0.5">0.5X</option>
          <option value="1">1.0X</option>
          <option value="1.5">1.5X</option>
          <option value="2">2.0X</option>
        </select>
        <!-- 清晰度 -->
        <select v-model="currentQuality" name="quality" id="quality-control" title="清晰度">
          <option v-for="(item, index) in qualityList" :key="index" :value="item.type">{{item.name}}</option>
        </select>
      </div>

      <!-- 模态框组件 -->
      <ModalPanel />
    </div>
  </div>
</template>

<script>
import Loading from './components/Loading'
import WhiteBoard from './components/WhiteBoard'
import Player from './components/Player'
import UserList from './components/UserList'
import MessageList from './components/MessageList'
import Notice from './components/Notice'
import QuestionAnswer from './components/QuestionAnswer'
import PlayerSlider from './components/PlayerSlider'
import VolumeSlider from './components/VolumeSlider'
import ModalPanel from './components/ModalPanel'
import ActiveList from './components/ActiveList'
import Barrage from './components/Barrage'

export default {
  name: 'App',
  components: {
    Loading,
    WhiteBoard,
    Player,
    PlayerSlider,
    UserList,
    MessageList,
    Notice,
    QuestionAnswer,
    VolumeSlider,
    ModalPanel,
    ActiveList,
    Barrage
  },
  data () {
    return {
      loaded: false,
      activeTab: 'message',
      // 视频资源，作为props传给Player组件
      videoInfo: null,
      showVolumeSlider: false,
      isPlaying: false,
      qualityList: [],
      currentQuality: '',
      currentSpeed: 1,
      mountSlider: false,
      barrageOn: false
    }
  },
  created () {
        var options = {
            token:
                "xGFWM6WCDJphp9iW7Rdvm-BZx8OQHhIY0m5dneqS510V7AQ6UXxNmsl6ZZVM6JkuySWadQyVBe0Kp0fXMnVKLQ",
            classId: "21033077680543",
            sessionId: "202103310",
            prefixName: 'e70655665'
        }

    // 给一个调试入口，从url的query读取: url里面包含debug=1的话可以使用url进入
    if (location.href.includes('debug=1')) {
      // <!-- 这里给一个测试入口：输入回放的url即可测试对应的回放 -->
      var url = prompt('输入回放url以测试')
      // 有回放链接用回放链接，没有回放链接用我们的测试用例
      try {
        if (url) {
          var params = this.getQuery(url)
          options.token = params.token
          options.classId = params.classid
          options.sessionId = Number(params.session_id) || 0
          options.prefixName = params.prefixName
        }
        console.log(options)
      } catch (error) {
        alert('您输入的链接不存在或格式有误！')
      }
    }

    BJY.playback
      .init({
        env: 'production',
        privateDomainPrefix: options.prefixName,
        token: options.token,
        class: {
          id: options.classId,
          sessionId: options.sessionId
        },
        useEncrypt: true,
        user: {
          number: '13147056',
          avatar:
            'http://static.sunlands.com/newUserImagePath/13147056/40_40/13147056.jpg',
          name: '666',
          type: 0
        }
      })
      .then((data) => {
        console.log(data)
        this.videoInfo = data
        this.qualityList = data.definition
        this.currentQuality = data.defaultDefinition
      })

    var eventEmitter = BJY.eventEmitter
    eventEmitter.on(
        eventEmitter.PLAYBACK_SIGNAL_FETCH_END,
        () => {
          console.log('start render')
          this.loaded = true
        }
    );
  },
  mounted () {
    BJY.store.watch('isPlaying', (isPlaying) => {
      this.isPlaying = isPlaying
    })
  },
  methods: {
    loadFinished () {
      $('#main').css('opacity', 1)
    },
    checkActiveTab (tab) {
      return this.activeTab === tab
    },
    setTab (tab) {
      this.activeTab = tab
    },
    toggleVolumeSlider () {
      this.showVolumeSlider = !this.showVolumeSlider
    },
    toggleBarrage () {
      this.$refs.barrage.toggleBarrage()
      this.barrageOn = !this.barrageOn
    },
    togglePlay () {
      this.$refs.player.togglePlay()
    },
    getQuery (url) {
      var query = url.split('?')[1]
      // 获取自定义域名
      var prefixName = url.split('.')[0].split('//')[1]

      var list = query.split('&')
      var params = {
        prefixName: prefixName
      }
      list.forEach(item => {
        var pair = item.split('=')
        params[pair[0]] = pair[1]
      })
      return params
    }
  },
  watch: {
    currentQuality (newValue, oldValue) {
      console.log('清晰度切换为：' + newValue)
      if (this.$refs.player) {
        this.$refs.player.loadVideo(newValue)
      }
    },
    currentSpeed (newValue, oldValue) {
      console.log('播放速度切换为：' + newValue)
      if (BJY.store.get('teacherVideo')) {
        BJY.store.set('teacherVideo.playbackRate', newValue || 1)
      }
    }
  }
}
</script>

<style lang="scss">
@import './assets/iconfont/iconfont.css';
* {
  padding: 0;
  margin: 0;
}
html, body{
  width: 100%;
  height: 100%;

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    widows: 100%;

    #main {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      opacity: 0;

      .left-panel {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 40px;
        right: 280px;
        background-image: url("./assets/img/class-panel-bg.jpg");
      }

      .right-panel {
        position: absolute;
        top: 0;
        width: 280px;
        right: 0;
        bottom: 40px;
        box-shadow: 5px 5px 5px 5px #789;

        .player-panel {
          height: 210px;
          width: 100%;
          background: #000;
        }

        .interaction-panel {
          position: absolute;
          top: 210px;
          width: 100%;
          bottom: 0;

          .tab-title {
            height: 32px;
            line-height: 32px;
            width: 100%;
            display: flex;
            justify-content: space-around;

            .title {
              cursor: pointer;
              width: 33.33%;
              font-size: 13px;
              text-align: center;
              line-height: 30px;
            }

            .active {
              border-bottom: 2px solid #55a3ff;
            }
          }

          .tab-body {
            position: absolute;
            top: 66px;
            width: 100%;
            bottom: 36px;
            box-sizing: border-box;

            .tab-item {
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .footer-panel {
        height: 40px;
        padding: 0 20px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: #313339;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .icon {
          color: #fff;
          font-size: 24px;
          font-weight: 600;
          cursor: pointer;
          margin: 0 6px;
        }

        .volume-control {
          display: inline-block;
          position: relative;
          .icon-volume {
            font-size: 20px;
          }
          .bjy-volume-slider {
            position: absolute;
            bottom: 100%;
          }
        }

        #speed-control {
          margin: 0 10px;
        }
      }
    }
  }
}
</style>
