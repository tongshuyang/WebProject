/**
 * @file 语言包
 * @author zhaogaoxing
 */
define(function (require, exports, module) {

    'use strict';

    exports.LABEL_CONFIRM = '确定';

    exports.TIME_SECONED = '秒';

    /**
     * =================================================
     * 用户角色
     * =================================================
     */
    exports.USER_ROLE_TEACHER = '老师';

    exports.USER_ROLE_STUDENT = '学生';

    exports.USER_ROLE_GUEST = '游客';

    exports.USER_ROLE_ASSISTANT = '助教';

    /**
     * =================================================
     * 底部主菜单栏
     * =================================================
     */
    exports.MAIN_MENU_CLASS_START = '上课';

    exports.MAIN_MENU_CLASS_END = '下课';

    exports.BUTTON_CONTENT_FULLSCREEN = '全屏';

    exports.BUTTON_CONTENT_FULLSCREEN_EXIT = '退出全屏';

    exports.BUTTON_ROLL_CALL = '点名';

    exports.BUTTON_SCREEN_START = '屏幕分享';

    exports.BUTTON_SCREEN_STOP = '结束分享';

    exports.BUTTON_ANSWER_MACHINE = '答题器';

    /**
     * =================================================
     * 上下课
     * =================================================
     */
    exports.CLASS_START = '上课';

    exports.CLASS_END = '下课';

    exports.DIALOG_TITLE_DOCUMENT = '课件管理';

    exports.DIALOG_TITLE_PROGRAM = '选择分享的程序';

    exports.BUTTON_CONTENT_DOCUMENT = '课件管理';

    exports.BUTTON_CONTENT_MY_DOCUMENT = '我的课件';

    exports.BUTTON_CONTENT_FULLSCREEN = '全屏';

    exports.BUTTON_CONTENT_FULLSCREEN_EXIT = '退出全屏';

    exports.BUTTON_ROLL_CALL = '点名';

    exports.ROLL_CALL_STUDENT_TIME = '请输入学生响应时间: ';

    exports.ROLL_CALL_TEACHER_TIME = '秒后查看点名结果';

    exports.ROLL_CALL_STUDENT_RES = '老师发起了点名，请点击确定，剩余: ';

    exports.ROLL_CALL_SUCCESS = '已签到';

    exports.ROLL_CALL_FINISH = '点名结束';

    exports.ROLL_CALL_RESULT = '查看结果';

    exports.ROLL_CALL_AGAIN = '再来一次';

    exports.TITLE_ROLL_CALL_RESULT = '点名结果';

    exports.ROLL_CALL_YES = '已签到';

    exports.ROLL_CALL_NO = '未签到';

    /**
     * =================================================
     * 提示对话框
     * =================================================
     */
    exports.ROOM_SERVER_CONNECT_FAIL = '网络已断开，请检查网络连接或者刷新页面重新进入房间';

    exports.LOGIN_CONFLICT = '你已被踢，请确认用户 number 是否唯一或者刷新页面重新进入房间';

    exports.CLOUD_RECORD_START_NEW = '是否开始新的录制？';

    exports.CLOUD_RECORD_GENERATE_PLAYBACK_NOW = '是否立即生成回放？';

    /**
     * =================================================
     * 普通提示
     * =================================================
     */
    exports.TIP_CLASS_START = '已上课';

    exports.TIP_CLASS_END = '已下课';

    exports.TIP_CLASS_NOT_START = '课程未开始';

    exports.TIP_SPEAK_LIMIT = '发言请先举手';

    exports.TIP_SPEAK_APPLY_TIMEOUT = '老师未做响应，已自动取消申请发言';

    exports.TIP_SPEAK_APPLY_REJECT = '老师拒绝了你的发言申请';

    exports.TIP_SPEAK_APPLY_ACCEPT = '老师已允许你发言';

    exports.TIP_CLOUD_RECORD_OVERTIME = '已过直播结束时间，不可开启云端录制';

    exports.TIP_CLOUD_RECORD_END_PLAYBACK_START = '正在生成回放，无法继续使用云端录制';

    exports.TIP_NET_DISK_POOR = '存储空间不足';

    exports.TIP_HTTP_REQUEST_ERROR = '网络请求失败, 请检查网络';

    exports.TIP_LOCAL_RECORD_PATH_NULL = '请选择本地存放视频路径';

});
