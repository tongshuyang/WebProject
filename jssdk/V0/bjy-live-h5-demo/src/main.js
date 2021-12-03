/**
 * @file 主模块
 * @author zhaogaoxing
 */
define(function (require, exports) {
    var layout = require('./function/layout');
    var isIOS = require('./function/isIOS');
    var loading = require('./loading');
    var messagePanel = require('./messagePanel');
    var playerPanel = require('./playerPanel');
    var whiteboard = require ('./whiteboard');
    var questionAnswer = require('./questionAnswerPanel');
    var barrage = require('./barrage');
    var notice = require('./notice');
    var menu = require('./menu');
    var ui = require('./ui');

    var mediaData = BJY.data.media;
    var query = BJY.query;
    var eventEmitter = BJY.eventEmitter;
    var store = BJY.store;
    var config = BJY.config;

    exports.init = function () {
        var element = $('#main');
        layout();

        ui.init();
        loading.init();
        playerPanel.init(element);
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

            // 监听初始化事件
            .one(
                eventEmitter.VIEW_RENDER_TRIGGER,
                function (event, data) {
                    mediaData.setSpeakerVolume(100);
                    // 初始化组件
                    whiteboard.init(element);
                    messagePanel.init(element);
                    questionAnswer.init(element);
                    window.barrageInstance = barrage.init(element);
                    menu.init(element, 0, notice.init(element), window.barrageInstance);
                    setTimeout(function () {
                        // 延迟才能取到正确的width
                        $('.tab-content').css('margin-left', -tabIndex * $(window).width());
                    }, 200);
                }
            );
        // 初始化房间
        // https://tiansujing.at.baijiayun.com/web/room/enter?room_id=19112041735674&user_avatar=%2F%2Fimg.baijiayun.com%2F0bjcloud%2Flive%2Favatar%2Fv2%2Fteacher.png&user_name=%E6%B8%B8%E5%AE%A2&user_number=0&user_role=0&sign=731f5299af5179f99a17746f7c1bd20e
        // 默认demo教室
        console.log('******************************************************************************');
        console.log('*   欢迎使用 BJY JS SDK - 百家云直播 - ' + BJY.version);
        console.log('*   API 文档：https://www.baijiayun.com/js-sdk/doc/#/README');
        console.log('*   版本更新日志：https://www.baijiayun.com/js-sdk/doc/#/change-log');
        console.log('*   常见问题：https://www.baijiayun.com/js-sdk/doc/#/live?id=%e5%b8%b8%e8%a7%81%e9%97%ae%e9%a2%98');
        console.log('*   注意事项：H5 Demo 需要在真机上预览，PC上不支持m3u8流类型， 自己创建教室测试时，注意非webrtc类型教室传入webrtc: 0');
        console.log('*   sign签名规则：https://dev.baijiayun.com/wiki/detail/1');
        console.log('******************************************************************************');
        var options = {
            prefixName: 'e70655665',
            env: 'production',
            room_id: '20121042083339',
            user_number: '0',
            user_avatar: 'https://oss-fist.litman.cn/img/favicon/favicon.png',
            user_name: 'soyung',
            user_role: 0,
            sign: 'db5d6e993c5dc37b6b7d39b5db1791fe',
            webrtc: 1
        };
        // debug 模式支持输入传送门链接进入
        // 非webrtc大班课需要在url后拼上 &webrtc=0
        if (location.href.includes('debug=1')) {
            var url = prompt('输入教室链接进入教室')
            options = Object.assign(options, urlParser(url))
            console.log(options)
        }
        var classOption = {
            // 必须为字符串
            id: options.room_id,
            // 学生默认限制发言
            speakState: BJY.config.SPEAK_STATE_LIMIT
        }
        if (Number(options.webrtc)) {
            classOption.webrtcType = Number(options.webrtc)
        }
        BJY.init({
            env: options.env,
            privateDomainPrefix: options.prefixName,
            sign: options.sign,
            class: classOption,
            // 当前进入教室的用户的信息
            // 传学生的信息
            // number 必须确保是唯一的，如果不唯一，后进的用户会踢掉先进的用户
            user: {
                name: decodeURIComponent(options.user_name),
                type: Number(options.user_role),
                number: options.user_number,
                group: 0,
                endType: 2,
                avatar: decodeURIComponent(options.user_avatar)
            }
        })
        .then(function () {
            // AAC编码下TCP延时约7-8s, UDP延时约10s, SPEEX下TCP和UDP都约11-12s
            // 可自己根据实际情况调整buffer
            var justifyBuffer = function () {
                store.set(
                    'class.playBuffer',
                    store.get('teacher.audioOn')
                        ? (store.get('teacher.linkType') === config.LINK_TYPE_TCP
                        && store.get('class.liveAudioCodec') === config.AUDIO_CODEC_AAC ? 7 : 11)
                        : 0
                );
            };

            store.watch(
                'teacher.audioOn',
                justifyBuffer,
                true
            );

            store.watch(
                'teacher.linkType',
                justifyBuffer,
                true
            );
        });

        // tab切换按钮事件
        var TAB_MESSAGE = 0;
        var TAB_QUESTION = 1;
        var TAB_WHITEBOARD = 2;
        var tabIndex = TAB_WHITEBOARD;
        
        $('#btn-whiteboard').on('click',function () {
            $('.tab-content').css('margin-left', -TAB_WHITEBOARD * $(window).width());
            $('#btn-whiteboard').addClass('tab-select');
            $('#btn-message-list').removeClass('tab-select');
            $('#btn-question-list').removeClass('tab-select');

            tabIndex = TAB_WHITEBOARD;
        });
        $('#btn-message-list').on('click',function () {
            $('.tab-content').css('margin-left', '0');
            $('#btn-whiteboard').removeClass('tab-select');
            $('#btn-question-list').removeClass('tab-select');
            $('#btn-message-list').addClass('tab-select');

            tabIndex = TAB_MESSAGE;
        });
        $('#btn-question-list').on('click',function () {
            $('.tab-content').css('margin-left', -TAB_QUESTION * $(window).width());
            $('#btn-whiteboard').removeClass('tab-select');
            $('#btn-message-list').removeClass('tab-select');
            $('#btn-question-list').addClass('tab-select');

            tabIndex = TAB_QUESTION;
        });
        
        // 处理横竖屏的问题
        window.addEventListener('orientationchange', function(event) {
            if ( window.orientation == 180 || window.orientation == 0 ) {
                 //竖屏事件处理
            }
            if ( window.orientation == 90 || window.orientation == -90 ) {
                 //横屏事件处理
            }
            // 统一处理
            setTimeout(function () {
                // 延迟才能取到正确的width
                $('.tab-content').css('margin-left', -tabIndex * $(window).width());
            }, 200);
        }, false);
    };

    // 支持解析输入的url进教室
    function urlParser (url) {
        var params = {}
        if (url) {
            try {
            var queryStr = url.split('?')[1]
            var paramList = queryStr.split('&')
            paramList.forEach(item => {
                var pair = item.split('=')
                params[pair[0]] = pair[1]
            })
            // 区分环境
            params.env = getEnv(url)
            // 个性域名
            params.prefixName = url.split('.')[0].split('//')[1]
            } catch (e) {
            alert('url格式错误，已进入默认教室')
            }
        }
        return params
    }
    // 获取环境
    function getEnv (url) {
        // 获取环境
        let hostName = url.match(/\/\/(.*)\./)[1]
        if (/test/.test(hostName) || /localhost/.test(hostName) || /\d{1,3}\.\d{1,3}\.\d{1,3}/.test(hostName)) {
            return 'test'
        }
        if (/beta/.test(hostName)) {
            return 'beta'
        }
        if (/www/.test(hostName)) {
            return ''
        }
        return '';
    }
});