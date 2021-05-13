/**
 * @file 公告组件
 * @author kefeng
 */
define(function (require, exports) {
    
    exports.init = function (element) {
        notice = BJY.Notice.create({
            element: element.find('.notice-placeholder'),
            defaultContent: '公告栏空空的...'
        })
    }

});