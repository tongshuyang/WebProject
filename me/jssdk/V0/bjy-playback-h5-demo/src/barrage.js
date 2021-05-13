/**
 * @file 弹幕面板
 * @author dujianhao
 */
define(function (require, exports) {
    var eventEmitter = BJY.eventEmitter;
    var barrage;
    exports.init = function (element) {
        barrage = new BJY.Barrage({
            container: element.find('#barrage'),
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
                return data.content;
            }
        });

        var statusElement = element.find('.status');
        var btnOpen = element.find('#btn-open');
        var btnClose = element.find('#btn-close');
        var btnSend = element.find('#btn-send');

        function openBarrage() {
            barrage.open();
            statusElement.html('开').addClass('badge-success');
            btnOpen.attr('disabled', 'true');
            btnClose.removeAttr('disabled');
            btnSend.removeAttr('disabled');
        }

        function closeBarrage() {
            barrage.close();
            statusElement.html('关').removeClass('badge-success');
            btnClose.attr('disabled','true');
            btnSend.attr('disabled','true');
            btnOpen.removeAttr('disabled');
        }

        // 弹幕按钮事件
        btnOpen.on('click', function () {
            openBarrage();
        });
        btnClose.on('click', function () {
            closeBarrage();
        });

        openBarrage();

        eventEmitter
            .on(
                eventEmitter.PLAYBACK_SEEK_START,
                function () {
                     barrage.close();;
                }
            )
            .on(
                eventEmitter.PLAYBACK_SEEK_END,
                function () {
                     barrage.open();;
                }
            )
    };
});