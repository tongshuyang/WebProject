<!-- 举手组件 -->
<template>
    <div id="menu-speak-apply">
    </div>
</template>

<script>

import language from '../../language/main'

const store = BJY.store
const eventEmitter = BJY.eventEmitter
const auth = BJY.auth;
const userData = BJY.data.user;

/**是否自动上麦 */
auth.canOpenCameraWhenSpeaking = function (userType) {
    return true;
};

export default {
  components: {},
  data () {
    return {
      player: null
    }
  },
  computed: {},
  watch: {},
  methods: {

  },
  created () {
  },
  mounted () {
    // 绑定一个结束发言事件
    eventEmitter.STOP_SPEAK_TRIGGER = 'stop_speak_trigger'
    eventEmitter
      .on(
        eventEmitter.SPEAK_APPLY_RESULT_TIMEOUT,
        (e, data) => {
          console.log('timeout')
          this.$Toast(language.TIP_SPEAK_APPLY_TIMEOUT)
        }
      )
      .on(
        eventEmitter.SPEAK_APPLY_RESULT_REJECT,
        (e, data) => {
          console.log('reject')
          this.$Toast(language.TIP_SPEAK_APPLY_REJECT)
        }
      )
      .on(
        eventEmitter.SPEAK_APPLY_RESULT_ACCEPT,
        (e, data) => {
          console.log('accept')
          this.$Toast(language.TIP_SPEAK_APPLY_ACCEPT)
          eventEmitter.trigger(eventEmitter.MEDIA_SWITCH_TRIGGER, {
            videoOn: true,
            audioOn: true
          })
        }
      )

    BJY.SpeakApplyMenu.create({
      element: $('#menu-speak-apply'),
      replace: false,
      // 举手按钮被点击
      onApplyClick: () => {
        if (store.get('class.started')) {
          if (userData.active().length >= 2) {
            this.$Toast('当前上台人数已满')
            return;
          }
          BJY.userSpeak.startApply(10 * 1000)
        } else {
          this.$Toast(language.TIP_CLASS_NOT_START)
          return
        }
      },
      // 取消举手被点击
      onCancelClick: () => {
        BJY.userSpeak.cancelApply()
      },
      // 结束发言被点击
      onStopClick: () => {
        BJY.userSpeak.stopSpeak(BJY.store.get('user.id'))
        eventEmitter.trigger(eventEmitter.STOP_SPEAK_TRIGGER)
        eventEmitter.trigger(eventEmitter.MEDIA_SWITCH_TRIGGER, {
          videoOn: false,
          audioOn: false
        })
      }
    })
  },
  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>
