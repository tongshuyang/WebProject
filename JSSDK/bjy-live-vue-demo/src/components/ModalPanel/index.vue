<!-- 模态框组件：在老师端发起各种互动后弹出 -->
<!-- 如：点名、答题等 -->

<template>
    <div class="modal-panel">
        <RollCall/>
        <AnswerMachine/>
        <Quiz/>
    </div>
</template>

<script>
import AnswerMachine from './AnswerMachine'
import RollCall from './RollCall'
import Quiz from './Quiz'

export default {
  components: {
    AnswerMachine,
    RollCall,
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
.modal-panel {
  z-index: 1;
}
</style>
