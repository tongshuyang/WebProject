/**
 * @file 播放器面板
 * @author zhaogaoxing
 */
define(function (require, exports) {
    var auth = BJY.auth;
    var store = BJY.store;
    var userData = BJY.data.user;
    var eventEmitter = BJY.eventEmitter;

    var myPlayer;
    var teacherPlayer;
    var foldHandler;

    function createMyPlayer(element) {
        var list = element.find('.list-section');
        myPlayer = BJY.DefaultThemePlayer.create({
            element: element.find('#live-self-player .placeholder'),
            user: store.get('user'),
            extension: BJY.getExtension(),
            canFold: true,
            replace: false,
            canSwitchCamera: true,
            canSwitchMic: true,
            onComplete: function () {

            }
        });
        list.addClass('has-my-player');

        foldHandler = function (isFolded) {
            var element = $('#live-self-player');
            if (isFolded) {
                //执行折叠
                element.addClass('folded');
                list.removeClass('has-my-player');
            }
            else {
                // 执行展开
                element.removeClass('folded');
                list.addClass('has-my-player');
            }
        };

        myPlayer.watch('isFolded', foldHandler);
    }

    function createTeacherPlayer(element) {
        var teacher;
        if (auth.isTeacher()) {
            // 如果当前用户是老师
            teacher = store.get('user');
        }
        else {
            teacher = store.get('teacher');
        }
        if (!teacher) {
            teacher = {
                type: 1
            };
        }

        teacherPlayer = BJY.DefaultThemePlayer.create({
            element: element.find('#live-teacher-player .placeholder'),
            replace: false,
            user: store.get('presenter') || teacher,
            extension: BJY.getExtension(),
            canSwitchCamera: auth.isSelf(store.get('teacher.id')),
            canSwitchMic: auth.isSelf(store.get('teacher.id')),
            isWebRTCMix: true
        });
    }

    exports.init = function (element) {
        if (auth.isTeacher()) {
            // 老师只创建老师的播放器
            createTeacherPlayer(element);
        }
        else {
            // 学生和助教创建老师和自己的播放器
            createTeacherPlayer(element);
            createMyPlayer(element);
        }

        eventEmitter.on(
            eventEmitter.MEDIA_SWITCH_TRIGGER,
            function (event, data) {
                var player = BJY.Player.instances[store.get('user.id')];
                player && BJY.userPublish.setDevice(player, data.videoOn, data.audioOn);
            }
        );

        store.watch('presenterId',function(newPresenterId, oldPresenterId) {

            var newPresenter = userData.find(newPresenterId);
            var oldPresenter = userData.find(oldPresenterId);

             // 先处理发言列表
            eventEmitter.trigger(
                eventEmitter.ACTIVE_LIST_PRESENTER_CHANGE_TRIGGER,
                {
                    newPresenter: newPresenter,
                    oldPresenter: oldPresenter
                }
            );

            // 主讲播放器销毁重建，
            if (newPresenter) {
                if (teacherPlayer) {
                    teacherPlayer.destroy();
                    teacherPlayer = null;
                    createTeacherPlayer(element);
                }
            }

            // 之前我是主讲，销毁重建我的播放器。
            if (store.get('user.id') === oldPresenterId) {
                if (myPlayer) {
                    if (foldHandler) {
                        myPlayer.unwatch('isFolded', foldHandler);
                        foldHandler = null;
                    }
                    myPlayer.destroy();
                    myPlayer = null;
                    createMyPlayer(element);
                }
            }
        });

    };
});
