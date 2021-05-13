/**
 * @file 话术入口
 * @author zhaogaoxing
 */
define(function (require, exports) {

    'use strict';

    var chinese = require('./chinese');
    var english = require('./english');

    return function () {
        return chinese;
        // 如需提供英文话术，请使用下边的代码
        // return BJY.store.get('language') === 'english' ? chinese : english;
    };
});
