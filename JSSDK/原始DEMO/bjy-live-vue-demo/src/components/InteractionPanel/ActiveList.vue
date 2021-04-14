<template>
    <div id="active" :class="{empty:noOneSpeaking}">
        <div id="active-list">
            <div class="placeholder"></div>
        </div>

        <!-- 自己播放器 -->
        <div class="live-self-player">
          <SelfPlayer />
        </div>
    </div>
</template>

<script>
// 自己播放器
import SelfPlayer from '../SelfPlayer'

export default {
  name: 'activeList',
  components: {
    SelfPlayer
  },
  data () {
    return {
      activeList: null,
      noOneSpeaking: true
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () {
  },
  mounted () {
    let eventEmitter = BJY.eventEmitter
    let activeList = BJY.ActiveList.create({
      element: $('#active-list .placeholder'), // 父容器
      extension: BJY.getExtension(), // 播放器扩展
      width: 260, // 父容器宽度，用于计算播放器的高度
      replace: false // 是否替换父容器下的 DOM
    })

    eventEmitter.on(
      eventEmitter.ACTIVE_LIST_PRESENTER_CHANGE_TRIGGER,
      function (event, data) {
        activeList.changePresenter(data.newPresenter, data.oldPresenter)
      }
    )

    activeList.watch('userList.length', (newValue, oldValue) => {
      if (newValue !== 0) {
        this.noOneSpeaking = false
      } else {
        this.noOneSpeaking = true
      }
    })
  },
  beforeDestroy () {}
}
</script>

<style lang='scss'>
//@import url(); 引入公共css类
#active {
  .live-self-player {
    height: 200px;
    width: 266px;
    position: absolute;
    bottom: 0;
    transition: .2s bottom;
  }
   &>.hide {
      bottom: -200px !important;
  }

  &>.hide .bjy-fold-bar {
      top: -24px !important;
  }

  &>.hide .bjy-fold-bar .bjy-fold-toggle {
      background: #424242 !important;
  }
}
.empty {
  height: 100%;
  width: 100%;
  background: url('../../assets/img/active-user-list-empty.png') center center no-repeat;
}
</style>
