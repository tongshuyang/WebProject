/**
 * @file 主模块
 * @author zhaogaoxing
 */
define(function (require, exports) {
    var layout = require('./function/layout');
    var loading = require('./loading');
    var messagePanel = require('./messagePanel');
    var noticePanel = require('./noticePanel');
    var playerPanel = require('./playerPanel');
    var whiteboard = require('./whiteboard');
    var barrage = require('./barrage');
    var userPanel = require('./userPanel');
    var playerSlider = require('./playerSlider');
    var volumeSlider = require('./volumeSlider');

    var query = BJY.query;
    var eventEmitter = BJY.eventEmitter;

    exports.init = function () {

        loading.init();

        eventEmitter
            .on(
                eventEmitter.CLASSROOM_CONNECT_FAIL,
                function () {
                    alert('网络已断开，请检查网络连接或者刷新页面重新进入房间');
                }
            )
            .on(
                eventEmitter.LOGIN_CONFLICT,
                function () {
                    alert('你已被踢，请确认用户 number 是否唯一或者刷新页面重新进入房间');
                }
            )
            .on(
                // Window resize 事件
                eventEmitter.WINDOW_RESIZE,
                function () {
                    layout();
                }
            );
        // 初始化房间
        BJY.playback.init({
            env: 'production',
            token: 'T4Ivx-DIWjgmvvoNNdcydzf3LcMMPzYEc4GNHnOv-QuVbTLv8dzJe_eqCFuUfaIw0nPLBgfsrQMKp0fXMnVKLQ',
            class: {
                id: '18070683424562',
                sessionId: 201807200
            },
            useEncrypt: true,
            user: {
                number: '13147056',
                avatar: 'http://static.sunlands.com/newUserImagePath/13147056/40_40/13147056.jpg',
                name: 'xxx',
                type: 0
            }
        })
            .then(function (data) {
                console.log(data);
                var container = $('#main');
                // 加载回放需要的各种组件，包括播放器，白板，用户列表，公告等等
                userPanel.init(container);

                // 创建消息列表
                messagePanel.init(container);

                // 公告初始化
                noticePanel.init(container);

                // 弹幕
                barrage.init(container);

                // 文档白板
                whiteboard.init(container);

                layout();

                // 播放器面板启动后回传video播放器
                var video = playerPanel.init(container, data);

                // 启动进度条需传入播放器，如果启用自定义进度条，则将HTML中<video>标签内的controls字段去掉来隐藏播放器自带控制条
                playerSlider.init(container, video);

                volumeSlider.init(container);


                // 清晰度切换选择框
                var resolutionSelector = $('#bjy-resolution-selector');
                var resolutionList = data.definition;
                var videoSrcList = data.videos;
                var defaultDefinition = data.defaultDefinition;
                var options = '';
                for (var i = 0; i < resolutionList.length; i++) {
                    var resolution = resolutionList[i];
                    var videoSrc = videoSrcList[resolution.type][0].url;
                    var selected = resolution.type === defaultDefinition ? 'selected' : '';
                    options += '<option ' + selected + ' value=' + videoSrc + '>' + resolution.name + '</option>';
                }
                resolutionSelector.html(options);
                resolutionSelector.on('change', function (e) {
                    var url = resolutionSelector[0].value;;
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
                });

            });
        // tab切换按钮事件
        $('#btn-user-list').on('click', function () {
            $('.tab-content').css('margin-left', '-300px');
            $('#btn-user-list').addClass('tab-select');
            $('#btn-message-list').removeClass('tab-select');

        });
        $('#btn-message-list').on('click', function () {
            $('.tab-content').css('margin-left', '0');
            $('#btn-user-list').removeClass('tab-select');
            $('#btn-message-list').addClass('tab-select');
        });
    };
});
