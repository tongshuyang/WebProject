/**
 * @function 点名
 * @author zhaogaoxing
 */
define(function (require, exports) {
    var eventEmitter = BJY.eventEmitter;

    var language = require('../language/main')();
    var createDialog = require('./createDialog');

    var status = 0;
    var dialog;
    var timeout;
    var result;

    // 开始点名
    function templateBefore() {
        if (dialog) {
            dialog.close();
        }

        dialog = createDialog({
            title: language.BUTTON_ROLL_CALL,
            width: 300,
            height: 130,
            hasMinimize: true,
            afterHide: function () {
                dialog = null;
            }
        });

        var html = ''
        +   '<div class="call-text">'
        +       language.ROLL_CALL_STUDENT_TIME
        +       '<input id="call-time" type="text" value="30"/>'
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
            var value = dialog.find('#call-time').val();
            // 老师发起点名
            eventEmitter.trigger(
                eventEmitter.ROLL_CALL_TRIGGER,
                {
                    duration: parseInt(value)
                }
            );
        });
    }

    // 正在点名
    function templateCalling() {
        if (dialog) {
            dialog.close();
        }

        dialog = createDialog({
            title: language.BUTTON_ROLL_CALL,
            width: 300,
            height: 80,
            hasMinimize: true,
            afterHide: function () {
                dialog = null;
            }
        });

        var html = ''
        +   '<div class="call-text">'
        +       timeout
        +       language.ROLL_CALL_TEACHER_TIME
        +   '</div>';

        dialog.find('.body').append(html);
    }

    // 点名结果模块
    function templateAfter() {
        if (dialog) {
            dialog.close();
        }

        dialog = createDialog({
            title: language.TITLE_ROLL_CALL_RESULT,
            width: 500,
            height: 350,
            hasMinimize: true,
            afterHide: function () {
                dialog = null;
            }
        });

        var html = ''
        +   '<div class="content">'
        +   '<table class="call-result">'
        +       '<tr>'
        +           '<th width="25%">number</th>'
        +           '<th width="25%">id</th>'
        +           '<th width="25%">name</th>'
        +           '<th width="25%">status</th>'
        +       '</tr>'
        +   '</table>'
        +   '</div>';

        dialog.find('.body').append(html);

        dialog.find('.content').css('height', 260);

        var studentList = BJY.data.user.group().studentList;

        function getUserByNumber(number) {
            var user;
            $.each(
                studentList,
                function (index, item) {
                    if (item.number == number) {
                        user = item;
                        return false;
                    }
                }
            );
            return user;
        }

        $.each(
            result.ackList,
            function (index, item) {
                var user = getUserByNumber(item.number);
                if (!user) {
                    return true;
                }
                var html = ''
                +   '<tr>'
                +       '<td>'
                +           user.number
                +       '</td>'
                +       '<td>'
                +           user.id
                +       '</td>'
                +       '<td>'
                +           user.name
                +       '</td>'
                +       '<td>'
                +           language.ROLL_CALL_YES
                +       '</td>'
                +   '</tr>';

                dialog.find('.call-result').append(html);
            }
        );
        $.each(
            result.nackList,
            function (index, item) {
                var user = getUserByNumber(item.number);
                if (!user) {
                    return true;
                }
                var html = ''
                +   '<tr>'
                +       '<td>'
                +           user.number
                +       '</td>'
                +       '<td>'
                +           user.id
                +       '</td>'
                +       '<td>'
                +           user.name
                +       '</td>'
                +       '<td>'
                +           language.ROLL_CALL_NO
                +       '</td>'
                +   '</tr>';

                dialog.find('.call-result').append(html);
            }
        );

        var button = ''
        +   '<div class="actions">'
        +       '<div class="btn-confirm">'
        +           language.ROLL_CALL_AGAIN
        +       '</div>'
        +   '</div>';

        dialog.find('.body').append(button);

        dialog.find('.btn-confirm').on('click', function (e) {
            status = 0;
            templateBefore();
        });
    }

    eventEmitter
        .on(
            eventEmitter.ROLL_CALL_TRIGGER,
            function (e, data) {
                status = 1;
                timeout = data.duration;
                templateCalling();
                // 点名倒计时
                var timer = setInterval(
                    function () {
                        if (timeout == 0) {
                            clearInterval(timer);
                            status = 2;
                            // 点名结束
                            eventEmitter.trigger(
                                eventEmitter.ROLL_CALL_FINISH
                            );
                        }
                        if (dialog) {
                            dialog.find('.call-text').text(timeout + language.ROLL_CALL_TEACHER_TIME);
                        }
                        timeout--;
                    },
                    1000
                );
            }
        )
        .on(
            // 点名结果
            eventEmitter.ROLL_CALL_RESULT,
            function (e, data) {
                result = data;
                templateAfter();
            }
        );

    return function (element) {
        element.text(language.BUTTON_ROLL_CALL);

        element.on('click', function (e) {
            if (dialog) {
                dialog.show();
            }
            else {
                if (status == 0) {
                    templateBefore();
                }
                else if (status == 1){
                    templateCalling();
                }
                else {
                    templateAfter();
                }
            }
        });
    }
});
