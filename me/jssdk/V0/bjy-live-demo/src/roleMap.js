/**
 * @file 用户角色映射表
 * @author zhaogaoxing
 */
define(function (require, exports) {
    var userRoleMap = { };
    var config = BJY.config;

    userRoleMap[ config.ROLE_TYPE_TEACHER ] = {
        en: 'teacher',
        cn: '老师'
    };
    userRoleMap[ config.ROLE_TYPE_ASSISTANT ] = {
        en: 'assistant',
        cn: '助教'
    };
    userRoleMap[ config.ROLE_TYPE_STUDENT ] = {
        en: 'student',
        cn: '学生'
    };
    userRoleMap[ config.ROLE_TYPE_GUEST ] = {
        en: 'guest',
        cn: '游客'
    };
    return userRoleMap;
});