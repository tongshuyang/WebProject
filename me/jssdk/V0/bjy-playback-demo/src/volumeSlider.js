/**
 * @file 音量条
 * @author dujianhao
 * @date 2018/7/26
 */

define(function (require, exports) {

    var eventEmitter = BJY.eventEmitter;

   exports.init = function (container) {

       var volumeSliderElement = container.find('#bjy-playback-volume-wrapper');

       var volumeSlider = BJY.VolumeSlider.create({
           element: volumeSliderElement,
           min: 0,
           max: 100,
           value: 30, // 默认音量
           onChange: function (value) {

               <!-- 音量改变的时候触发，请在此处修改您的视频音量 -->
               eventEmitter.trigger(
                   eventEmitter.SPEAKER_VOLUME_CHANGE,
                   {
                       value: value / 100
                   }
               );
           }
       });

       volumeSliderElement.hide();

       var volumeBtn = $('#bjy-volume-btn');

       volumeBtn.on('click',function () {
           volumeSliderElement.toggle();
       });
   }
});