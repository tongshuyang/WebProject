/**
 * @file 文档
 * @author zhaogaoxing
 */
define(function (require, exports) {
    var createDialog = require('./function/createDialog');
    var language = require('./language/main')();
    var dialog;
    var MAXSIZE = 1000000 * 10;

    function openDocument() {
        if (dialog) {
            dialog.show();
        }
        else {
            dialog = createDialog({
                title: language.DIALOG_TITLE_DOCUMENT,
                width: 700,
                height: 450,
                afterHide: function () {
                    dialog = null;
                }
            });
            BJY.DocumentManage.create({
                // 父容器
                element: dialog.find('.body'),
                // 文档操作按钮是图标还是文字
                needIconButton: false,
                // 上传文件最大字节
                maxSize: MAXSIZE,
                // 上传失败回调
                onFileUploadFail: function (data) {
                    // data.isPPT 上传的文件是否是 PPT
                    tip({
                        content: '上传失败'
                    });
                },
                // 文件大小错误
                onFileSizeError: function (data) {
                    // data.isPPT 上传的文件是否是 PPT
                    tip({
                        content: '上传文件太大'
                    });
                },
                // 文件类型错误
                onFileTypeError: function (data) {
                    // data.isPPT 上传的文件是否是 PPT
                    tip({
                        content: '文件类型错误'
                    });
                },
                // 文件名错误
                onFileNameError: function (data) {
                    // data.isPPT 上传的文件是否是 PPT
                    tip({
                        content: '文件名错误'
                    });
                },
                // // 点击文件 item 回调
                // onFileItemClick: function (data) {
                //     // data.index  文档在列表中的索引
                //     // data.doc 文档对象
                // },
                // // 删除文档回调
                // onDocDeleteClick: function () {
                //     // data.index  文档在列表中的索引
                //     // data.doc 文档对象
                // }
            });
        }
    }

    exports.init = function (element) {

        var html = ''
        +    '<div class="side-bar">'
        +       '<div class="catalogue">'
        +           '<div class="placeholder"></div>'
        +       '</div>'
        +       '<div class="document">' + language.BUTTON_CONTENT_DOCUMENT + '</div>'
        +       '<div class="fold-btn">' + language.BUTTON_CONTENT_MY_DOCUMENT + '</div>'
        +   '</div>';

        element = $(html).appendTo(element);

        element.on('click', '.document', function () {
            openDocument(element);
        });

        BJY.Catalogue.create({
            element: element.find('.catalogue .placeholder'),
            thumbnailWidth: 100,
            classify: true
        });

        element.on('click', '.fold-btn', function (e) {
            var button = element.find('.fold-btn');
            if (button.hasClass('folded')) {
                element.css('right', 0);
                button.removeClass('folded');
            }
            else {
                element.css('right', -1 * element.width());
                button.addClass('folded');
            }
        });
    };
});
