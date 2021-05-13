/**
 * @file 权限
 * @author zhaogaoxing
 */
define(function (require, exports) {
    var os = BJY.os;
    var auth = BJY.auth;
    var store = BJY.store;
    var config = BJY.config;

    /**
     * 是否正在上课
     *
     * @return {boolean}
     */
    auth.isClassStarted = function () {
        return store.get('class.started');
    };

    /**
     * 是否可以发言
     *
     * @return {boolean}
     */
    auth.canSpeak = function () {
        return store.get('class.speakState') != config.SPEAK_STATE_LIMIT;
    };

    /**
     * 是否是 1 对 1 的课
     *
     * @return {boolean}
     */
    auth.isOneToOne = function (type) {
        if (!type) {
            type = store.get('class.type');
        }
        return type == config.CLASS_ONE_TO_ONE;
    };

    /**
     * 是否是大班课
     *
     * @return {boolean}
     */
    auth.isOneToMany = function (type) {
        if (!type) {
            type = store.get('class.type');
        }
        return type == config.CLASS_ONE_TO_MANY;
    };

    /**
     * 是否是小班课
     *
     * @return {boolean}
     */
    auth.isMini = function (type) {
        if (!type) {
            type = store.get('class.type');
        }
        return type == config.CLASS_MINI;
    };

    /**
     * 是否在客户端
     *
     * @return {boolean}
     */
    auth.inClient = function () {
        return typeof window.cefQuery !== 'undefined';
    };

    /**
     * 是否在 Windows
     *
     * @return {boolean}
     */
    auth.inWindows = function () {
        return os.windows;
    };

    /**
     * 是否在 MAC
     *
     * @return {boolean}
     */
    auth.inMac = function () {
        return os.mac;
    };

    /**
     * 是否是flash特定版本，需要兼容
     *
     * @return {boolean}
     */
    auth.isChromeSpecialVersion = function () {
        return BJY.browser.chrome && BJY.browser.version >= '60.0.0';
    };

    /**
     * 是否可以屏幕分享
     *
     * @return {boolean}
     */
    auth.canShareScreen = function () {
        return store.get('class.mediaType') !== config.MEDIA_TYPE_AUDIO
            && (auth.inClient() || auth.isWebRTC());
    };

    /**
     * 是否可以程序分享
     *
     * @return {boolean}
     */
    auth.canProgramShareDesktop = function () {
        return auth.inClient() && store.get('cefVersion') >= '6.3.0';
    };

    auth.canUseDoubleCamera = function () {
        return false;
    };
});
