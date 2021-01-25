/**
 * @file 问答面板
 * @author xuwei
 */
define(function(require, exports) {
    exports.init = function (element) {
        BJY.QuestionAnswer.create({
            element: element.find('#question-answer .placeholder'),
            replace: true,
            // 是否能够管理问题，老师或者助教传入true，学生传入false，会依据这个参数创建不同视图的面板
            canManageQuestion: false,
            // 每分钟限制发送的次数，可不传，默认值为10
            limitPerMinute: 100,
            // 每页显示的条数，可不传，默认为50
            countPerPage: 50,
            // 输入框可输入的最大长度，可不传，默认为140
            inputMaxLength: 140,
            // 是否是滑动翻页，仅在移动端时可用！！默认为false
            pageBySwipe: false,
            // 复制完成时的回调
            onCopyFinish: function () {
            }
        });
        window.toggleQuestionAnswer =  function () {
            var ele = $('#question-answer');
            var toggle = ele.find('.toggle');
            if (ele.hasClass('fold')) {
              ele.removeClass('fold')
              toggle.text('折叠');
            } else {
              ele.addClass('fold')
              toggle.text('展开');
            }
          }
    }
})