/**
 * @file 进度条
 * @author zhaogaoxing
 */
define(function (require, exports) {
    var eventEmitter = BJY.eventEmitter;

    exports.init = function () {

        var loading = BJY.Loading.create({
            // 父容器
            element: $('#loading .placeholder'),
            // logo URL 可自定义自己的加载 logo
            logoUrl: 'https://img.baijiayun.com/0baijiacloud/logo/ydzb/v5/www-loading.png'
        });

        eventEmitter
            // 监听 loading 开始加载事件， one() 函数表示事件只处理一次，若需要一直监听请使用 on() 函数
            .one(
                eventEmitter.LOADING_PANEL_START,
                function (event, data) {
                    // loading 开始加载时要做的事情
                }
            )
            // 监听 loading 结束加载事件
            .one(
                eventEmitter.LOADING_PANEL_END,
                function (event, data) {
                    // loading 结束加载时要做的事情

                    // 销毁 Loading 对象，可在此销毁进度条，若此时直播尚未开始，可以先进入倒计时等待页面，直到接收到事件 eventEmitter.VIEW_RENDER_TRIGGER
                    loading.destroy();
                    $('#loading').remove();
                    $('#main').css('opacity', 1);
                }
            );
    };
});