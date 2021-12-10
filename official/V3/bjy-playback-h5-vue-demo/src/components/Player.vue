<template>
    <video
        id="bjy-player-teacher"
        x5-playsinline="true"
        x-webkit-airplay="allow"
        webkit-playsinline="true"
        playsinline="true"
        controls
    ></video>
</template>

<script>
export default {
    props: ["videoData"],
    components: {},
    data() {
        return {
            tip: "",
            started: false,
            video: null
        };
    },
    computed: {},
    watch: {
        videoData: {
            deep: true,
            handler: function (val, oldVal) {
                this.attachVideo(val)
            }
        }
    },
    methods: {
        onPlaying() {
            BJY.playback.play();
        },
        onPause() {
            console.log("onpause");
            BJY.playback.pause();
        },
        onSeeked() {
            console.log("onseeked");
            BJY.playback.seek(this.video.currentTime);
            BJY.playback.play();
            console.log(this.video.currentTime);
        },
        onTimeUpdate() {
            BJY.playback.timeupdate(this.video.currentTime);
        },
        attachVideo(data) {
            // 首先播默认分辨率
            var url = data.url;
            url = url.replace("https:", "").replace("http:", "");
            if (url.indexOf("ev1") > -1 && flvjs) {
                // 使用flvjs 播放加密格式视频
                let flvPlayer = flvjs.createPlayer(
                    {
                        type: "ev1",
                        url: url,
                        cors: true
                    },
                    {
                        stashInitialSize: 1024
                    }
                );
                flvPlayer.attachMediaElement(this.video);
                flvPlayer.load();
            } else {
                this.video.src = url;
            }
        }
    },
    mounted() {
        let video = (this.video = document.getElementById(
            "bjy-player-teacher"
        ));
        BJY.store.set('teacherVideo', video);
        let data = this.videoData;
        let me = this;
        BJY.playback.start();
        if (data) {
            this.attachVideo(data)

            video.addEventListener("play", function() {
                me.onPlaying();
            });

            video.addEventListener("pause", function() {
                me.onPause();
            });

            video.addEventListener("seeked", function() {
                me.onSeeked();
            });

            // 必须监听视频的timeupdate事件，来告诉回放去根据视频时间更新数据
            video.addEventListener("timeupdate", function() {
                me.onTimeUpdate();
            });
        }
    },
    beforeDestroy() {}
};
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类

#bjy-player-teacher {
    height: 240px;
    width: 100%;
    background: #454545;
    position: relative;
}
</style>
