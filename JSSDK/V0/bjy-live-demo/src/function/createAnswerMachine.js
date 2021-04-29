/**
 * @file 创建答题器
 */
define(function (require, exports) {

    'use strict';

    var eventEmitter = BJY.eventEmitter;
    var AnswerStudent = BJY.AnswerStudent;
    var AnswerTeacher = BJY.AnswerTeacher;

    var language = require('../language/main')();

    return function (triggerElement) {
        var placeholder = $('<div class="answer-machine"></div>').appendTo('#main').hide();

        if (triggerElement) {
            AnswerTeacher.init({
                element: placeholder[0],
                // 点击答题器最小化按钮时触发的回调
                onHide: function () {
                    placeholder.hide();
                },
                // 点击关闭按钮时触发的回调
                onClose: function () {
                    placeholder.hide();
                }
            });

            triggerElement.text(
                language.BUTTON_ANSWER_MACHINE
            ).on(
                'click',
                function () {
                    placeholder.toggle();
                }
            );
        }
        else {
            AnswerStudent.init();
            eventEmitter
                .on(
                    eventEmitter.START_ANSWER,
                    function (event, data) {
                        AnswerStudent.open(
                            $.extend(
                                {
                                    element: placeholder[0],
                                    // 是否在提交之后关闭，默认为false
                                    autoCloseAfterSubmit: true,
                                    // 组件内部不提供UI隐藏，由外层隐藏
                                    onClose: function () {
                                        // 隐藏元素
                                        placeholder.hide();
                                    }
                                },
                                data
                            )
                        );

                        // 显示占位元素
                        placeholder.show();
                    }
                )
                .on(
                    eventEmitter.END_ANSWER,
                    function () {

                    }
                );
        }
    };
});
