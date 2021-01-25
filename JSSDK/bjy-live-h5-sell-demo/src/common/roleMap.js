/**
 * @file 用户角色映射表
 * @author xuwei
 */
var userRoleMap = {};
var config = BJY.config;

userRoleMap[config.ROLE_TYPE_TEACHER] = {
    en: "teacher",
    cn: "主播"
};
userRoleMap[config.ROLE_TYPE_ASSISTANT] = {
    en: "assistant",
    cn: "管理"
};
userRoleMap[config.ROLE_TYPE_STUDENT] = {
    en: "student",
    cn: "观众"
};
userRoleMap[config.ROLE_TYPE_GUEST] = {
    en: "guest",
    cn: "观众"
};

export default userRoleMap;
