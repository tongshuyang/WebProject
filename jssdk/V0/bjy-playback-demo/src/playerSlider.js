/**
 * @file 回放进度条
 * @author dujianhao
 * @date 2018/7/26
 */

define(function (require, exports) {

    var playerSlider;
    var initializeSlider = function (context, element, video) {
        playerSlider = context.playerSlider = BJY.NewPlayerSlider.create({
            element: element,
            replace: false,
            canUseHotKey: true,
            currentTime: 0,
            duration: +video.duration,
            onBeforeDrag: function (time) {
                context.isSeeking = true;
            },
            onAfterDrag: function (time) {
                context.isSeeking = false;
                video.currentTime = time;
            },
            onBeforeSeek: function (time) {
                context.isSeeking = true;
            },
            onAfterSeek: function (time) {
                context.isSeeking = false;
                video.currentTime = time;
            },
            onBeforeBackward: function (time) {
                context.isSeeking = true;
            },
            onBeforeForward: function (time) {
                context.isSeeking = true;
            },
            onAfterBackward: function (time) {
                context.isSeeking = false;
                video.currentTime = time;
            },
            onAfterForward: function (time) {
                context.isSeeking = false;
                video.currentTime = time;
            },
            onSpacePress: function () {
                video.paused ? video.play() : video.pause();
            }
        });
    };

    exports.init = function (element, video) {

        var mainElement = element.find('#bjy-playback-playslider-wrapper');

        if (!video) {
            return;
        }

        var me = this;

        // 播放/暂停开关
        var playBtn = $('#bjy-play-btn');

        video.paused ? playBtn.text('播放') : playBtn.text('暂停');


        playBtn.on('click',function () {
            video.paused ? video.play() : video.pause();
        });

        // 倍速选择框
        var speedSelector = $('#bjy-speed-selector');

        speedSelector.on('change', function (e) {
            video.playbackRate = +speedSelector[0].value || 1;
        });


        // 监听视频事件，同步进度条与视频
        video.addEventListener('play', function () {
            playBtn.text('暂停');
        });

        video.addEventListener('pause', function () {
            playBtn.text('播放');
        });

        // 必须监听视频的timeupdate事件，来告诉回放去根据视频时间更新数据
        video.addEventListener('timeupdate', function () {
            // 进度条在更改进度状态时不让视频更新进度条时间
            if (me.isSeeking) {
                return;
            }
            playerSlider &&playerSlider.set('currentTime', video.currentTime);
        });

        // 视频启动的时候会触发durationchange，在此处新建playerSlider
        video.addEventListener('durationchange', function () {
            initializeSlider(me, mainElement, video);
        });
    }
});
