/**
 * @function 屏幕分享按钮
 * @author yikai
 */
define(function(require, exports) {
    var is = BJY.is;
    var auth = BJY.auth;
    var eventEmitter = BJY.eventEmitter;

    var language = require('../language/main')();
    var createProgramDialog = require('./createProgramSelectDialog');

    /**
     * 可以分享条件校验
     *
     * @returns {boolean}
     */
    function checkCondition() {
        if (!auth.isClassStarted() || !auth.canShareScreen()) {
            tip({
                content: language.TIP_CLASS_NOT_START
            });
            return false;
        }

        if (!auth.canSpeak()) {
            tip({
                content: language.TIP_SPEAK_LIMIT
            });
            return false;
        }

        return true;
    }

    return function(element) {
        var textElement = element.find('.bjy-label');
        if (auth.isWebRTC()) {
            var isScreenSharing = false;

            textElement.text(language.BUTTON_SCREEN_START);

            eventEmitter.on(
                eventEmitter.ASSIST_MEDIA_PUBLISH,
                function(event, data) {
                    if (is.mediaMainScreenShare(data.mediaId)) {
                        if (data.videoOn) {
                            isScreenSharing = true;
                            textElement.text(language.BUTTON_SCREEN_STOP);
                        } else {
                            isScreenSharing = false;
                            textElement.text(language.BUTTON_SCREEN_START);
                        }
                    }
                }
            );

            element.click(function() {
                if (isScreenSharing) {
                    eventEmitter.trigger(
                        eventEmitter.SCREEN_SHARE_STOP_TRIGGER
                    );
                } else {
                    checkCondition() && BJY.ScreenShareExtensionWebrtc.start(function(data) {
                        tip({
                            content: data.msg
                        });
                    });
                }
            });
        }
        else {
            var onProgramClick;

            if (auth.canProgramShareDesktop()) {
                onProgramClick = function (mode, list) {
                    if (checkCondition()) {
                        new createProgramDialog({
                            list: list,
                            mode: mode
                        });
                    }
                };
            }

            BJY.ScreenShareMenu.create({
                element: element,
                onFullScreenClick: function (mode) {
                    if (checkCondition()) {
                        eventEmitter.trigger(
                            eventEmitter.SCREEN_SHARE_START_TRIGGER,
                            {
                                mode: mode
                            }
                        );
                    }
                },
                onPartClick: function (mode) {
                    if (checkCondition()) {
                        eventEmitter.trigger(
                            eventEmitter.SCREEN_SHARE_START_TRIGGER,
                            {
                                mode: mode
                            }
                        );
                    }
                },
                onProgramClick: onProgramClick,
                onStopClick: function () {
                    eventEmitter.trigger(
                        eventEmitter.SCREEN_SHARE_STOP_TRIGGER
                    );
                }
            });
        }
    }
});
