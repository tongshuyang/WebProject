/**
 * @file dialog
 * @author zhaogaoxing
 */
define(function (require, exports) {

    return function (options) {
        var html = ''
        +   '<div class="dialog">'
        +       '<div class="header">'
        +           '<div class="title">' + options.title +'</div>'
        +           '<div class="minimize">'
        +               '<i>_</i>'
        +           '</div>'
        +           '<div class="close">'
        +               '<i>X</i>'
        +           '</div>'
        +       '</div>'
        +       '<div class="body"></div>'
        +   '</div>';

        var defaultOptions = {
            title: '',
            width: 200,
            height: 200,
            hasMinimize: true
        };

        options = $.extend(defaultOptions, options);

        var dialog = $(html).appendTo($('#main'));

        dialog.css({
            width: options.width,
            height: options.height
        });

        if (!options.hasMinimize) {
            dialog.find('.minimize').remove();
        }

        dialog.find('.body').css('height', options.height - 30);

        dialog.show = function () {
            dialog.removeClass('dialog-hide');
        };

        dialog.hide = function () {
            dialog.addClass('dialog-hide');
        };

        dialog.close = function () {
            dialog.remove();
        };

        dialog.on('click', '.close', function () {
            dialog.close();
            if (options.afterHide) {
                options.afterHide();
            }
        });

        dialog.on('click', '.minimize', function () {
            dialog.hide();
        });

        return dialog;
    };
});
