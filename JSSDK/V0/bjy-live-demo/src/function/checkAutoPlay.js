/**
 * chrome需要有用户交互才能自动播放，增加蒙层交互
 */
define(function (require, exports) {

    'use strict';

    return function (callback) {

        var maskElement;
        var buttonElement;

        function createElement() {
            maskElement = $('<div class="auto-play-mask"></div>');
            buttonElement = $(''
                +                 '<div class="auto-play-dialog">'
                +                     '<div class="title">正在进入教室。。。</div>'
                +                      '<div class="ok">确认</div>'
                +                 '</div>'
            );
            var main = $('body');
            main.append(maskElement);
            maskElement.append(buttonElement);
            buttonElement.on('click', '.ok', function () {
                if (maskElement) {
                    maskElement.remove();
                    maskElement = null;
                }
                if (buttonElement) {
                    buttonElement.remove();
                    buttonElement = null;
                }
                if (callback) {
                    callback();
                }
            });
        }

        createElement();
    };

});