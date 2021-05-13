/**
 * @file 更新布局
 * @author zhaogaoxing
 */
define(function (require) {
    var isIOS = function () {
        var u = navigator.userAgent;
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    }
    return isIOS;
});