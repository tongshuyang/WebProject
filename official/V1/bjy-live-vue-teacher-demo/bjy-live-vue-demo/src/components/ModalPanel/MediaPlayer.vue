<!-- 小测组件 -->
<template>

  <div v-show="visible" id="media-player" >
    
  </div>
</template>

<script>
const eventEmitter = BJY.eventEmitter;
const auth = BJY.auth;

export default {
  data() {
    return {
      visible: false,
      isTeacher: auth.isTeacher(),
      mediaPlayer: null
    };
  },
  methods: {
    open () {
        this.visible = true;
        if (!this.mediaPlayer) {
            this.mediaPlayer = BJY.NewMediaPlayer.create({
                element: $('#media-player'),
                volume: 100,
                // 是否可以拖动，默认为false
                draggale: true,
                // 可拖动区域的选择符，默认为Body元素
                draggableRectSelector: 'body',
                replace: false,
                onCloseButtonClick: () => {
                    this.close()
                },
                onMinimizeButtonClick: () => {
                    this.visible = false;
                },
                onPlayFileFail: function () {
                    alert('打开文件失败');
                }
            });
        }
    },
    close () {
        this.visible = false;
        this.mediaPlayer = null;
    }
  },
  created() {
    
  },
  mounted() {
    eventEmitter.on('toggle_media_player', () => {
        this.mediaPlayer ? this.close() : this.open()
    })
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
#media-player {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
