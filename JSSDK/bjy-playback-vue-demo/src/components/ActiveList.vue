<template>
  <div id="active-list" class="empty">
      <div class="placeholder"></div>
  </div>
</template>

<script>
export default {
  name: 'activeList',
  data () {
    return {
      activeList: null
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () {
  },
  mounted () {
    var activeList = BJY.ActiveList.create({
      element: $('#active-list .placeholder'), // 父容器
      extension: BJY.getExtension(), // 播放器扩展
      width: 260, // 父容器宽度，用于计算播放器的高度
      replace: true // 是否替换父容器下的 DOM
    })

    activeList.watch('userList.length', function (newValue, oldValue) {
      if (newValue !== 0) {
        $('#action').removeClass('empty')
      } else {
        $('#action').addClass('empty')
      }
    })
  },
  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
#active-list {
  overflow-y: auto;
}
.empty {
  height: 100%;
  width: 100%;
  background: url('../assets/img/active-user-list-empty.png') center center no-repeat;
}
</style>
