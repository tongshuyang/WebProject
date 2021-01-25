/**
 * @file 设置面板
 * @author zhaogaoxing
 */
define(function(require, exports) {
    var auth = BJY.auth;
    var store = BJY.store;
    var config = BJY.config;
    var eventEmitter = BJY.eventEmitter;

    var createRecord = require('./function/createRecord');
    var createStartButton = require('./function/createStartButton');
    var createShareScreen = require('./function/createShareScreen');
    var createRollCall = require('./function/rollCallTeacher');
    var rollCallStudent = require('./function/rollCallStudent');
    var createAnswerMachine = require('./function/createAnswerMachine');

    var language = require('./language/main')();

    exports.init = function(element) {
        if (!store.get('class.isFree') && auth.isStudent()) {
            BJY.SpeakApplyMenu.create({
                element: element.find('#menu-speak-apply'),
                // 举手按钮被点击
                onApplyClick: function() {
                    if (store.get('class.started')) {
                        BJY.userSpeak.startApply(10 * 1000);
                    }
                    else {
                        tip({
                            content: language.TIP_CLASS_NOT_START
                        });
                    }
                },
                // 取消举手被点击
                onCancelClick: function() {
                    BJY.userSpeak.cancelApply();
                },
                // 结束发言被点击
                onStopClick: function() {
                    BJY.userSpeak.stopSpeak(BJY.store.get('user.id'));
                }
            });

            eventEmitter
                .on(
                    eventEmitter.SPEAK_APPLY_RESULT_TIMEOUT,
                    function(e, data) {
                        tip({
                            content: language.TIP_SPEAK_APPLY_TIMEOUT
                        });
                    }
                )
                .on(
                    eventEmitter.SPEAK_APPLY_RESULT_REJECT,
                    function(e, data) {
                        tip({
                            content: language.TIP_SPEAK_APPLY_REJECT
                        });
                    }
                )
                .on(
                    eventEmitter.SPEAK_APPLY_RESULT_ACCEPT,
                    function(e, data) {
                        tip({
                            content: language.TIP_SPEAK_APPLY_ACCEPT
                        });
                    }
                );
        }
        else {
            element.find('#menu-speak-apply').remove();
        }

        // 创建扬声器菜单
        BJY.SpeakerMenu.create({
            element: element.find('#menu-speaker'),
            canAdjustVolume: true,
            maxVolume: 100
        });
        // 创建麦克风菜单
        BJY.MicMenu.create({
            element: element.find('#menu-mic'),
            maxVolume: 100,
            canSelectDevice: true,
            canAdjustVolume: true,
            onSwitcherClick: function() {
                if (!store.get('class.started')) {
                    tip({
                        content: language.TIP_CLASS_NOT_START
                    });
                    return;
                }
                if (store.get('class.speakState') == config.SPEAK_STATE_LIMIT) {
                    tip({
                        content: language.TIP_SPEAK_LIMIT
                    });
                    return;
                }
                // 获取我的播放器
                var player = BJY.Player.instances[BJY.store.get('user.id')];
                // 设置麦克风设备
                BJY.userPublish.setDevice(player, null, !player.audioOn);
            }
        });
        // 创建摄像头菜单
        BJY.CameraMenu.create({
            element: element.find('#menu-camera'),
            canSelectDevice: true,
            onSwitcherClick: function() {
                if (!store.get('class.started')) {
                    tip({
                        content: language.TIP_CLASS_NOT_START
                    });
                    return;
                }
                if (store.get('class.speakState') == config.SPEAK_STATE_LIMIT) {
                    tip({
                        content: language.TIP_SPEAK_LIMIT
                    });
                    return;
                }
                // 获取我的播放器
                var player = BJY.Player.instances[BJY.store.get('user.id')];
                // 设置摄像头设备
                BJY.userPublish.setDevice(player, !player.videoOn);
            }
        });

        if (auth.isTeacher() || auth.isAssistant()) {
            createStartButton(element.find('#menu-start-class'));
            createRecord(element.find('#menu-record'));
            createShareScreen(element.find('#menu-share-screen'));
            createRollCall(element.find('#menu-roll-call'));
            createAnswerMachine(element.find('#menu-answer'));
        } else {
            element.find('#menu-start-class').remove();
            element.find('#menu-record').remove();
            //element.find('#menu-share-screen').remove();
            createShareScreen(element.find('#menu-share-screen'));
            element.find('#menu-roll-call').remove();
            element.find('#menu-answer').remove();
            rollCallStudent();
            createAnswerMachine();
        }

        // 创建全屏按钮
        var fullscreenElement = element.find('#menu-fullscreen');
        fullscreenElement
            .text(
                language.FULLSCREEN_ENTER_TRIGGER
            ).on(
                'click',
                function() {
                    if (store.get('fullscreen')) {
                        eventEmitter.trigger(eventEmitter.FULLSCREEN_EXIT_TRIGGER);
                        fullscreenElement.text(language.BUTTON_CONTENT_FULLSCREEN);
                    }
                    else {
                        eventEmitter.trigger(eventEmitter.FULLSCREEN_ENTER_TRIGGER);
                        fullscreenElement.text(language.BUTTON_CONTENT_FULLSCREEN_EXIT);
                    }
                }
            );
    };
});
