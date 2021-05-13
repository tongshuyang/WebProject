<template>
    <div class="bjy-playback-message"></div>
</template>

<script>
import userRoleMap from './common/roleMap'
export default {
  components: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {
    BJY.MessageList.create({
      element: $('.bjy-playback-message'),
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

<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>
