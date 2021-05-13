define(function (require, exports) {
    exports.init = function (element) {
        var barrage = new BJY.Barrage({
            // 组件父容器
            container: element,
            // 移动速度，每秒移动多少个像素
            speed: 100,
            // 最长可显示多少个字，超过这个字数的会过滤
            maxLength: 20,
            // 在 top - bottom 的区间出现弹幕
            top: 30,
            bottom: 30,
            // 轨道高度
            trackHeight: 30,
            // 是否只显示文本消息
            textOnly: false,
            // 如果需要自定义弹幕内容，可实现此方法
            renderContent: function (data) {
            return data.content
            }
        });
        return barrage;
    }
})