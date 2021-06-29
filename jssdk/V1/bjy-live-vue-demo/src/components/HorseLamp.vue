<!-- 跑马灯组件，此组件不需要预置dom，只需在创建的时候指定挂载dom（即要在哪个dom里面跑） -->
<template>
    <div class="horselamp-fake"></div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      content: ''
    }
  },
  created () {
    this.content = '我是跑马灯'
    var additionalStyle = '' +
                    'font-size: 18px;' +
                    'color: #fff;' +
                    'opacity: 0.5;'

    var horseLamp = new BJY.HorseLamp({
    // 在哪个dom上跑
      container: $('#main'),
      // 第一个跑马灯开始到下一个跑马灯开始的间隔
      timeout: 10,
      // 跑完一次到下一次开始的间隔
      interval: 5,
      // 轨道数
      trackCount: 8,
      // 跑马灯速度
      speed: 30,
      // 一次跑多少个
      count: 5,
      // 跑马灯模式 0- 轨道随机模式 1- 防盗录模式（可根据跑马灯来解析出学生信息）版本 0.3.0+ 可用
      mode: 0,
      // 第一个轨道距container top 的距离
      top: 0,
      // 最后一个轨道距container bottom 的距离
      bottom: 0,
      // 跑马灯内容
      content: this.content,
      // 跑马灯自定义样式
      additionalStyle: additionalStyle
    })
    // 开始跑马灯
    horseLamp.start()
  },
  mounted () {}
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
.horselamp-fake {
    display: none;
}
</style>
