/**
 * @file 用户面板
 * @author zhaogaoxing
 */
define(function (require, exports) {
    var userRoleMap = require('./roleMap');
    var eventEmitter = BJY.eventEmitter;
    var auth = BJY.auth;
    var userData = BJY.data.user;
    var getExtension = BJY.getExtension;

    exports.init = function (element) {
        // 加载直播需要的各种组件，包括播放器，白板，用户列表等等
        BJY.UserList.create({
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

       

        var activeList = BJY.ActiveList.create({
            element: element.find('#action-list .action .placeholder'), // 父容器
            extension: getExtension(),  // 播放器扩展
            width: 260, // 父容器宽度，用于计算播放器的高度
            replace: true, // 是否替换父容器下的 DOM
        });

        activeList.watch('userList.length', function (newValue, oldValue) {
            if (newValue != 0) {
                $('#action-list').removeClass('empty');
            }
            else {
                $('#action-list').addClass('empty');
            }
        });

        if (auth.isTeacher() || auth.isAssistant()) {
            var applyList = BJY.ApplyList.create({
                element: element.find('#action-list .apply .placeholder'), // 组件父容器
                replace: true,  // 是否替换父容器下的 DOM
            });

            applyList.watch('userList.length',function (newValue, oldValue) {
                var element = $('#btn-action-list');
                if (!element.hasClass('tab-select')) {
                    element.addClass('has-new');
                }
            });
        }

         // 监听人数变化
        eventEmitter
            .on(
                eventEmitter.USER_COUNT_CHANGE,
                function (e, data) {
                    element.find('.user-count').text('(' + data.userCount + ')');
                }
            )
            .on(
                eventEmitter.ACTIVE_LIST_PRESENTER_CHANGE_TRIGGER,
                function (event, data) {
                    activeList.changePresenter(data.newPresenter, data.oldPresenter);
                }
            );

    };
});
