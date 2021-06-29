<template>
  <div id="message-panel">
    <div class="message-list">
    </div>
    <div class="message-sender">
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
    // 收到新消息时tab栏对应tab给出提示
    eventEmitter.on(
      eventEmitter.MESSAGE_RECEIVE,
      function (e, date) {
        var element = $('.tab-message')
        if (!element.hasClass('active')) {
          element.addClass('has-new')
        }
      }
    )
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
    // 创建消息发送组件
    BJY.MessageSender.create({
      element: $('#message-panel .message-sender'),
      replace: false,
      canSendEmoji: true,
      multiline: true,
      messageMaxLength: 140,
      placeholder: '请输入...',
      emotionList: {
        emotionPerRow: 6,
        rowPerPage: 4
      }
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

  .message-list {
    width: 100%;
    height: unset;
    position: absolute;
    top: 0;
    bottom: 50px;
  }

  .message-sender {
    position: absolute;
    bottom: 0;
    height: 50px;
    width: 100%;
    box-shadow: 0 0 5px #ccc;

    .bjy-no-forbidden {
      display: flex;
      height: 50px;
      align-items: center;
      justify-content: space-between;

      .bjy-message-input {
        flex-grow: 1;
      }

      textarea {
        height: 40px;
        margin-left: 10px;
        font-size: 14px;
      }

      .bjy-action-bar {
        margin-top: unset;
        display: flex;
        align-items: center;

        .bjy-length-hint {
          order: 1;
        }

        .bjy-float {
          order: 2;
          display: flex;
          margin: 0 10px;

          .icon-emotion {
            font-size: 27px;
          }

          .bjy-button {
            font-size: 16px;
            height: unset;
          }
        }
      }
    }
  }
}
</style>
