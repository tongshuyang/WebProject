<template>
    <div class="menu-setting icon icon-setting" @click="openSetting"></div>
</template>
<script>
let eventEmitter = BJY.eventEmitter;
export default {
    name: 'SettingMenu',
    methods: {
        openSetting() {
            eventEmitter.trigger(eventEmitter.OPEN_SETTING_DIALOG_TRIGGER);
        }
    }
}
</script>
<style lang="scss">
.menu-setting.icon {
    font-size: 24px;
    cursor: pointer;
}
</style>
