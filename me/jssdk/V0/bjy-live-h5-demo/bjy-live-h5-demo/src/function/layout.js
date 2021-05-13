/**
 * @file 更新布局
 * @author zhaogaoxing
 */
define(function (require) {
    var layout = function () {
        var width = $(window).width();

        $('.video').css('height', width * 0.75);

        $('#play').css('left', width / 2 - 40);

        $('.list-section').css('top', width * 0.75 + 36);

        $('.teacher-status').css('top', (width * 0.75 - 24) * 0.5);
    }
    return layout;
});