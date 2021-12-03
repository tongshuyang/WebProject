<!-- 模态框组件：在老师端发起各种互动后弹出 -->
<!-- 如：点名、答题等 -->

<template>
  <div class="modal-panel">
    <RollCall v-if="isStudent" />
    <RollCallTeacher v-else />
    <AnswerMachine />
    <Quiz />
    <MediaPlayer />
    <Lottery />
    <AttentionDetection />
    <SettingDialog />
  </div>
</template>

<script>
import AnswerMachine from "./AnswerMachine";
import RollCall from "./RollCall";
import RollCallTeacher from "./RollCallTeacher";
import Quiz from "./Quiz";
import MediaPlayer from "./MediaPlayer";
import Lottery from "./Lottery";
import AttentionDetection from "./AttentionDetection";
import SettingDialog from "./SettingDialog";

const auth = BJY.auth;

export default {
  components: {
    AnswerMachine,
    RollCall,
    RollCallTeacher,
    Quiz,
    MediaPlayer,
    Lottery,
    AttentionDetection,
    SettingDialog
  },
  data() {
    return {
      isStudent: auth.isStudent(),
    };
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.modal-panel {
  z-index: 1;

  & > div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  }
}
</style>
