/**
 * @file 用户面板
 * @author dujianhao
 */
define(function (require, exports) {
    var userRoleMap = require('./roleMap');
    var eventEmitter = BJY.eventEmitter;
    var extension = typeof window.cefQuery === 'function' ? BJY.cef : BJY.Player.flash;

    exports.init = function (element) {
        // 加载直播需要的各种组件，包括播放器，白板，用户列表等等
        var userList = BJY.UserList.create({
            element: element.find('#user-list .placeholder'),
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
                    localRole: userRoleMap[user.type].cn
                }
            }
        });
    };
});