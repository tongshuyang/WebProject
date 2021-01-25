/**
 * @file 进度条
 * @author zhaogaoxing
 */
define(function (require, exports) {
    var eventEmitter = BJY.eventEmitter;

    exports.init = function () {

        var loading = BJY.playback.Loading.create({
            // 父容器
            element: $('#loading .placeholder'),
            // logo URL 可自定义自己的加载 logo
            logoUrl: 'https://img.baijiayun.com/0baijiacloud/logo/ydzb/v5/www-loading.png',
            onComplete: function () {
                loading.destroy();
                $('#loading').remove();
                $('#main').css('opacity', 1);
            }
        });
    };
});