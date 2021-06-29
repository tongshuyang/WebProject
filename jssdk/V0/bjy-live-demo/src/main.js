/**
 * @file 主模块
 * @author zhaogaoxing
 */
define(function (require, exports) {
    // 扩展自定义的权限，事件，配置
    require('./auth');
    require('./config');
    require('./eventEmitter');

    var ui = require('./ui');

    var language = require('./language/main')();
    var loading = require('./loading');
    var userPanel = require('./userPanel');
    var whiteboard = require('./whiteboard');
    var playerPanel = require('./playerPanel');
    var messagePanel = require('./messagePanel');
    var settingPanel = require('./settingPanel');
    var documentPanel = require('./documentPanel');
    var questionAnswerPanel = require('./questionAnswerPanel');
    var createBarrageMenu = require('./function/createBarrageMenu');
    var checkAutoPlay = require('./function/checkAutoPlay');
    var createDialog = require('./function/createDialog');

    var auth = BJY.auth;
    var config = BJY.config;
    var eventEmitter = BJY.eventEmitter;

    var $body = $('body');

    exports.init = function (data) {
        ui.init();
        loading.init();
        checkAutoPlay(function () {
            exports._init(data);
        });
    }

    exports._init = function (data) {
        if (!data.class || !data.class.webrtcType) {
            /**
             * flash的奇怪特性（普通大班课使用了flash）；
             * 需要在页面中插入一个大尺寸的flash才会自动播放，否则将会导致无法上麦和视频无法自动播放的问题
             */
            var url = '//live-cdn.baijiayun.com/js-sdk/1.28.0/player/extension/flash.swf'
            var html = BJY.createSWF('temp', '', url);

            var swf = $(html)
            $('body').prepend(swf)
            swf.css({
                position: 'absolute',
                top: 0,
                width: 398,
                height: 298,
                opacity: 0
            });
            function supportFlash () {
                var swf
                var plugins = navigator.plugins
          
                if (plugins && plugins.length > 0) {
                  swf = plugins['Shockwave Flash']
                } else if (document.all) {
                  // eslint-disable-next-line no-undef
                  swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                }
                return !!swf
            }
            // 判断是否支持flash
            if (!supportFlash()) {
                var dialog = createDialog({
                    title: '提示',
                    width: 300,
                    height: 100,
                    hasMinimize: false,
                    afterHide: function () {
                        dialog = null;
                    }
                });
                dialog.find('.body').append($(
                    `<div class="flash-tip">网页Flash插件加载不成功，请重新<a class="opt-button"
                    href="http://www.adobe.com/go/getflashplayer">启用flash</a></div>`
                ));
            }
        }

        eventEmitter
            .one(
                eventEmitter.CLASSROOM_CONNECT_TRIGGER,
                function (event, data) {
                    // 初始化扩展
                    var extension = BJY.getExtension();
                    extension.init().then(function () {
                        eventEmitter.trigger(
                            eventEmitter.CLASSROOM_CONNECT_TRIGGER,
                            data
                        );
                    });
                    return false;
                }
            )
            .on(
                eventEmitter.CLASSROOM_CONNECT_FAIL,
                function () {
                    alert(language.ROOM_SERVER_CONNECT_FAIL);
                }
            )
            .on(
                eventEmitter.LOGIN_CONFLICT,
                function () {
                    alert(language.LOGIN_CONFLICT);
                }
            )
            // 监听初始化事件，初始化组件
            // 请将所有的组件创建逻辑写于此回调函数之中
            .one(
                eventEmitter.VIEW_RENDER_TRIGGER,
                function () {
                    var element = $('#main');

                    playerPanel.init(element);
                    whiteboard.init(element);
                    settingPanel.init(element);
                    userPanel.init(element);
                    messagePanel.init(element);
                    questionAnswerPanel.init(element);
                    createBarrageMenu.init(element, '#menu-barrage');

                    if (auth.isTeacher() || auth.isAssistant()) {
                        documentPanel.init(element.find('.left'));
                    }
                    eventEmitter.trigger(
                        eventEmitter.DOC_ALL_REQ
                    );

                    if (auth.isTeacher()) {
                        $body.addClass('teacher');
                    }
                    if (auth.isAssistant()) {
                        $body.addClass('assistant');
                    }
                    if (auth.isStudent()) {
                        $body.addClass('student');
                    }

                    // 初始化webRTC的屏幕扩展
                    if (auth.isWebRTC()) {
                        BJY.ScreenShareExtensionWebrtc.init();
                    }
                }
            )
            .on(
                eventEmitter.CLASS_START,
                function () {
                    // 上课后老师自动开启音视频
                    if (auth.isTeacher()) {
                        eventEmitter.trigger(
                            eventEmitter.MEDIA_SWITCH_TRIGGER,
                            {
                                audioOn: true,
                                videoOn: true
                            }
                        );
                    }
                }
            )
            .on(
                eventEmitter.CLASS_END,
                function () {
                    // 下课后所有人自动关闭音视频
                    eventEmitter.trigger(
                        eventEmitter.MEDIA_SWITCH_TRIGGER,
                        {
                            audioOn: false,
                            videoOn: false
                        }
                    );
                }
            )
            .on(
                eventEmitter.CLASSROOM_CONNECT_SUCCESS,
                function (event, data) {
                    // data.reconnect 是否为断线重连
                }
            );

        // 设置当前用户的发言权限，你可以根据class.type 或者其他的一些条件来确定speakState的值，不传它的默认值为SPEAK_STATE_LIMIT
        // 老师和助教设为自由发言
        if (auth.isTeacher(data.user.type) || auth.isAssistant(data.user.type)) {
            data.class.speakState = config.SPEAK_STATE_FREE;
        }
        else {
            data.class.speakState = config.SPEAK_STATE_LIMIT;
        }

        // 初始化房间
        BJY.init({
            env: data.env || 'production',
            sign: data.sign,
            privateDomainPrefix: data.privateDomainPrefix,
            class: data.class,
            // 当前进入教室的用户的信息
            // 如果是老师进教室，传老师的信息
            // 如果是学生进教室，传学生的信息
            // number 必须确保是唯一的，如果不唯一，后进的用户会踢掉先进的用户
            user: data.user,
            // 如果知道老师的信息，传入，如果没有，传入{type: 1}
            teacher: data.teacher,
            partner: data.partner
        });

        // tab切换按钮事件
        $('#btn-user-list').on('click',function () {
            $('.tab-content').css('margin-left', -532);
            $('#btn-user-list').addClass('tab-select');
            $('#btn-action-list').removeClass('tab-select');
            $('#btn-message-list').removeClass('tab-select');

        });
        $('#btn-message-list').on('click',function () {
            $('.tab-content').css('margin-left', -266);
            $('#btn-message-list').addClass('tab-select').removeClass('has-new');
            $('#btn-user-list').removeClass('tab-select');
            $('#btn-action-list').removeClass('tab-select');
        });
        $('#btn-action-list').on('click',function () {
            $('.tab-content').css('margin-left', 0);
            $('#btn-action-list').addClass('tab-select').removeClass('has-new');
            $('#btn-user-list').removeClass('tab-select');
            $('#btn-message-list').removeClass('tab-select');
        });
    };
});
