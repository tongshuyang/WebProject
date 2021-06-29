/**
 * @file 自定义配置
 * @author zhaogaoxing
 */
define(function (require, exports) {
    var config = BJY.config;

    // config.xxx = xxx;

    /**
     * 1 对 1 的课
     */
    config.CLASS_ONE_TO_ONE = 1;

    /**
     * 大班课
     */
    config.CLASS_ONE_TO_MANY = 2;

    /**
     * 小班课
     */
    config.CLASS_MINI = 3;

});