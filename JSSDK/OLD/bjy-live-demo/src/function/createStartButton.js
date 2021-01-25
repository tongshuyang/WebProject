/**
 * @function 上课按钮
 * @author zhaogaoxing
 */
define(function(require, exports) {
    var store = BJY.store;
    var eventEmitter = BJY.eventEmitter;

    var language = require('../language/main')();

    return function(element) {
        if (store.get('class.started')) {
            element.text(language.CLASS_END);
        } else {
            element.text(language.CLASS_START);
        }

        eventEmitter
            .on(
                eventEmitter.CLASS_START,
                function () {
                    element.text(language.CLASS_END);
                    tip({
                        content: language.TIP_CLASS_START
                    });
                }
            )
            .on(
                eventEmitter.CLASS_END,
                function () {
                    element.text(language.CLASS_START);
                    tip({
                        content: language.TIP_CLASS_END
                    });
                }
            );

        element.on('click', function(e) {
            if (store.get('class.started')) {
                eventEmitter.trigger(eventEmitter.CLASS_END_TRIGGER);

            } else {
                eventEmitter.trigger(eventEmitter.CLASS_START_TRIGGER);
            }
        });
    }
});
