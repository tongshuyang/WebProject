/**
 * @file 白板
 * @author dujianhao
 */
define(function (require, exports) {
    var layout = require('./function/layout');
    var eventEmitter = BJY.eventEmitter;

    var isFullScreen = false;

    // 自适应
    var DOC_FIT_VIEW = 1;
    // 撑满容器
    var DOC_FIT_WIDTH = 2;

    exports.init = function (element) {
        // 文档白板
        // 替换为新白板
        BJY.newWhiteboard.init({
            element: element.find('#whiteboard .placeholder'),
            noLoading: true,
            fit: DOC_FIT_VIEW
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
        var toggleBtn = element.find('#fullscreen-btn');

        function toggleFullScreen () {
            var container = $(document.body);
            if (isFullScreen) {
                toggleBtn.text('全屏');
                container.removeClass('whiteboard-fullscreen');

                setTimeout(function () {
                    eventEmitter.trigger(
                        eventEmitter.DOC_FIT_CHANGE_TRIGGER,
                        {
                            value: DOC_FIT_WIDTH,
                        }
                    );
                }, 50);
            }
            else {
                toggleBtn.text('退出全屏');
                container.addClass('whiteboard-fullscreen');

                setTimeout(function () {
                    eventEmitter.trigger(
                        eventEmitter.DOC_FIT_CHANGE_TRIGGER,
                        {
                            value: DOC_FIT_VIEW,
                        }
                    );
                }, 50);
            }
            isFullScreen = !isFullScreen;
        }

        // 白板全屏按钮事件
        toggleBtn.on('click', function () {
            toggleFullScreen();
        });
    };
});
