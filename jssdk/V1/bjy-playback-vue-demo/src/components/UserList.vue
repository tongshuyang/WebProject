<template>
    <div class="bjy-playback-userlist"></div>
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
    BJY.UserList.create({
      element: $('.bjy-playback-userlist'),
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
      }
    })
  },
  beforeDestroy () {}
}
</script>

<style lang='scss'>
//@import url(); 引入公共css类
.bjy-user-list {
  position: unset;
}
</style>
