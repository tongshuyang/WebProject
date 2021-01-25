/**
 * @file 播放器面板
 * @author zhaogaoxing
 */
define(function (require, exports) {
    var eventEmitter = BJY.eventEmitter;
    var store = BJY.store;
    var auth = BJY.auth;
    var teacherH5Player;

    exports.init = function (element) {
        var Player = BJY.Player;
        var html = Player.html;

        html.showControls = false;
        html.init();

        var playLayer = $('.player-layer');
        var isTeacherOn = false;
        var loadingEnd = false;

        var showLayer = function () {
            playLayer.show();
            teacherH5Player && teacherH5Player.hideVideo();
        };

        var hideLayer = function () {
            playLayer.hide();
            teacherH5Player && teacherH5Player.showVideo();
        };
        
        hideLayer();

        element.on('click', '#button-play', function () {
            if (teacherH5Player) {
                teacherH5Player.replay();
                hideLayer();
            }
        });

        eventEmitter
            .on(
                eventEmitter.TEACHER_MEDIA_ON,
                function () {
                    if (!loadingEnd) {
                        isTeacherOn = true;
                        return;
                    }
                    if (!teacherH5Player) {
                        teacherH5Player = new Player({
                            element: element.find('#h5-player'),
                            user: store.get('teacher'),
                            extension: html
                        });
                        showLayer();
                    }
                }
            )
            .on(
                eventEmitter.LOADING_PANEL_END,
                function () {
                    loadingEnd = true;
                    if (!teacherH5Player && isTeacherOn) {
                        teacherH5Player = new Player({
                            element: element.find('#h5-player'),
                            user: store.get('teacher'),
                            extension: html
                        });
                        showLayer();
                    }
                }
            )
            .on(
                eventEmitter.TEACHER_REMOVE,
                function () {
                    if (teacherH5Player) {
                        teacherH5Player.dispose();
                        teacherH5Player = null;
                        element.find('.teacher-status').show().text('老师已离开教室');
                    }
                }
            )
            .on(
                eventEmitter.MEDIA_PUBLISH,
                function (e, data) {
                    var videoOn = data.videoOn;
                    var audioOn = data.audioOn;
                    if (auth.isPresenter(data.user.id)
                        || auth.isTeacher(data.user.type)
                    ) {
                        if (!videoOn) {
                            if (teacherH5Player) {
                                teacherH5Player.hideVideo();
                            }
                        }
                        if (!videoOn && audioOn) {
                            element.find('.teacher-status').show().text('老师已关摄像头');
                        }
                        else if (!videoOn && !audioOn) {
                            element.find('.teacher-status').show().text('老师已关摄像头和麦克风');
                        }
                        else if (videoOn) {
                            element.find('.teacher-status').hide();
                            if (teacherH5Player) {
                                teacherH5Player.showVideo();
                            }
                        }
                        if (videoOn && !audioOn) {
                            tip({
                                content: '老师已关麦克风'
                            });
                        }
                    }
                }
            )
            .on(
                eventEmitter.TEACHER_ADD,
                function () {
                    element.find('.teacher-status').show().text('老师已进入教室')
                }
            )
            .on(
                // 正在加载视频事件
                eventEmitter.HTML_VIDEO_LOAD_START,
                function () {
                    console.log('正在加载视频');
                }
            )
            .on(
                // 视频开始播放事件
                eventEmitter.HTML_VIDEO_PLAY,
                function () {
                    console.log('视频开始播放');
                    hideLayer();
                }
            )
            .on(
                // 视频暂停事件
                eventEmitter.HTML_VIDEO_PAUSE,
                function () {
                    console.log('视频暂停');
                    showLayer();
                }
            )
            .on(
                // 视频加载超时事件
                eventEmitter.HTML_VIDEO_LOAD_TIMEOUT,
                function () {
                    console.log('视频加载超时');
                    showLayer();
                }
            )
            .on(
                // 视频加载失败事件
                eventEmitter.HTML_VIDEO_LOAD_FAIL,
                function () {
                    console.log('视频加载失败');
                    showLayer();
                }
            )
            .on(
                // 正在加载音频事件
                eventEmitter.HTML_AUDIO_LOAD_START,
                function () {
                    console.log('正在加载音频');
                }
            )
            .on(
                // 音频开始播放事件
                eventEmitter.HTML_AUDIO_PLAY,
                function () {
                    console.log('音频开始播放');
                    hideLayer();
                }
            )
            .on(
                // 音频暂停事件
                eventEmitter.HTML_AUDIO_PAUSE,
                function () {
                    console.log('音频暂停');
                    showLayer();
                }
            )
            .on(
                // 音频加载超时事件
                eventEmitter.HTML_AUDIO_LOAD_TIMEOUT,
                function () {
                    console.log('音频加载超时');
                    showLayer();
                }
            )
            .on(
                // 音频加载失败事件
                eventEmitter.HTML_AUDIO_LOAD_FAIL,
                function () {
                    console.log('音频加载失败');
                    showLayer();
                }
            );
    };
});