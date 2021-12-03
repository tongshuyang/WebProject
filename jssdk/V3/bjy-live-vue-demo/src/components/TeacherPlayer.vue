<template>
  <div id="live-teacher-player">
    <div class="live-teacher-player-placeholder"></div>
  </div>
</template>

<script>
const store = BJY.store;
const auth = BJY.auth;
const eventEmitter = BJY.eventEmitter;
const userData = BJY.data.user;
const config = BJY.config;

export default {
  components: {},
  data() {
    return {
      player: null,
    };
  },
  methods: {
    //创建老师播放器
    createTeacherPlayer(isWebRTCMix) {
      if (isWebRTCMix === undefined) {
        isWebRTCMix = auth.isWebRTC();
      }
      isWebRTCMix && (store.get('webrtcMixUser').name = '老师');
      this.player && this.player.destroy();
      this.player = null;
      const user = auth.isPresenter()
        ? store.get("presenter")
        : isWebRTCMix
        ? store.get("webrtcMixUser")
        : store.get("presenter") || store.get("teacher");
      const options = {
        element: $(".live-teacher-player-placeholder"),
        replace: false,
        user: user,
        extension: BJY.getExtension(),
        canSwitchCamera: auth.isSelf(store.get("teacher.id")),
        canSwitchMic: auth.isSelf(store.get("teacher.id")),
        footerOptions: {
          onToggleClick: this.pptVideoSwitch,
        },
      };
      !auth.isTeacher() && (options.isWebRTCMix = isWebRTCMix);
      this.player = BJY.DefaultThemePlayer.create(options);
    },

    swap(presenterCameraNode, whiteboardNode) {
      var presenterCameraParentNode = presenterCameraNode.parentNode;
      var whiteboardParentNode = whiteboardNode.parentNode;
      var presenterCameraPlaceholder = document.createElement("div");
      var whiteboardPlaceholder = document.createElement("div");

      presenterCameraParentNode.insertBefore(
        presenterCameraPlaceholder,
        presenterCameraNode
      );
      whiteboardParentNode.insertBefore(whiteboardPlaceholder, whiteboardNode);

      whiteboardNode &&
        presenterCameraParentNode.insertBefore(
          whiteboardNode,
          presenterCameraPlaceholder
        );
      presenterCameraNode &&
        whiteboardParentNode.insertBefore(presenterCameraNode, whiteboardPlaceholder);

      presenterCameraParentNode.removeChild(presenterCameraPlaceholder);
      whiteboardParentNode.removeChild(whiteboardPlaceholder);
    },

    // 切换ppt与主讲视频位置，如需同步切换，可通过自定义信令实现
    pptVideoSwitch() {
      const presenterDom = $(".live-teacher-player-placeholder")[0];
      const whiteboardDom = $(".bjy-whiteboard")[0];
      this.swap(presenterDom, whiteboardDom);
      eventEmitter.trigger(eventEmitter.WINDOW_RESIZE);
    },
  },
  created() {
    var playerInstance = this.player
    eventEmitter
      .on(eventEmitter.CLASS_START, (event, data) => {
        this.createTeacherPlayer();
        // 设置一下发言权限
        if (auth.isTeacher() || auth.isAssistant()) {
          store.set("class.speakState", config.SPEAK_STATE_FREE);
        }
        // 上课后老师自动开启音视频
        if (auth.isTeacher()) {
          eventEmitter.trigger(eventEmitter.MEDIA_SWITCH_TRIGGER, {
            audioOn: true,
            videoOn: true,
          });
        }
      })
      .on(eventEmitter.MEDIA_SWITCH_TRIGGER, function (event, data) {
        var player = BJY.Player.instances[store.get("user.id")];
        player && BJY.userPublish.setDevice(player, data.videoOn, data.audioOn);
      })
      .on(
        // 老师打开媒体事件
        eventEmitter.TEACHER_MEDIA_ON,
        () => {
          // 判断播放器是否存在
          if (!this.player) {
            this.createTeacherPlayer();
          }
        }
      )
      .on(
        eventEmitter.MEDIA_STATUS_CHANGE,
        (e, data) => {
          console.log(data)
          if (data.videoOn) {
            !auth.isPresenter() && this.createTeacherPlayer(false)
          } else {
            !auth.isPresenter() && this.createTeacherPlayer(true)
          }
        }
      )
      .on(
        // 主播关闭媒体事件
        eventEmitter.TEACHER_MEDIA_OFF,
        () => {
        }
      )
      .on(
        eventEmitter.CLASSROOM_CONNECT_SUCCESS,
        () => {
          this.createTeacherPlayer();
        }
      )
    // 监听主讲人切换
    !auth.isTeacher() &&
      store.watch("presenterId", (newPresenterId, oldPresenterId) => {
        var newPresenter = userData.find(newPresenterId);
        var oldPresenter = userData.find(oldPresenterId);
        // 先处理发言列表
        eventEmitter.ACTIVE_LIST_PRESENTER_CHANGE_TRIGGER =
          "active_list_presenter_change_trigger";
        eventEmitter.trigger(eventEmitter.ACTIVE_LIST_PRESENTER_CHANGE_TRIGGER, {
          newPresenter: newPresenter,
          oldPresenter: oldPresenter,
        });
        // 主讲播放器销毁重建，
        if (newPresenter) {
          if (this.player) {
            this.createTeacherPlayer();
          }
        }
      });

    const doc = document.documentElement
    // 全屏 esc 退出的问题
    if (doc.requestFullscreen) {
        document.addEventListener(
            'fullscreenchange',
            function () {
                var isFullscreen = playerInstance && playerInstance.isFullScreen

                if (document.fullscreen != isFullscreen && !document.fullscreen) {
                    eventEmitter.trigger(
                        eventEmitter.FULLSCREEN_EXIT_TRIGGER
                    );
                }
            }
        );
    }
    else if (doc.webkitRequestFullScreen) {
        document.addEventListener(
            'webkitfullscreenchange',
            function () {
                var isFullscreen = playerInstance && playerInstance.isFullScreen

                if (document.webkitIsFullScreen != isFullscreen && !document.webkitIsFullScreen) {
                    eventEmitter.trigger(
                        eventEmitter.FULLSCREEN_EXIT_TRIGGER
                    );
                }
            }
        );
    }
    else if (doc.mozRequestFullScreen) {
        document.addEventListener(
            'mozfullscreenchange',
            function () {
                var isFullscreen = playerInstance && playerInstance.isFullScreen

                if (document.mozFullScreen != isFullscreen && !document.mozFullScreen) {
                    eventEmitter.trigger(
                        eventEmitter.FULLSCREEN_EXIT_TRIGGER
                    );
                }
            }
        );
    }
  },
};
</script>

<style lang="scss">
.live-teacher-player-placeholder,
#live-teacher-player {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
