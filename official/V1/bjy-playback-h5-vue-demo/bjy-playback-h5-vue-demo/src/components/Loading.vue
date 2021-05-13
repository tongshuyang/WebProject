<template>
    <div id="loading">
        <div class="placeholder"></div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {
        var loading = BJY.playback.Loading.create({
            // 占位元素
            element: $("#loading .placeholder"),
            // logo URL 可自定义自己的加载 logo
            logoUrl:
                "http://img.baijiayun.com/0baijiacloud/logo/ydzb/v5/www-loading.png",
            onComplete: () => {
                // <!-- loading 完成 -->
                this.$emit("loaded");
                loading.destroy();
            }
        });
    },
    beforeDestroy() {}
};
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
#loading {
    width: 100%;
    height: 100%;
    background: #fff;
}
</style>
