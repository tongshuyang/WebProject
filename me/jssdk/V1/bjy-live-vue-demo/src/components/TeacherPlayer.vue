<template>
    <div id="live-teacher-player"></div>
</template>

<script>
let store = BJY.store
let auth = BJY.auth
let eventEmitter = BJY.eventEmitter
let userData = BJY.data.user
export default {
  components: {},
  data () {
    return {
      player: null
    }
  },
  computed: {},
  watch: {
  },
  methods: {
    //   创建老师播放器
    createTeacherPlayer () {
      this.player = BJY.DefaultThemePlayer.create({
        element: $('#live-teacher-player'),
        replace: false,
        user: auth.isWebRTC() ? (store.get('webrtcMixUser')) : store.get('presenter') || store.get('teacher'),
        extension: BJY.getExtension(),
        canSwitchCamera: auth.isSelf(store.get('teacher.id')),
        canSwitchMic: auth.isSelf(store.get('teacher.id')),
        isWebRTCMix: auth.isWebRTC()
      })
    }
  },
  created () {
  },
  mounted () {
    eventEmitter.on(
      // 老师打开了媒体
      eventEmitter.TEACHER_MEDIA_ON,
      () => {
        if (this.player) {
          this.player.destroy()
        }
        this.createTeacherPlayer()
      }
    )
    this.createTeacherPlayer()
    // 监听主讲人切换
    store.watch('presenterId', (newPresenterId, oldPresenterId) => {
      var newPresenter = userData.find(newPresenterId)
      var oldPresenter = userData.find(oldPresenterId)
      // 先处理发言列表
      eventEmitter.ACTIVE_LIST_PRESENTER_CHANGE_TRIGGER = 'active_list_presenter_change_trigger'
      eventEmitter.trigger(
        eventEmitter.ACTIVE_LIST_PRESENTER_CHANGE_TRIGGER,
        {
          newPresenter: newPresenter,
          oldPresenter: oldPresenter
        }
      )

      // 主讲播放器销毁重建，
      if (newPresenter) {
        if (this.player) {
          this.player.destroy()
          this.player = null
          this.createTeacherPlayer()
        }
      }
    })
  },
  beforeDestroy () {}
}
</script>

<style lang='scss'>
#live-teacher-player {
  width: 100%;
  height: 100%;
}
</style>
