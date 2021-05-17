/**
 * @file 白板
 * @author zhaogaoxing
 */
define(function (require, exports) {
    var eventEmitter = BJY.eventEmitter;
    var pageData = BJY.data.page;

    var canPrePage = false;
    var canNextPage = false;
    var isFull = false;

    function setPageAuth() {
        var prePage = $('.icon-chevron-left');
        var nextPage = $('.icon-chevron-right');
        if (canPrePage) {
            prePage.addClass('has-page');
        }
        else {
            prePage.removeClass('has-page');
        }
        if (canNextPage) {
            nextPage.addClass('has-page');
        }
        else {
            nextPage.removeClass('has-page');
        }
    }

    function toggleWhiteboardFull () {
        var dom = document.getElementById('whiteboard')
        isFull ? exitFullScreen() : fullScreen(dom)
        isFull = !isFull;
    }
    function fullScreen (dom) {
        $('.doc-full-screen .icon').removeClass('icon-expand').addClass('icon-shrink');
        if (dom.requestFullscreen) {
          return dom.requestFullscreen()
        } else if (dom.webkitRequestFullScreen) {
          return dom.webkitRequestFullScreen()
        } else if (dom.mozRequestFullScreen) {
          return dom.mozRequestFullScreen()
        } else {
          return dom.msRequestFullscreen()
        }
    }
    function exitFullScreen () {
        $('.doc-full-screen .icon').removeClass('icon-shrink').addClass('icon-expand');
        var dom = document
        if (dom.exitFullscreen) {
          dom.exitFullscreen()
        } else if (dom.webkitExitFullscreen) {
          return dom.webkitExitFullScreen()
        } else if (dom.mozRequestFullscreen) {
          return dom.mozExitFullscreen()
        } else {
          return dom.msExitFullscreen()
        }
    }

    exports.init = function (element) {
        // 文档白板
        BJY.Whiteboard.create({
            element: element.find('#whiteboard .placeholder'),
            fit: 1 // 1 自适应  2 撑满容器
        });

        canPrePage = pageData.getClientPage() > 0 ? true : false;
        canNextPage = pageData.getClientPage() < pageData.getMaxPage ? true : false;

        setPageAuth();

        // 白板工具事件
        element.find('.pre-page').on('click', function () {
            if (canPrePage) {
                eventEmitter.trigger(
                    eventEmitter.PAGE_PREV_TRIGGER
                );
            }
        });
        element.find('.next-page').on('click', function () {
            if (canNextPage) {
                eventEmitter.trigger(
                    eventEmitter.PAGE_NEXT_TRIGGER
                );
            }
        });
        element.find('.doc-full-screen').on('click', function () {
            toggleWhiteboardFull();
        });

        eventEmitter
            .on(
                eventEmitter.WHITEBOARD_LAYOUT_CHANGE,
                function (e, data) {
                    // 重新设置白板的高度并让其居中
                }
            )
            .on(
                eventEmitter.PAGE_CHANGE_END,
                function (e, data) {
                    var currentPage = pageData.getClientPage();
                    var maxPage = pageData.getMaxPage();

                    if (currentPage > 0) {
                        canPrePage = true;
                    }
                    else {
                        canPrePage = false;
                    }
                    if (currentPage < maxPage) {
                        canNextPage = true;
                    }
                    else {
                        canNextPage = false;
                    }
                    setPageAuth();
                }
            );
            ;
    };
});
