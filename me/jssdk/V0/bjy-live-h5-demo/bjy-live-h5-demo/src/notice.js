define(function(require, exports) {
    var eventEmitter = BJY.eventEmitter;
    exports.init = function (element) {
        var notice = BJY.Notice.create({
            element: element.find('#notice .placeholder'), // 父容器
            replace: true,
            defaultContent: '这里是公告栏，快来写点东西吧~', // 默认无公告时显示文本
            maxLength: 140, // 公告文本最大长度
            foldDefault: true,  // 公告是否默认折叠(默认折叠后新公告不会主动展开)
            onMaxLengthError: function () { // 超出最大长度回调
                alert('公告内容不能太长哦');
            }
        });
        // 向服务器拉取最新的公告
        eventEmitter.trigger(
            eventEmitter.NOTICE_REQ
        );
        return notice;
    }
})