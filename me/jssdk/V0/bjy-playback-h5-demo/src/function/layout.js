/**
 * @file 更新布局
 * @author zhaogaoxing
 */
define(function (require) {
    return function () {
        var video = $('#bjy-player-teacher');
        var all = $(window).height();
        var width = $(document).width();

        if (all < 646) {
            all = 646;
        }

        var height = all - 46 - 40;
        $('#list-box').css('height', height);
        $('#user-list').css('height', height);
        $('#message-list').css('height', height);

        video.height((all - 40) / 2);

        $('.picture').css('margin-top', ((all - 40) / 2 - 100) / 2 );


        var barrage = $('#barrage');
        barrage.css('width', width - 700 -40);

        var boardHeight = parseInt($('.bjy-container canvas').css('height'));
        barrage.css('height', boardHeight);
        barrage.css('top', 60 + (all - 40 - 120 - boardHeight) / 2);
    };
});
