
define(function(require, exports) {
    var eventEmitter = BJY.eventEmitter;
    exports.init = function (element, userCount, notice, barrage) {
        var isBarrageOn = barrage && barrage.isOpened();
        var cdnList = BJY.data.server.getLiveServerList();
        
        var template = `
        <span class="user-count"><span class="user-count-number">${userCount}</span>人在线</span>
        <span class="btn-wrap">`;
        if (cdnList && cdnList.length > 1 && !BJY.auth.isWebRTC()) {
            var container = '<select class="cdn-node-list" onchange="onChangeCDN()">';
            for(var index=0; index < cdnList.length; index ++) {
                container += `<option key="${index}" value="${index}">${'线路' + (index + 1)}</option>`;
            }
            container += '</select>';
            template += container;
        }
        template += `
        <i class="icon icon-notice-board" onclick="noticeToggle()"></i>
        <i class="icon ${isBarrageOn ? 'icon-danmu-on' : 'icon-danmu-off'}" onclick="barrageToggle()"></i>
        <i class="icon icon-refresh" onclick="playerRefresh()"></i>
        <i class="icon icon-expand" onclick="playerFullScreen()"></i>
        </span>
        `;
       element.find('#menu').append($(template));

       window.swapVideoDoc = function() {
        var videoEl = $('#h5-player')
        var docEl = $('#video-swap-placeholder')
        var cloneDocEl = docEl.clone()
        var temp = $('<span/>')
  
        videoEl.before(temp)
        docEl.replaceWith(videoEl)
        temp.replaceWith(cloneDocEl)
      }

      window.noticeToggle = function() {
        if ($('#notice').hasClass('notice-show')) {
            $('#notice').removeClass('notice-show');
        }
        else {
            $('#notice').addClass('notice-show');
        }
        checkNeedScroll();
      }

      function checkNeedScroll () {
        var wrapWidth = $('.bjy-content-container .bjy-content').width()
        var textWidth = $('.bjy-content-container .bjy-content').children().width()
        if (textWidth >= wrapWidth) {
          $('.list-section .bjy-notice').addClass('need-scroll')
        } else {
          $('.list-section .bjy-notice').removeClass('need-scroll')
        }
      }

      window.barrageToggle = function() {
        isBarrageOn = barrage && barrage.isOpened();
        if (isBarrageOn) {
            element.find('.icon-danmu-on').removeClass('icon-danmu-on').addClass('icon-danmu-off');
            barrage && barrage.close();
            tip({content: '弹幕关'});
        }
        else {
            element.find('.icon-danmu-off').removeClass('icon-danmu-off').addClass('icon-danmu-on');
            barrage && barrage.open();
            tip({content: '弹幕开'});
        }
      }

      window.playerRefresh = function() {
        window.player && window.player.replay()
      }

      window.playerFullScreen =  function() {
        var videoDom = document.getElementsByTagName('video')[0]
        toFullVideo(videoDom);
      }

      function toFullVideo (videoDom) {
        if (videoDom.requestFullscreen) {
          return videoDom.requestFullscreen()
        } else if (videoDom.webkitRequestFullScreen) {
          return videoDom.webkitRequestFullScreen()
        } else if (videoDom.mozRequestFullScreen) {
          return videoDom.mozRequestFullScreen()
        } else if (videoDom.webkitEnterFullScreen) {
          return videoDom.webkitEnterFullScreen()
        } else {
          return videoDom.msRequestFullscreen()
        }
      }

      window.onChangeCDN = function () {
        eventEmitter.trigger(
            eventEmitter.DOWNLINK_SERVER_NODE_CHANGE_TRIGGER,
            {
            index: +$('.cdn-node-list')[0].value
            }
        )
      }

      eventEmitter.on(
        eventEmitter.USER_COUNT_CHANGE,
        (e, data) => {
          $('.user-count-number').text(data.userCount);
        }
      )
    }
});