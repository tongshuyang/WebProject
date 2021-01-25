define(function(require, exports) {
    exports.init = function (element, menuClass) {
        var statusMap = {
            '弹幕关': 'icon-barrage-off',
            '弹幕开': 'icon-barrage-on'
        };
        // 调用 create 方法创建弹幕组件
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
                return data.content;
            }
        });

        function toggleStatus (status) {
            if (status === '弹幕关') {
                barrage.open();
                return '弹幕开';
            }
            else {
                barrage.close();
                return '弹幕关';
            }
        }

        var menuButton = element.find(menuClass);
        menuButton.off('click').on('click', function () {
            var status = menuButton.find('.bjy-label').text();
            var iconClass = statusMap[status];
            
            var newStatus = toggleStatus(status);
            menuButton.find('.bjy-label').text(newStatus);
            menuButton.find('.icon').removeClass(iconClass).addClass(statusMap[newStatus]);
        });
    }
})