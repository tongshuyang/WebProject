<template>
  <div v-show="visible" id="setting-placeholder">
    <div class="close-bar">
      <span @click="close" class="bjy-close">X</span>
    </div>
    <div class="placeholder"></div>
  </div>
</template>
<script>
let eventEmitter = BJY.eventEmitter;
export default {
    name: 'SettingDialog',
    data() {
        return {
            visible: false,
            instance: null
        }
    },
    methods: {
        show() {
            let me = this;
            this.visible = true;
            if (!this.instance) {
                this.instance = BJY.Setting.create({
                    element: $('#setting-placeholder .placeholder'), //外层容器
                    replace: false,
                    showCloseButton: true,
                    hasCloudReocrd: false,
                    hasCameraTab: true, // 摄像头设置
                    hasMicTab: true,  //麦克风设置
                    hasSpeakerTab: true, //扬声器设置
                    hasRecordTab: false,  //录制
                    onCloseButtonClick: function () {
                        //处理关闭回调
                        me.visible = false;
                    }
                });
            }
        },
        close() {
            this.visible = false;
        }
    },
    mounted() {
        
        let me = this;
        eventEmitter.on(
            eventEmitter.OPEN_SETTING_DIALOG_TRIGGER,
            function () {
                me.show();
            }
        )
    },
}
</script>
<style lang="scss">
#setting-placeholder {
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    background: #fff;
    .close-bar {
        background: #232323;
        height: 30px;
        text-align: right;

        .bjy-close {
            line-height: 30px;
            color: #fff;
            font-size: 20px;
            margin-right: 16px;
            cursor: pointer;
        }
    }

    .bjy-device-settings-navs {
        .bjy-item.active {
            background: rgba(159, 168, 181, 0.2);
        }
    }
}
</style>