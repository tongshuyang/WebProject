<template>
  <div id="app">
    <Loading/>
    <div v-if="loaded" id="main" :class="{'doc-full': isDocFullscreen}" >
      <div :class="['video-wrap', isCssFull ? 'css-full' : '']">
        <WhiteBoard ref="whiteboard" :isPptAsMain="isPptAsMain" v-if="isPptAsMain"/>
        <Player v-else ref="player"/>
        <Barrage ref="barrage" />
        <button class="btn-full-switch" style="position: absolute" v-if="isCssFull" @click="exitFullScreen()">退出全屏</button>
      </div>
      <!-- 视频底部icon按钮菜单 -->
      <Menu :isPptAsMain="isPptAsMain" ref="menu" @buttonPress="handleBottomPress($event)"/>
      <!-- 聊天、问答、白板、公告等 -->
      <div class="media-panel">
        <div class="notice" :class="{'notice-show': showNotice}">
          <Notice v-bind="noticeProps"/>
        </div>
        <InteractionPanel :isPptAsMain="isPptAsMain" />
      </div>
      <!-- 弹出层，响应老师发起的测验，答题器等 -->
      <ModalPanel />
      <!-- 点名弹框 -->
      <div v-show="isRollCalling" class="roll-call">
        <p class="roll-call-tip">老师要求你在{{rollCallCountDown}}秒内响应点名</p>
        <span class="roll-call-btn" @click="answerRollCall()">答到</span>
      </div>
      <!-- 互动弹框（红包、抽奖） -->
      <div id="interaction-placeholder">
        <div class="redpacket">
          <RedPacket v-bind="redpacketProps" />
        </div>
        <LotteryHit />
      </div>

      <div id="attention-detection-container" style="display: none">
        
      </div>
    </div>
  </div>
</template>

<script>
import Loading from './components/Loading'
import Player from './components/Player'
import Barrage from './components/Barrage'
import Menu from './components/Menu'
import InteractionPanel from './components/InteractionPanel'
import WhiteBoard from './components/InteractionPanel/WhiteBoard'
import ModalPanel from './components/ModalPanel'
import LotteryHit from './components/LotteryHit'
import * as eventEmitterExt from './common/eventEmitter'

var store = BJY.store
var eventEmitter = BJY.eventEmitter
// 扩展事件
eventEmitter = Object.assign(eventEmitter, eventEmitterExt)

export default {
  name: 'App',
  components: {
    Loading,
    Player,
    Menu,
    Barrage,
    WhiteBoard,
    /**
     * 对于一些逻辑简单的组件，你可以不必为它们创建一个单独的.vue文件，
     * 你可以使用Yox.transformOptions把我们sdk里面的组件转化成vue组件，
     * 你要做的只是在main.js中使用我们自己定制的vue（Yox.vue），
     * 然后将create方法中的参数当成组件的props传入
     */
    Notice: Yox.transformOptions(BJY.Notice),
    InteractionPanel,
    ModalPanel,
    RedPacket: Yox.transformOptions(BJY.Interaction),
    LotteryHit
  },
  data () {
    var me = this
    return {
      loaded: false,
      // notice组件create方法需要接收这些参数
      noticeProps: {
        element: $('.media-panel .notice')[0], // 父容器
        replace: false,
        defaultContent: '这里空空如也...',
        // foldDefault: false // 是否默认折叠
        foldDefault: true, // 是否默认折叠 默认折叠状态下会自动滚动,
      },
      redpacketProps: {
        element: $('.interaction-placeholder .redpacket')[0], // 父容器
        needRedPacket: true,
        canGetRedPacket: true,
        canSendRedPacket: false,
        redPacketOptions: {
            skin: 'bjy',
            hasRankingList: true
        }
      },
      isCssFull: false,
      showNotice: false,
      // 是否是ppt为主模版，需要切换ppt和视频位置就将这里设置为true
      isPptAsMain: true,
      isRollCalling: false,
      // 点名倒计时
      rollCallCountDown: 10,
      rollCallTimer: null,
      isDocFullscreen: false,
      exitFullScreen: BJY.debounce(function () {
        me.isCssFull = false
      }, 200, true),
      namespace: '.demo' + Math.random()
    }
  },
  created () {
    console.log('******************************************************************************')
    console.log('*   欢迎使用 BJY JS SDK - 百家云直播 - ' + BJY.version)
    console.log('*   API 文档：https://www.baijiayun.com/js-sdk/doc/#/README')
    console.log('*   版本更新日志：https://www.baijiayun.com/js-sdk/doc/#/change-log')
    console.log('*   常见问题：https://www.baijiayun.com/js-sdk/doc/#/live?id=%e5%b8%b8%e8%a7%81%e9%97%ae%e9%a2%98')
    console.log('*   注意事项：H5 Demo 需要在真机上预览，PC上不支持m3u8流类型， 自己创建教室测试时，注意非webrtc类型教室传入webrtc: 0')
    console.log('*   sign签名规则：https://dev.baijiayun.com/wiki/detail/1')
    console.log('******************************************************************************')
    var options = {
      prefixName: 'tiansujing',
      env: 'production',
      room_id: '19112041735674',
      user_number: '0',
      user_avatar: '//img.baijiayun.com/0bjcloud/live/avatar/v2/teacher.png',
      user_name: '游客',
      user_role: 0,
      sign: '731f5299af5179f99a17746f7c1bd20e',
      webrtc: 0
    }

    // debug 模式支持输入传送门链接进入
    // 非webrtc大班课需要在url后拼上 &webrtc=0
    if (location.href.includes('debug=1')) {
      var url = prompt('输入传送门链接进入教室,webrtc课程请在链接后加上&webrtc=1')
      options = Object.assign(options, this.urlParser(url))
      console.log(options)
    }

    var classOption = {
      // 必须为字符串
      id: options.room_id
    }

    if (Number(options.webrtc)) {
      classOption.webrtcType = Number(options.webrtc)
    }

    BJY.init({
      env: options.env,
      privateDomainPrefix: options.prefixName,
      class: classOption,
      user: {
        number: options.user_number,
        avatar: decodeURIComponent(options.user_avatar),
        name: decodeURIComponent(options.user_name),
        type: Number(options.user_role)
      },
      teacher: {
        type: 1
      },
      sign: options.sign
    }).then(() => {
        var TEMPLATE_PPT_AS_MAIN = 1
        this.isPptAsMain = BJY.store.get('partner.mTemplate') === TEMPLATE_PPT_AS_MAIN
    })

    eventEmitter
      .on(
        eventEmitter.CLASSROOM_CONNECT_TRIGGER + this.namespace,
        function (event, data) {
          // 开始连接服务器，可以在这做一下创建组件之前的准备
        }
      )
      .on(
        eventEmitter.VIEW_RENDER_TRIGGER + this.namespace,
        (event, data) => {
          // 本事件触发表示直播服务已准备就绪，开始创建组件。该事件只会触发一次，会在BJY.init()之后很短时间内触发，注意监听时机
          this.loaded = true
          this.$nextTick(function () {
            BJY.AttentionDetection.create({
              element: $('#attention-detection-container'),
              replace: false,
              skin: 'light'
            });
          })
        }
      )
      // 监听 loading 结束加载事件
      .one(
        eventEmitter.LOADING_PANEL_END + this.namespace,
        (event, data) => {
          // loading 结束加载时要做的事情
          $('#main').css({
            top: 0,
            bottom: 0
          })
        }
      )
      .on(
        eventEmitter.LOGIN_CONFLICT + this.namespace,
        () => {
          alert('你已被踢，请确保user_number唯一')
        }
      )
      // 点名
      .on(
        eventEmitter.ROLL_CALL + this.namespace, // 老师发起了点名
        (e, data) => {
          this.rollCallCountDown = data.duration
          this.isRollCalling = true
          this.rollCallTimer = setInterval(() => {
            if (this.rollCallCountDown === 0) {
              clearInterval(this.rollCallTimer)
              this.isRollCalling = false
            }
            this.rollCallCountDown--
          }, 1000)
        }
      )
      // 公告改变
      .on(
        eventEmitter.NOTICE_CHANGE + this.namespace,
        (e, data) => {
          console.log(data)
          setTimeout(() => {
            this.checkNeedScroll()
          }, 500)
        }
      )
      // 首次进入拉取公告内容
      .on(
        eventEmitter.NOTICE_RES + this.namespace,
        (e, data) => {
          console.log(data)
        }
      )
      .on(
        eventEmitter.ATTENTION_DETECTION_ALERT + this.namespace,
        function (event, data) {
        if (data.content) {
          alert(data.content);
        }
      })
      .on(
        eventEmitter.DOCUMENT_FULLSCREEN_CHANGE + this.namespace,
        (event, data) => {
          this.isDocFullscreen = data.isFull
        }
      )
      .on(
        eventEmitter.WINDOW_RESIZE + this.namespace,
        () => {
          var isFull = document.fullscreen || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled
          if (!isFull && this.isCssFull) {
              this.isCssFull = false
          }
        }
      );

  },
  methods: {
    checkNeedScroll () {
      var wrapWidth = $('.bjy-content-container .bjy-content').width()
      var textWidth = $('.bjy-content-container .bjy-content').children().width()
      if (textWidth >= wrapWidth) {
        $('.media-panel .bjy-notice').addClass('need-scroll')
      } else {
        $('.media-panel .bjy-notice').removeClass('need-scroll')
      }
    },
    answerRollCall () {
      eventEmitter.trigger(eventEmitter.ROLL_CALL_RES)
      this.isRollCalling = false
      clearInterval(this.rollCallTimer)
    },
    // 支持解析输入的url进教室
    urlParser (url) {
      var params = {}
      if (url) {
        try {
          // 获取query
          var queryStr = url.split('?')[1]
          var paramList = queryStr.split('&')
          paramList.forEach(item => {
            var pair = item.split('=')
            params[pair[0]] = pair[1]
          })
          // 个性域名
          params.prefixName = url.split('.')[0].split('//')[1]
          // 区分环境
          params.env = this.getEnv(url)
        } catch (e) {
          console.log(e)
        }
      }
      return params
    },
    getEnv (url) {
      // 获取环境
      const hostName = url.match(/\/\/(.*)\./)[1]
      if (/test/.test(hostName) || /localhost/.test(hostName) || /\d{1,3}\.\d{1,3}\.\d{1,3}/.test(hostName)) {
        return 'test'
      }
      if (/beta/.test(hostName)) {
        return 'beta'
      }
      if (/www/.test(hostName)) {
        return ''
      }
      return ''
    },
    // 菜单按钮事件
    handleBottomPress (e) {
      switch (e) {
        case 'notice':
          this.noticeToggle()
          break

        case 'barrage':
          this.barrageToggle()
          break

        case 'refresh':
          this.refresh()
          break

        case 'fullscreen':
          this.fullScreen()
          break

        case 'swap':
          this.swapPptVideo()
          eventEmitter.trigger(eventEmitter.WINDOW_RESIZE)
      }
    },
    swapPptVideo () {
      var videoDom = document.getElementById('h5-player')
      var pptDom = document.getElementById('whiteboard')

      var videoParentNode = videoDom.parentNode
      var pptParentNode = pptDom.parentNode
      var videoPlaceholderNode = document.createElement('span')
      var pptPlaceholderNode = document.createElement('span')

      videoParentNode.insertBefore(videoPlaceholderNode, videoDom)
      pptParentNode.insertBefore(pptPlaceholderNode, pptDom)

      pptDom && videoParentNode.insertBefore(pptDom, videoPlaceholderNode)
      videoDom && pptParentNode.insertBefore(videoDom, pptPlaceholderNode)

      videoParentNode.removeChild(videoPlaceholderNode)
      pptParentNode.removeChild(pptPlaceholderNode)
    },
    noticeToggle () {
      this.showNotice = !this.showNotice
      this.checkNeedScroll()
    },
    barrageToggle () {
      this.$refs.barrage.toggle()
      const isBarrageOn = this.$refs.barrage.isBarrageOn()
      this.$refs.menu.toggleIcon(isBarrageOn)
    },
    refresh () {
      window.player && window.player.play()
    },
    fullScreen () {
      var fullDom = document.getElementsByClassName('video-wrap')[0].firstElementChild
      this.toFullVideo(fullDom)
    },
    toFullVideo (fullDom) {
      var isVideoInMain = $(fullDom).hasClass('bjy-player-h5-theme')
      if (isVideoInMain && (!store.get('presenter.videoOn') && !store.get('webrtcMixUser.videoOn'))) {
        this.$Toast('未发现视频~')
        return
      }

      if ($(fullDom).find('video').length) {
        fullDom = $(fullDom).find('video')[0]
      } 
      else if ((navigator.userAgent.indexOf('iPhone') !== -1) && $(fullDom).find('.bjy-whiteboard').length){
        this.handleCssFull(fullDom)
        return
      }
      if (fullDom.requestFullscreen) {
        return fullDom.requestFullscreen()
      } else if (fullDom.webkitRequestFullScreen) {
        return fullDom.webkitRequestFullScreen()
      } else if (fullDom.mozRequestFullScreen) {
        return fullDom.mozRequestFullScreen()
      } else if (fullDom.webkitEnterFullscreen) {
        return fullDom.webkitEnterFullscreen()
      } else {
        return fullDom.msRequestFullscreen()
      }
    },
    handleCssFull (fullDom) {
      this.isCssFull = true
    }
  },
  beforeDestroy() {
    // 如果直播间集成到单页面应用中，需要销毁直播间、解绑外层监听的事件、销毁通过 create 方式创建的组件（如 BJY.Whiteboard.create(...), 通过组件实例的 destroy 方法销毁）
    eventEmitter.off(this.namespace)
    BJY.dispose(BJY.config.BJY_DISPOSE_TYPE_OUT_ROOM)
  }
}
</script>

<style lang="scss">
@import "./assets/iconfont/iconfont.css";
#app {
  height: 100%;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  #main {
    position: absolute;
    left: 0;
    right: 0;
    top: -10000px;
    bottom: -2000px;
    &.doc-full {
      position: unset;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .video-wrap {
      width: 100%;
      min-height: 210px;
      position: relative;

      &.css-full {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 2;
        background: #fff;
      }

      #h5-player {
        height: 210px !important;
      }

      .bjy-player-container, .bjy-container {
        display: flex;
        align-items: center;
      }

      .bjy-barrage {
        z-index: 10;
      }
    }

    .btn-full-switch {
      position: absolute;
      top: 15px;
      left: 15px;
    }

    .media-panel {
      flex-grow: 1;
      width: 100%;
      position: relative;
      overflow: hidden;

      .notice {
        position: absolute;
        top: 0;
        width: 100%;
        padding: 0;
        height: 36px;
        box-sizing: border-box;
        background: #fff;
        transition: .3s left;
        left: 100%;
        z-index: 1;

        .bjy-notice {
          background: #fff;
          padding: 0 8px;
        }
      }

      .notice-show {
        left: 0;
      }

      .need-scroll {
        .bjy-content-container[data-fold="1"]{
            .bjy-text{
              animation: 10s wordsLoop linear infinite normal;
            }
            a {
              display: inline-block;
              animation: 10s wordsLoop linear infinite normal;
            }
          }
      }
    }

    .roll-call {
      position: absolute;
      top: 50%;
      background: #fff;
      border-radius: 5px;
      border: 1px solid #ddd;
      text-align: center;

      .roll-call-tip {
        border-bottom: 1px solid #ddd;
        padding: 0 20px;
        margin: 0;
        line-height: 36px;
      }

      .roll-call-btn {
        color: #1795ff;
        line-height: 36px;
      }
    }

    .bjy-interaction {
      .bjy-packet-fall-keyframe.bjy-hidden {
          display: block;
      }
      
      .bjy-interaction-red-packet {
        z-index: 3;

        .bjy-animation-canvas {
          touch-action: none;
        }

        .bjy-result-of-get {
          animation: redPacketResultScaleIn-h5 1s;
          transform: scale(0.7);
        }
        
        .bjy-ranking-list {
          transform: scale(0.7);

          .bjy-close {
            transform: scale(1.5);
          }

          .bjy-body .bjy-table .bjy-item:nth-child(2) td:nth-child(2) {
            width: 43%;
          }
        }
        .bjy-interlude {
          transform: scale(0.7) translateY(-140px);
        }
        .bjy-hit-animation {
          transform: scale(0.6) translate(-65%, -40%);
        }
      }
    }
  }
}

@keyframes redPacketResultScaleIn-h5 {
    from {
        transform: scale(0);
        opacity: 0;
    }
    to {
        transform: scale(0.7);
        opacity: 1;
    }
}

@keyframes wordsLoop {
    0% {
        transform: translateX(0px);
        -webkit-transform: translateX(0px);
    }
    20% {
        transform: translateX(0px);
        -webkit-transform: translateX(0px);
    }
    100% {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
    }
}
</style>
