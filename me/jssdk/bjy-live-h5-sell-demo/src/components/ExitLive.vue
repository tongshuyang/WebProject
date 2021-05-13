<template>
    <div class="bjy-live-close">
        <i class="sprite-icon close" @click="exitRoom"></i>
    </div>
</template>

<script>
export default {
    methods: {
        exitRoom() {
            this.$Confirm.show("确定要退出直播间吗？").then(() => {
                if (history && history.length > 1) {
                    history.go(-1);
                } else {
                    window.close();
                }
            });
        }
    }
};
</script>

<style>
.bjy-live-close {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 100%;
    color: #ffffff;
}
</style>
