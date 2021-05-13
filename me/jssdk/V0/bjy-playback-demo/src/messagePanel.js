/**
 * @file 消息面板
 * @author zhaogaoxing
 */
define(function (require, exports) {
    var userRoleMap = require('./roleMap');
    var eventEmitter = BJY.eventEmitter;

    exports.init = function (element) {
        // 创建消息列表
        messageList = BJY.MessageList.create({
            element: element.find('#message-list .placeholder'),
            renderEmoji: function (name, url) {
                if (BJY.isAlicloudImage(url)) {
                    return '<img ondragstart="return false" src="'
                        + (url + '@100w_1e_1l.png')
                        + '" srcset="'
                        + (url + '@200w_1e_1l.png')
                        + ' 2x">';
                }
                return '<img ondragstart="return false" src="' + url + '">';
            },
            renderImage: function (url) {
                if (BJY.isAlicloudImage(url)) {
                    return '<img ondragstart="return false" src="'
                        + (url + '@100w_1e_1l.png')
                        + '" srcset="'
                        + (url + '@200w_1e_1l.png')
                        + ' 2x">';
                }
                return '<img ondragstart="return false" src="' + url + '">';
            },
            renderUser: function (user, width, height) {
                return {
                    id: user.id,
                    name: user.name,
                    number: user.number,
                    // 头像需压缩
                    avatar: BJY.compressImage({
                        url: user.avatar,
                        width: width,
                        height: height
                    }),
                    avatar2x: BJY.compressImage({
                        url: user.avatar,
                        width: width * 2,
                        height: height * 2
                    }),
                    // 根据用户类型，配置角色的英文和本地语言
                    role: userRoleMap[user.type].en,
                    localRole: userRoleMap[user.type].cn,
                }
            },
            loadDistance: 0
        });
    };
});