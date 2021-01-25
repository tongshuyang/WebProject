/**
 * @file 白板
 * @author zhaogaoxing
 */
define(function (require, exports) {
    var layout = require('./function/layout');
    var eventEmitter = BJY.eventEmitter;
    var pageData = BJY.data.page;

    exports.init = function (element) {
        // 文档白板
        // 替换为新白板
        BJY.newWhiteboard.init({
            element: element.find('#whiteboard .placeholder'),
            noLoading: true,
            fit: 1 // 1 自适应  2 撑满容器
        });

        eventEmitter
            .on(
                eventEmitter.WHITEBOARD_LAYOUT_CHANGE,
                function (e, data) {
                    // 重新设置白板的高度并让其居中
                    layout();
                }
            )
            .on(
                eventEmitter.DOC_IMAGE_LOAD_START,
                function () {
                    console.log('翻页开始');
                }
            )
            .on(
                eventEmitter.DOC_IMAGE_LOAD_END,
                function () {
                    console.log('翻页结束');
                }
            );
    };
});