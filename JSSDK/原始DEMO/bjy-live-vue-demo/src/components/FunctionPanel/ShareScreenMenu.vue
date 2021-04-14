<template>
    <div v-show="canShareScreen" id="menu-share-screen">
      <i class="icon icon-share"></i>
      <span class="bjy-screen-share"></span>
    </div>
</template>

<script>
import language from '../../language/main'

let auth = BJY.auth
let store = BJY.store
let eventEmitter = BJY.eventEmitter
let config = BJY.config

auth.isClassStarted = function () {
  return store.get('class.started')
}

auth.canShareScreen = function () {
  return store.get('class.mediaType') !== config.MEDIA_TYPE_AUDIO &&
            (auth.inClient() || auth.isWebRTC())
}

auth.inClient = function () {
  return typeof window.cefQuery !== 'undefined'
}

auth.canSpeak = function () {
  return store.get('class.speakState') !== config.SPEAK_STATE_LIMIT
}

/**
 * 是否可以程序分享
 *
 * @return {boolean}
 */
auth.canProgramShareDesktop = function () {
  return auth.inClient() && store.get('cefVersion') >= '6.3.0'
}

export default {
  components: {},
  data () {
    return {
      canSpeak: false,
      canShareScreen: auth.canShareScreen()
    }
  },
  computed: {},
  watch: {},
  methods: {
    checkCondition () {
      if (!auth.isClassStarted() || !auth.canShareScreen()) {
        this.$Toast(language.TIP_CLASS_NOT_START)
        return false
      }

      if (!auth.canSpeak()) {
        this.$Toast(language.TIP_SPEAK_LIMIT)
        return false
      }

      return true
    }
  },
  created () {
    BJY.eventEmitter.on(
      BJY.eventEmitter.SPEAK_APPLY_RESULT_ACCEPT,
      () => {
        this.canSpeak = true
      }
    )
      .on(eventEmitter.STOP_SPEAK_TRIGGER, () => {
        this.canSpeak = false
      })
  },
  mounted () {
    let element = $('.bjy-screen-share')
    // 只有webrtc课程类型支持网页屏幕分享
    element.text(language.BUTTON_SCREEN_START)
    if (auth.isWebRTC()) {
      var isScreenSharing = false

      eventEmitter.on(
        eventEmitter.ASSIST_MEDIA_PUBLISH,
        (event, data) => {
          if (BJY.is.mediaMainScreenShare(data.mediaId)) {
            if (data.videoOn) {
              isScreenSharing = true
              element.text(language.BUTTON_SCREEN_STOP)
            } else {
              isScreenSharing = false
              element.text(language.BUTTON_SCREEN_START)
            }
          }
        }
      )

      element.click(() => {
        if (isScreenSharing) {
          eventEmitter.trigger(
            eventEmitter.SCREEN_SHARE_STOP_TRIGGER
          )
        } else {
          if (!this.canSpeak) {
            this.$Toast('请先举手')
            return
          }
          this.checkCondition() && BJY.ScreenShareExtensionWebrtc.start((data) => {
            this.$Toast(data.msg)
          })
        }
      })
    }
  },
  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>
