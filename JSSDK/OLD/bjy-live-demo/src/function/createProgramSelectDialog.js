/**
 * @file dialog
 * @author zhaogaoxing
 */
define(function (require, exports) {
    var createDialog = require('./createDialog');
    var language = require('../language/main')();
    var eventEmitter = BJY.eventEmitter;

    function ProgramSelectDialog(options) {
        $.extend(this, options);
        this.init();
    }

    ProgramSelectDialog.prototype = {
        constructor: ProgramSelectDialog,
        init: function () {
            var me = this;

            var dialog = createDialog({
                title: language.DIALOG_TITLE_PROGRAM,
                width: 300,
                height: 350,
                hasMinimize: false,
                afterHide: function () {
                    dialog = null;
                }
            });

            var list = $('<ul class="list"></ul>');

            $.each(
                me.list,
                function (index, program) {
                    var li = ''
                    +   '<li class="program-select-dialog-name"  title="' + program.name + '" >'
                    +       '<label title="' + program.name + '">'
                    +           '<input name="program" value="' + program.name + '" type="radio"/>'
                    +           '<img class="program-select-img" src="data:image/jpg;base64,' + program.icon + '">'
                    +           program.name
                    +       '</label>'
                    +   '</li>';

                    li = $(li);
                    if (index === 0) {
                        li.find('input').attr('checked', true);
                    }
                    li.appendTo(list);
                }
            );
            var button = ''
            +   '<div class="actions">'
            +       '<div class="btn-confirm">'
            +           language.LABEL_CONFIRM
            +       '</div>'
            +   '</div>';

            list.css('height', dialog.find('.body').height() - 50);

            dialog.find('.body').append(list).append(button);

            dialog.find('.btn-confirm').on('click', function (e) {
                var value = dialog.find('input[name="program"]:checked').val();
                eventEmitter.trigger(
                    eventEmitter.SCREEN_SHARE_START_TRIGGER,
                    {
                        mode: me.mode,
                        program: value
                    }
                );
                dialog.close();
            });
        }
    }
    return ProgramSelectDialog;
});