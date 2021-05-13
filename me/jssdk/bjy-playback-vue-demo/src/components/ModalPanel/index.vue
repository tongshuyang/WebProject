<!-- 模态框组件：在老师端发起各种互动后弹出 -->
<!-- 如：点名、答题等 -->

<template>
    <div class="modal-panel">
        <AnswerMachine/>
        <Quiz/>
    </div>
</template>

<script>
import AnswerMachine from './AnswerMachine'
import Quiz from './Quiz'

export default {
  components: {
    AnswerMachine,
    Quiz
  },
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {},
  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>
