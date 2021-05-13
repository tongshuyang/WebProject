/**
 * @function 上课按钮
 * @author zhaogaoxing
 */
define(function (require, exports) {
    var language = require('../language/main')();

    return function (element) {
        var record = BJY.Record.create({
            element: element,
            // 是否可以使用快捷键
            canUseHotKey: true,
            // 停止本地录制的快捷键
            stopLocalRecordHotKey: 'ctrl + s',
            // 是否可以云端录制
            canUseCloudRecord: true,
            // 是否可以本地录制（百家云客户端才可使用此功能）
            canUseLocalRecord: !BJY.browser.wechat && typeof window.cefQuery === 'function',
            // 开始云端录制回调
            // 如果需要用户自己选择长期课在已经存在一段录制的情况下是否开始新的录制，需要像以下的方式传入此回调函数，否则默认会继续上一段录制
            onStartCloudRecord: function (deferred) {
                // 长期课程如果已经存在一段录制，需要确认"继续录制"或者"开始新的录制"
                // 如果需要确认才会有deferred参数传入，因此需要先判断是否有Promise需要被处理
                if (deferred) {
                    // 注意：不论是否要开始新的录制，都需要resolve该Promise。返回0表示继续录制，1表示开始新的录制
                    if (confirm(language.CLOUD_RECORD_GENERATE_PLAYBACK_NOW)) {
                        deferred.resolve(1);
                    }
                    else {
                        deferred.resolve(0);
                    }
                }
            },
            // 开始本地录制回调，可以通过返回一个对象来指定本地录制的画面尺寸
            // 这个回调不是必需的，默认录制的尺寸为document.body的大小
            onStartLocalRecord: function () {
                return {
                    width: 500,
                    height: 300
                };
            },
            // 向用户确认是否立即生成回放
            // 这个回调不是必需的，默认为不立即生成回放
            onPlaybackGenerateConfirm: function (deferred) {
                if (confirm(language.CLOUD_RECORD_GENERATE_PLAYBACK_NOW)) {
                    deferred.resolve(1);
                }
                else {
                    deferred.resolve(0);
                }
            }
        });

        // 监听录制的异常情况给出提示
        record.on(
            'recordException',
            function (event, data) {
                var tips;

                switch (data.code) {
                    // 已过课程结束时间
                    case 1:
                        tips = language.TIP_CLOUD_RECORD_OVERTIME;
                        break;

                    // 还未上课
                    case 2:
                        tips = language.TIP_CLASS_NOT_START;
                        break;

                    // 正在生成回放
                    case 3:
                        tips = language.TIP_CLOUD_RECORD_END_PLAYBACK_START;
                        break;

                    // 存储空间为0
                    case 4:
                    // 存储空间不足
                    case 5:
                    // 已使用空间超过超额额度
                    case 10:
                        tips = language.TIP_NET_DISK_POOR;
                        break;

                    case 6:
                        tips = language.TIP_HTTP_REQUEST_ERROR;
                        break;

                    // 本地录制存储路径未选择
                    case 7:
                        tips = language.TIP_LOCAL_RECORD_PATH_NULL;
                        break;
                }

                tips && tip({
                    content: tips
                });
            }
        );
    }
});
