<template>
  <div id="message-panel">
    <div class="message-list">
    </div>
  </div>
</template>

<script>
import userRoleMap from './common/roleMap'

var eventEmitter = BJY.eventEmitter

export default {
  components: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () {
  },
  mounted () {
    // 创建消息列表
    BJY.MessageList.create({
      element: $('#message-panel .message-list'),
      replace: false,
      renderEmoji: function (name, url) {
        if (BJY.isAlicloudImage(url)) {
          return '<img ondragstart="return false" src="' +
            (url + '@100w_1e_1l.png') +
            '" srcset="' +
            (url + '@200w_1e_1l.png') +
            ' 2x">'
        }
        return '<img ondragstart="return false" src="' + url + '">'
      },
      renderImage: function (url) {
        if (BJY.isAlicloudImage(url)) {
          return '<img ondragstart="return false" src="' +
            (url + '@100w_1e_1l.png') +
            '" srcset="' +
            (url + '@200w_1e_1l.png') +
            ' 2x">'
        }
        return '<img ondragstart="return false" src="' + url + '">'
      },
      renderUser: function (user, width, height) {
        return {
          id: user.id,
          name: user.name,
          number: user.number,
          // 头像需压缩
          avatar: BJY.compressImage({
            url: user.avatar,
            width: width,
            height: height
          }),
          avatar2x: BJY.compressImage({
            url: user.avatar,
            width: width * 2,
            height: height * 2
          }),
          // 根据用户类型，配置角色的英文和本地语言
          role: userRoleMap[user.type].en,
          localRole: userRoleMap[user.type].cn
        }
      },
      loadDistance: 0
    })
  },
  beforeDestroy () { }
}
</script>

<style lang='scss'>
//@import url(); 引入公共css类
#message-panel {
  position: relative;
  width: 100%;
  height: 100%;
  visibility: hidden;

  .message-list {
    width: 100%;
    height: unset;
    position: absolute;
    top: 0;
    bottom: 50px;
  }
}
</style>
