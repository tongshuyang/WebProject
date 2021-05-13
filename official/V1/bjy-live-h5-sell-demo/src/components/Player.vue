<template>
    <div id="h5-player">
        <div v-if="!started || tip" class="tip">
            <i class="sprite-icon wait"></i>
            <div>
                {{ tip }}
            </div>
        </div>
        <!-- 因为手机不支持自动播放，需在播放器位置放一个播放按钮，点击后调用 teacherH5Player.playAV(true) 触发播放 -->
        <div v-show="started && !isPlaying && !tip" id="btn-wrap">
            <i
                v-show="!isLoading"
                class="sprite-icon icon-live"
                @click="togglePlay(true)"
            ></i>
            <i
                v-show="isLoading"
                class="sprite-icon icon-loading"
                @click="togglePlay(true)"
            ></i>
        </div>
    </div>
</template>

<script>
var eventEmitter = BJY.eventEmitter;
// store 存储着系统的权限信息
var store = BJY.store;
var userData = BJY.data.user;
var classData = BJY.data.class;
var auth = BJY.auth;
var logger = BJY.loggerManager.create({ prefix: "demo player" });
// 获取创建播放器的 Player 对象
var Player = BJY.Player;
var teacherH5Player;
var playButton;

var PLAY_BTN_TEXT_PLAY = "进入直播间";
var PLAY_BTN_TEXT_LOADING = "正在进入直播间…";

function getPresenter() {
    return userData.find(store.get("presenterId"));
}

function createPlayer() {
    logger("createPlayer");
    window.player = teacherH5Player = new Player({
        // 组件的父容器
        element: $("#h5-player"),
        // 音视频发布用户（一般为主播）
        user: getPresenter(),
        // 播放器扩展（实现与底层播放相关的接口 可直接使用百家云实现 H5 扩展 Player.html。）
        extension: Player.html
    });
}

function disposePlayer() {
    if (teacherH5Player) {
        // 销毁 H5 播放器组件
        teacherH5Player.dispose();
        // 将对 H5 组件对象置空
        teacherH5Player = null;
    }
}

export default {
    components: {},
    data() {
        return {
            tip: "",
            started: false,
            isPlaying: false,
            isLoading: false,
            eventList: [],
            user: getPresenter()
        };
    },
    computed: {
        btnText: function() {
            return this.isLoading ? PLAY_BTN_TEXT_LOADING : PLAY_BTN_TEXT_PLAY;
        }
    },
    watch: {},
    methods: {
        togglePlay() {
            // 如果当前播放器正在播放，先关掉播放器
            if (teacherH5Player.videoOn || teacherH5Player.audioOn) {
                teacherH5Player.playAVClose();
            }
            // 播放视频
            teacherH5Player.playAV(store.get("teacher.videoOn"));
            this.isLoading = true;
        },
        replay() {
            if (teacherH5Player) {
                teacherH5Player.replay();
            }
        },
        checkStatus() {
            logger("checkStatus");
            var user = getPresenter();
            this.started = store.get("class.started");
            if (!this.started) {
                if (classData.isEndTimeReached()) {
                    this.tip = "直播已结束";
                } else {
                    this.tip = "主播不在，请稍后";
                }
            }
            if (user && user.videoOn) {
                this.tip = "";
                return;
            }
            if (!user) {
                this.isPlaying = false;
                this.tip = "主播不在，请稍后";
            }
            if (user && !user.videoOn) {
                this.isPlaying = false;
                this.tip = "主播未开摄像头";
            }
        }
    },
    created() {
        var me = this;
        this.started = store.get("class.started") && me.user;
        // 初始化 H5 播放器扩展
        Player.html.init();
        // 监听 H5 播放器相关事件
        eventEmitter
            .on(
                // 主播打开媒体事件
                eventEmitter.TEACHER_MEDIA_ON,
                () => {
                    logger("主播媒体开启");
                    // 判断播放器是否存在
                    if (!teacherH5Player) {
                        // 若不存在，创建一个 H5 播放器组件
                        createPlayer();
                    }
                    me.togglePlay();
                    me.tip = "";
                    me.started = true;
                }
            )
            .on(
                // 主播关闭媒体事件
                eventEmitter.TEACHER_MEDIA_OFF,
                () => {
                    logger("主播已关摄像头");
                    me.tip = "主播已关摄像头";
                    me.started = false;
                    me.checkStatus();
                    me.isPlaying = false;
                }
            )
            .on(
                // 主播加入房间事件
                eventEmitter.TEACHER_ADD,
                function() {
                    logger("主播进入教室");
                    me.checkStatus();
                }
            )
            .on(
                // 主播离开房间事件
                eventEmitter.TEACHER_REMOVE,
                () => {
                    logger("主播离开");
                    me.tip = "主播离开";
                    me.started = false;
                    me.checkStatus();
                    if (teacherH5Player) {
                        // 销毁 H5 播放器组件
                        teacherH5Player.dispose();
                        // 将对 H5 组件对象置空
                        teacherH5Player = null;
                    }
                    me.isPlaying = false;
                }
            )
            .on(
                // 视频开始播放事件
                eventEmitter.HTML_VIDEO_PLAY,
                () => {
                    logger("视频开始播放");
                    me.tip = "";
                    me.checkStatus();
                    var interval = setInterval(() => {
                        var video = $("video", $("#h5-player"))[0];
                        if (!video) {
                            clearInterval(interval);
                        }
                        var paused = video.paused;
                        me.isPlaying = !paused;
                        if (me.isLoading) {
                            me.isLoading = paused || !video.currentTime;
                        }
                        if (!paused && video.currentTime) {
                            clearInterval(interval);
                        }
                    }, 200);
                }
            )
            .on(eventEmitter.PRESENTER_CHANGE, (event, user) => {
                if (user.id !== me.user.id) {
                    me.user = user;
                    createPlayer();
                    me.togglePlay();
                }
            })
            .on(eventEmitter.USER_UPDATE, (event, user) => {
                logger("USER_UPDATE", user);
                if (user.id == me.user.id) {
                    me.user = user;
                }
                me.checkStatus();
            })
            .on(eventEmitter.HTML_VIDEO_LOAD_START, () => {})
            .on(eventEmitter.HTML_VIDEO_PAUSE, () => {
                me.isPlaying = false;
            })
            .on(eventEmitter.HTML_VIDEO_LOAD_TIMEOUT, () => {})
            .on(eventEmitter.HTML_VIDEO_LOAD_FAIL, () => {
                me.isPlaying = false;
                me.isPlayError = true;
            })
            .on(eventEmitter.CLASS_END, () => {
                me.checkStatus();
                me.isPlaying = false;
            });
    },
    mounted() {
        playButton = $("#btn-wrap");
        if (!this.started) {
            this.tip = "主播不在，请稍后";
            return;
        }
        createPlayer();
    },
    beforeDestroy() {}
};
</script>

<style lang="scss">
//@import url(); 引入公共css类

#h5-player {
    z-index: 1;
    height: 100%;
    width: 100%;
    position: relative;
    background: no-repeat url(../assets/no-video.png);
    background-image: -webkit-image-set(url(../assets/no-video@2x.png) 2x);
    background-size: cover;

    #btn-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: no-repeat url(../assets/no-video.png);
        background-image: -webkit-image-set(url(../assets/no-video@2x.png) 2x);
        background-size: cover;

        .icon-live,
        .icon-loading {
            margin-top: 200px;
        }
    }

    .hidden {
        display: none;
    }
    .tip {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: no-repeat url(../assets/no-video.png);
        background-image: -webkit-image-set(url(../assets/no-video@2x.png) 2x);
        background-size: cover;
        color: #fff;

        .sprite-icon.wait {
            margin-top: 150px;
        }
    }
    .bjy-video {
        object-fit: cover;
        pointer-events: none;
    }
}
</style>
