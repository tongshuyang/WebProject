<template>
    <div class="bjy-playback-message-list-wrap">
      <div class="placeholder"></div>

      <p class="checkbox-wrap">
        <input class="" v-model="onlyShowTeacher" type="checkbox">
        只看老师
      </p>
    </div>
</template>

<script>
import userRoleMap from './common/roleMap'
const config = BJY.config
let messageListInstance = null

export default {
  components: {},
  data () {
    return {
      onlyShowTeacher: false
    }
  },
  watch: {
    onlyShowTeacher(newValue, oldValue) {
      if (newValue) {
        console.log('只看老师')
      } else {
        console.log('取消只看老师')
      }
      messageListInstance.scrollToBottom();
      BJY.playback.setMessageFilter(newValue ? this.isTeacherMessage : null);
    }
  },
  methods: {
    isTeacherMessage(message) {
        if (message.from) {
            var type = message.from.type;
            return type === config.ROLE_TYPE_TEACHER || type === config.ROLE_TYPE_ASSISTANT;
        }

        if (message.user) {
            var role = message.user.role;
            return role === 'teacher' || role === 'assistant';
        }

        return false;
    }
  },
  created () {},
  mounted () {
    messageListInstance = BJY.MessageList.create({
      element: $('.bjy-playback-message-list-wrap .placeholder'),
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
  beforeDestroy () {}
}
</script>

<style lang='scss'>
//@import url(); 引入公共css类
.bjy-playback-message-list-wrap {
  height: 100%;
  width: 100%;
  position: relative;

  .placeholder {
    bottom: 20px;
    height: unset;
  }

  .checkbox-wrap {
    position: absolute;
    bottom: 0;
    right: 5px;
    font-size: 12px;
    display: flex;
    align-items: center;
  }
}
</style>
