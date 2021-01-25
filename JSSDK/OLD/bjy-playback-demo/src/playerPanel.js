/**
 * @file 播放器面板
 * @author zhaogaoxing
 */
define(function (require, exports) {
    var userVideos;
    var video;
    var video2;

    var eventEmitter = BJY.eventEmitter;
    var store = BJY.store;

    var onPlaying = function () {
        BJY.playback.play();
    };
    var onPause = function () {
        console.log('onpause');
        BJY.playback.pause();
    };
    var onSeeked = function () {
        console.log('onseeked');
        BJY.playback.seek(video.currentTime);
        BJY.playback.play();
        console.log(video.currentTime);
    };

    var onTimeUpdate = function () {
        BJY.playback.timeupdate(video.currentTime);
    };

    eventEmitter
        .on(
            eventEmitter.MEDIA_PUBLISH,
            function (event, data) {
                if (data.user.type == BJY.config.ROLE_TYPE_STUDENT) {

                    if ($.isEmptyObject(userVideos)) {
                        return;
                    }

                    video2.src = userVideos[data.user.id].low[0].url;

                    var initialized = false;
                    video2.oncanplay = function () {

                        // 已启动过则不再执行
                        if (initialized) {
                            return;
                        }
                        video2.play();
                        if (data.audioOn || data.videoOn) {
                            console.log('播放学生' + data.user.id + '的视频>:' + data.offsetTimestamp);
                            console.log('播放学生' + (video.currentTime - data.offsetTimestamp));
                        }
                        else {
                            console.log('关闭学生' + data.user.id + '的视频>:' + data.offsetTimestamp);
                        }
                        initialized = true;
                    };
                }
            }
        );

    exports.init = function (element, data) {
        video = this.video = document.getElementById('bjy-player-teacher');
        video2 = this.video2 = document.getElementById('bjy-player-user');

        BJY.playback.start();

        if (data.videos) {
            // 首先播默认分辨率
            var url = data.videos[data.defaultDefinition][0].url;
            url = url.replace('https:', '').replace('http:', '');
            if (url.indexOf('ev1') > -1 && flvjs) {
                // 使用flvjs 播放加密格式视频
                flvPlayer = flvjs.createPlayer({
                    type: 'ev1',
                    url: url,
                    cors: true
                }, {
                    stashInitialSize: 1024,
                });
                flvPlayer.attachMediaElement(video);
                flvPlayer.load();
            } else {
                video.src = url;
            }


            var initialized = false;

            video.oncanplay = function () {

                // 已启动过则不再执行
                if (initialized) {
                    return;
                }
                element.find('#player-screen').hide();
                initialized = true;
            };

            video.addEventListener('play', function () {
                onPlaying();
            });

            video.addEventListener('pause', function () {
                onPause();
            });

            video.addEventListener('seeked', function () {
                onSeeked();
            });

            // 必须监听视频的timeupdate事件，来告诉回放去根据视频时间更新数据
            video.addEventListener('timeupdate', function () {
                onTimeUpdate();
            });
        }
        if (data.userVideos) {
            userVideos = data.userVideos;
        }

        store.watch('teacher.videoOn', function (videoOn) {
            console.log('老师摄像头是否开启', videoOn);
        });
        store.watch('teacher.audioOn', function (audioOn) {
            console.log('老师麦克风是否开启', audioOn);
        });

        // 监听
        eventEmitter.on(
            eventEmitter.SPEAKER_VOLUME_CHANGE,
            function (event, data) {
                // 声音值必须为百分比，即0-1之间的值
                var volume = data.value;
                if (video) {
                    video.volume = volume;
                }
                if (video2) {
                    video2.volume = volume;
                }
            }
        );

        // 播放器面板启动后，回传播放器到主界面，供进度条使用
        return video;
    };
});