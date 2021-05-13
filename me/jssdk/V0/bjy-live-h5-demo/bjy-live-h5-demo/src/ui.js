/**
 * @自定义的一些 UI
 * @author zhaogaoxing
 */
define(function (require, exports) {

    var tipElement;
    var tipMaskElement;
    var tipCloseTimer;
    var tipClosePromise;

    function killTip() {
        if (tipCloseTimer) {
            clearTimeout(tipCloseTimer);
            tipCloseTimer = null;
        }
        if (tipClosePromise) {
            tipClosePromise.resolve();
        }
        if (tipElement) {
            tipElement.remove();
        }
        if (tipMaskElement) {
            tipMaskElement.remove();
        }
    }

    /**
     * 提示
     *
     * @param {Object} options
     * @property {string} options.content
     * @property {string=} options.type 提示类型
     * @property {boolean=} options.modal 是否是模态
     * @property {delay=} options.duration 提示的持续时间，单位：毫秒
     * @return {Promise}
     */
    function tip(options) {

        killTip();

        tipClosePromise = $.Deferred();

        var defaultOptions = {
            modal: false,
            duration: 3000
        };
        options = $.extend(defaultOptions, options);

        var html = '<div class="tip">';
        if (options.type === 'success') {
            html += '<i class="icon-check-circle"></i>'
        }
        else if (options.type === 'error') {
            html += '<i class="icon-times-circle"></i>'
        }
        else if (options.type === 'loading') {
            html += '<div class="loader">'
                +     '<div class="loader-inner line-spin-fade-loader">'
                +          '<div></div>'
                +          '<div></div>'
                +          '<div></div>'
                +          '<div></div>'
                +          '<div></div>'
                +          '<div></div>'
                +          '<div></div>'
                +          '<div></div>'
                +     '</div>'
                + '</div>';
        }

        html += '<div class="text">'
              +     options.content
              + '</div>'
              + '</div>';

        tipElement = $(html).appendTo('#main');

        // 添加遮罩
        if (options.modal) {
            tipMaskElement = $('<div class="mask"></div>');

            var zIndex = tipElement.css('z-index');
            if (!$.isNumeric(zIndex)) {
                zIndex = 'auto';
            }

            tipMaskElement.css('z-index', zIndex);
            tipElement.before(tipMaskElement);
        }
        else {
            tipElement.on('click', killTip);
        }

        tipCloseTimer = setTimeout(
            killTip,
            options.duration
        );

        return tipClosePromise;

    }
    exports.init = function () {
        window.tip = tip;
    };
});