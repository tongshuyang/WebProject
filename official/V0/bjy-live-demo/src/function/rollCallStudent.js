/**
 * @function 点名
 * @author zhaogaoxing
 */
define(function (require, exports) {
    var eventEmitter = BJY.eventEmitter;

    var language = require('../language/main')();
    var createDialog = require('./createDialog');

    var dialog;

    return function () {
        eventEmitter.on(
            eventEmitter.ROLL_CALL, //老师发起了点名
            function (e, data) {
                dialog = createDialog({
                    title: language.BUTTON_ROLL_CALL,
                    width: 300,
                    height: 130,
                    hasMinimize: true,
                    afterHide: function () {
                        dialog = null;
                    }
                });
                var timeout = data.duration;
                var html = ''
                +   '<div class="call-text">'
                +       language.ROLL_CALL_STUDENT_RES
                +       timeout
                +       language.TIME_SECONED
                +   '</div>';

                var button = ''
                +   '<div class="actions">'
                +       '<div class="btn-confirm">'
                +           language.LABEL_CONFIRM
                +       '</div>'
                +   '</div>';

                dialog.find('.body').append(html).append(button);

                dialog.find('.btn-confirm').on('click', function (e) {
                    // 学生响应点名
                    eventEmitter.trigger(
                        eventEmitter.ROLL_CALL_RES
                    );
                    dialog.close();
                    tip({
                        content: language.ROLL_CALL_SUCCESS
                    });
                });

                var timer = setInterval(
                    function () {
                        if (timeout == 0) {
                            clearInterval(timer);
                            dialog.close();
                        }
                        dialog.find('.call-text').text(language.ROLL_CALL_STUDENT_RES + timeout + language.TIME_SECONED);
                        timeout--;
                    },
                    1000
                )
            }
        )
    }
});
