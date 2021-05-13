/**
 * @file 更新布局
 * @author zhaogaoxing
 */
define(function (require) {
    var layout = function () {
        var video = $('#bjy-player-teacher');
        var video2 = $('#bjy-player-user');
        var all = $(window).height();

        if (all < 646) {
            all = 646;
        }

        var height = all - 46 - 40;
        $('#list-box').css('height', height);
        $('#user-list').css('height', height);
        $('#message-list').css('height', height);

        $('#flash-player').css('height', (all - 40) / 2);
        video.height((all - 40) / 2);

        $('#flash-player-user').css('height', (all - 40) / 2);
        video2.height((all - 40) / 2);

        $('.picture').css('margin-top', ((all - 40) / 2 - 100) / 2 );

        $('.left').css('height', all - 40);
        var width = $(document).width();
        $('.left').css('width', width - 700);


        $('#whiteboard').css('width', width - 700 -40);
        $('#whiteboard').css('height', all -40 - 120);
        $('#barrage').css('width', width - 700 -40);

        var boardHeight = parseInt($('.bjy-container canvas').css('height'));
        $('#barrage').css('height', boardHeight);
        $('#barrage').css('top', 60 + (all - 40 - 120 - boardHeight) / 2);
    };
    return layout;
});