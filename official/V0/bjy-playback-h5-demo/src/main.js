/**
 * @file 主模块
 * @author dujianhao
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
                var container = $(document.body);
                // 加载回放需要的各种组件，包括播放器，白板，用户列表等等
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


            });
        // tab切换按钮事件
        var whiteboardBtn = $('#btn-whiteboard');
        var userListBtn = $('#btn-user-list');
        var messageListBtn = $('#btn-message-list');
        var tabContent = $('.tab-content');

        whiteboardBtn.on('click', function () {
            tabContent.css('margin-left', '0');

            whiteboardBtn.addClass('tab-select');

            messageListBtn.removeClass('tab-select');
            userListBtn.removeClass('tab-select');

        });

        userListBtn.on('click', function () {
            tabContent.css('margin-left', '-100vw');
            userListBtn.addClass('tab-select');

            whiteboardBtn.removeClass('tab-select');
            messageListBtn.removeClass('tab-select');

        });

        messageListBtn.on('click', function () {
            tabContent.css('margin-left', '-200vw');

            messageListBtn.addClass('tab-select');

            userListBtn.removeClass('tab-select');
            whiteboardBtn.removeClass('tab-select');
        });
    };
});
