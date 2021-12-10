<template>
    <div id="menuspanel">
        <div class="bjy-playback-menuspanel"></div>
    </div>
</template>

<script>
    export default {
        props: ['pages'],
        data() {
            return {}
        },
        mounted() {
            const menusPanel = BJY.MenusPanel.create({
                element: $('.bjy-playback-menuspanel'),
                // 标记打点用户需要自行添加
                markDot: [
                    { desc: '哈哈哈哈', time_offset: '00:00:00' },
                    { desc: '一二三四五六', time_offset: '00:01:30' },
                    { desc: '一二三四五六', time_offset: '00:02:58' },
                    { desc: '一二三四五六', time_offset: '00:03:21' },
                    { desc: '一二三四五六', time_offset: '00:04:42' },
                    { desc: '一二三四五六', time_offset: '00:05:16' },
                    { desc: '一二三四五六', time_offset: '00:06:32' },
                    { desc: '一二三四五六', time_offset: '00:07:27' },
                    { desc: '一二三四五六', time_offset: '00:08:30' },
                    { desc: '一二三四五六', time_offset: '00:09:10' }
                ],
                // 白板翻页目录
                pages: this.pages
            })
            // 监听视频timeupdate事件，告诉回放目录更新active
            BJY.store.watch('teacherVideo', function (teacherVideo) {
                teacherVideo.addEventListener('timeupdate', function () {
                    menusPanel && menusPanel.set('currentTime', teacherVideo.currentTime)
                })
            })
        }
    }
</script>

<style scoped>
#menuspanel{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: calc(100% - 36px);

    visibility: hidden;
}
</style>
