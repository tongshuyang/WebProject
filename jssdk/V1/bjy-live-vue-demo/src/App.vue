<template>
  <div id="app">
    <Loading />
    <div v-if="loaded" ref="main" id="main">
      <HorseLamp />
      <div class="class-panel">
        <WhiteBorad />
      </div>

      <div class="media-panel">
        <!-- 老师播放器 -->
        <div class="live-teacher-player">
          <TeacherPlayer />
        </div>

        <div class="interaction-panel">
          <InteractionPanel />
        </div>
      </div>

      <div class="footer">
        <SettingPanel />
        <FunctionPanel />
      </div>

      <!-- 模态框组件 -->
      <ModalPanel />
    </div>
  </div>
</template>

<script>
// loading组件，进教室之前的准备工作
import Loading from './components/Loading.vue'
// 白板组件
import WhiteBorad from './components/WhiteBoard.vue'
// 设置面板：扬声器、麦克风、摄像头、设置
import SettingPanel from './components/SettingPanel'
// 交互面板：用户列表、聊天、发言列表
import InteractionPanel from './components/InteractionPanel'
// 老师播放器
import TeacherPlayer from './components/TeacherPlayer'
// 功能面板：直播间的一些功能，举手、屏幕共享、弹幕之类
import FunctionPanel from './components/FunctionPanel'
// 模态框组件，在老师端发起互动后显示
import ModalPanel from './components/ModalPanel'
// 跑马灯组件
import HorseLamp from './components/HorseLamp'
// 话术
import language from './language/main.js'

export default {
  name: 'app',
  components: {
    Loading,
    WhiteBorad,
    SettingPanel,
    InteractionPanel,
    TeacherPlayer,
    FunctionPanel,
    HorseLamp,
    ModalPanel
  },
  data () {
    return {
      loaded: false,
      webrtc: 1
    }
  },
  mounted () {
    /**
     * flash的奇怪特性（普通大班课使用了flash）；
     * 需要在页面中插入一个大尺寸的flash才会自动播放，否则将会导致无法上麦和视频无法自动播放的问题
     */
    var url = '//live-cdn.baijiayun.com/js-sdk/1.15.0/player/extension/flash.swf'
    var html = BJY.createSWF('temp', '', url)

    var swf = $(html)
    $('body').prepend(swf)
    swf.css({
      position: 'absolute',
      top: 0,
      width: 398,
      height: 298,
      opacity: 0
    })
    // 判断是否支持flash
    if (!this.supportFlash() && !this.webrtc) {
      this.$Dialog.show({
        title: '提示',
        content: `网页Flash插件加载不成功，请重新<a class="opt-button"
            href="http://www.adobe.com/go/getflashplayer">启用flash</a>`,
        confirmText: '关闭'
      }).then(() => {
        console.log('flash启用')
      }).catch(e => {
        console.log(e)
      })
    }
    // webrtc 添加页面交互
    if (this.webrtc) {
      this.$Dialog.show({
        title: '提示',
        content: `正在进入教室。。。`,
        confirmText: '确认'
      }).then(() => {
        console.log('教室内首次交互完成')
      }).catch(e => {
        console.log(e)
      })
    }
  },
  created () {
    // 绑定事件
    let eventEmitter = BJY.eventEmitter
    let auth = BJY.auth
    let $body = $('body')

    eventEmitter
      .one(
        eventEmitter.CLASSROOM_CONNECT_TRIGGER,
        (event, data) => {
          // 初始化扩展
          var extension = BJY.getExtension()
          // 如果您使用的是webrtc拓展的话，请确保引入了realtimecat.js这个依赖，否则此处会报undefined：RTCat
          extension.init().then(() => {
            eventEmitter.trigger(
              eventEmitter.CLASSROOM_CONNECT_TRIGGER,
              data
            )
          })
          return false
        }
      )
      .on(
        eventEmitter.CLASSROOM_CONNECT_FAIL,
        () => {
          alert(language.ROOM_SERVER_CONNECT_FAIL)
        }
      )
      .on(
        eventEmitter.LOGIN_CONFLICT,
        () => {
          alert(language.LOGIN_CONFLICT)
        }
      )
      // 监听初始化事件，初始化组件
      // 请将所有的组件创建逻辑写于此回调函数之中
      .one(
        eventEmitter.VIEW_RENDER_TRIGGER,
        () => {
          // 注意，在VIEW_RENDER_TRIGGER事件触发后再去加载教室里面的组件
          this.loaded = true

          eventEmitter.trigger(
            eventEmitter.DOC_ALL_REQ
          )

          if (auth.isStudent()) {
            $body.addClass('student')
          }

          // 初始化webRTC的屏幕扩展
          // 如果你需要使用到webrtc屏幕共享的话，记得在index.html里面引入对应的js依赖
          if (auth.isWebRTC()) {
            BJY.ScreenShareExtensionWebrtc.init()
          }
        }
      )
      .one(eventEmitter.LOADING_PANEL_END, () => {
        // 进度条加载完成再显示ui
        $('#main').css('opacity', 1)
      })
      .on(
        eventEmitter.CLASS_START,
        () => {
          // 上课后老师自动开启音视频
          if (auth.isTeacher()) {
            eventEmitter.trigger(
              eventEmitter.MEDIA_SWITCH_TRIGGER,
              {
                audioOn: true,
                videoOn: true
              }
            )
          }
        }
      )
      .on(
        eventEmitter.CLASS_END,
        () => {
          // 下课后所有人自动关闭音视频
          eventEmitter.trigger(
            eventEmitter.MEDIA_SWITCH_TRIGGER,
            {
              audioOn: false,
              videoOn: false
            }
          )
        }
      )
      .on(
        eventEmitter.CLASSROOM_CONNECT_SUCCESS,
        (event, data) => {
          // data.reconnect 是否为断线重连
        }
      )

    // 初始化教室
    this.init()
  },
  methods: {
    init () {
      console.log('******************************************************************************')
      console.log('*   欢迎使用 BJY JS SDK - 百家云直播 - ' + BJY.version)
      console.log('*   API 文档：https://www.baijiayun.com/js-sdk/doc/#/README')
      console.log('*   版本更新日志：https://www.baijiayun.com/js-sdk/doc/#/change-log')
      console.log('*   常见问题：https://www.baijiayun.com/js-sdk/doc/#/live?id=%e5%b8%b8%e8%a7%81%e9%97%ae%e9%a2%98')
      console.log('*   注意事项：自己创建教室测试时，注意非webrtc类型教室传入webrtc: 0')
      console.log('*   sign签名规则：https://dev.baijiayun.com/wiki/detail/1')
      console.log('******************************************************************************')
      // 默认demo教室
      var options = {
        prefixName: 'e70655665',
        env: 'production',
        room_id: '20121042083339',
        user_number: '187',
        user_avatar: 'https://img.baijiayun.com/0bjcloud/live/avatar/v2/103.jpg',
        user_name: 'student',
        user_role: 0,
        sign: '6ba34a2e6a08e4baeb4e957b4fcec31d',
        webrtc: 1
      }

      // debug 模式支持输入传送门链接进入
      // 非webrtc大班课需要在url后拼上 &webrtc=0
      if (location.href.includes('debug=1')) {
        var url = prompt('输入教室链接进入教室')
        options = Object.assign(options, this.urlParser(url))
        console.log(options)
      }

      var classOption = {
        // 必须为字符串
        id: options.room_id,
        // 学生默认限制发言
        speakState: BJY.config.SPEAK_STATE_LIMIT
      }
      if (Number(options.webrtc)) {
        classOption.webrtcType = Number(options.webrtc)
      }
      this.webrtc = classOption.webrtcType

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
      })
    },
    // 支持解析输入的url进教室
    urlParser (url) {
      var params = {}
      if (url) {
        try {
          var queryStr = url.split('?')[1]
          var paramList = queryStr.split('&')
          paramList.forEach(item => {
            var pair = item.split('=')
            params[pair[0]] = pair[1]
          })
          // 区分环境
          params.env = this.getEnv(url)
          // 个性域名
          params.prefixName = url.split('.')[0].split('//')[1]
        } catch (e) {
          alert('url格式错误，已进入默认教室')
        }
      }
      return params
    },
    getEnv (url) {
      // 获取环境
      let hostName = url.match(/\/\/(.*)\./)[1]
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
    supportFlash () {
      var swf
      var plugins = navigator.plugins

      if (plugins && plugins.length > 0) {
        swf = plugins['Shockwave Flash']
      } else if (document.all) {
        // eslint-disable-next-line no-undef
        swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
      }
      return !!swf
    }

  }
}
</script>

<style lang="scss">
@import "./assets/iconfont/iconfont.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;

  #main {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;

    .class-panel {
      position: absolute;
      top: 0;
      left: 0;
      right: 290px;
      bottom: 40px;
      background-image: url("./assets/img/class-panel-bg.jpg");
    }

    .media-panel {
      position: absolute;
      width: 290px;
      top: 0;
      right: 0;
      bottom: 40px;
      padding: 8px 12px;
      box-sizing: border-box;
      background: #fff;
      box-shadow: -2px 0 6px rgba(0, 0, 0, 0.1);

      .live-teacher-player {
        background: #000;
        height: 200px;
        width: 100%;
      }
    }

    .footer {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 40px;
      background-color: #424242;
      display: flex;
      justify-content: space-between;
      padding: 0 15px;
      align-items: center;
      font-size: 15px;
      color: #bdc6cf;
    }
  }
}
</style>
