define(function(require, exports) {
    var eventEmitter = BJY.eventEmitter;
    var rollCallCountDown = 0;
    var rollCallTimer = null;
    exports.init = function (element) {
        var template = `
            <!-- 点名弹框 -->
            <div class="roll-call">
                <p class="roll-call-tip">老师要求你在<span class="roll-call-time"></span>秒内响应点名</p>
                <span class="roll-call-btn">答到</span>
            </div>
        `;
        element.append($(template));
        
    }

    eventEmitter
    // 点名
    .on(
        eventEmitter.ROLL_CALL, // 老师发起了点名
        (e, data) => {
          rollCallCountDown = data.duration
          changeRollCallStatus(true);
          rollCallTimer = setInterval(() => {
            if (rollCallCountDown === 0) {
              clearInterval(rollCallTimer)
              changeRollCallStatus(false);
            }
            changeRollCallCountDown(--rollCallCountDown);
          }, 1000);
        }
    );

    function changeRollCallStatus (status) {

    }

    function changeRollCallCountDown (countDown) {
        
    }

    function answerRollCall () {
        eventEmitter.trigger(eventEmitter.ROLL_CALL_RES)
        this.isRollCalling = false
        clearInterval(this.rollCallTimer)
    }
})