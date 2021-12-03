var roomId = "1105";
var userId = 10000;
var sig = 'eJw0zk1PhDAQxvHvMmezTluXXZp4MW6yLyZq16B4o3bABrC1EIIYv7vhZa*-yX-y-MLLw3lFvbeBQG6jG8Sriayhr9bmlgJIYIiIMB*Cc-VIDNeLNKbMvLcGJNDhtGEUhmFv4qPSPn9U671Q7LlLXqu3TXYpbDG*eE*vv-uk*kgiZfTdz5Opwukgsl163xwp-XSs0DvNy7Mrb5ewtTWBZJHgYhvzmM3aTSP5CuHvPwAA--9WiT2f';

var localStream;
var remoteStream;
// 创建客户端
const room = BRTC.createClient({
    codec: 'h264', // 目前只支持 h264
    appId: 'eIK71erzzHd9JRbpfOR5H3R1QvVWlX7a' // 在控制台创建的 appId
});
// 加入房间，加入之后可以看到其他人的音视频
function joinRoom() {
    room.join(roomId, userId, sig);
    localStream = BRTC.createStream({
        video: true,
        audio: true,
    });
    localStream.init().then(() => {
        // 默认关闭音视频
        localStream.muteVideo();
        localStream.muteAudio();
    });
}
// 切换麦克风状态
function switchMic() {
    if (localStream.getAudioOn()) {
        localStream.muteAudio().then(() => {
            playLocalStream();
        })
        $('#switchMic').removeClass("layui-border-green").addClass("layui-border-red")
    } else {
        localStream.unmuteAudio().then(() => {
            playLocalStream();
        })
        $('#switchMic').removeClass("layui-border-red").addClass("layui-border-green")
    }
};
// 切换摄像头状态
function switchCam() {
    if (localStream.getVideoOn()) {
        localStream.muteVideo().then(() => {
            playLocalStream();
        })
        $('#switchCam').removeClass("layui-border-green").addClass("layui-border-red")
    } else {
        localStream.unmuteVideo().then(() => {
            playLocalStream();
        })
        $('#switchCam').removeClass("layui-border-red").addClass("layui-border-green")
    }
};

function playLocalStream() {
    if (localStream.getAudioOn() || localStream.getVideoOn()) {
        if (!localStream.isPlaying()) {
            room.publish(localStream);
            console.log('发布流成功');
            localStream.play(localVideo);
        }
    }
}
// 开始屏幕分享
function shareScreen() {
    localStream.destroy()
    localStream = BRTC.createStream({
        audio: true,
        screen: true
    });
    // 设置屏幕分享 profile, init 之前生效
    localStream.setVideoEncoderConfiguration({
        width: 1280,
        height: 720,
        frameRate: 20,
        bitrate: 2500
    });
    localStream.init().then(() => {
        // 发布屏幕分享
        localStream.play(localVideo);
        room.publish(localStream).then(() => {
            console.log('发布屏幕分享成功');
        });
    });
    // 屏幕分享结束,主要处理点击浏览器 native button 结束屏幕分享
    localStream.on('video-track-ended', () => {
        // 取消发布屏幕分享流
        room.unpublish(localStream).then(() => {
            // 销毁屏幕分享流实例
            localStream.destroy()
            localStream = BRTC.createStream({
                video: true,
                audio: true,
            });
            localStream.init().then(() => {
                // 默认关闭音视频
                localStream.muteVideo();
                localStream.muteAudio();
            });

        });
    });
}
// 离开房间
function leaveRoom() {
    room.leave();
    localStream.destroy();
}

// 监听远端流添加事件，订阅远端流
room.on('stream-added', (data) => {
    remoteStream = data.stream;
    room.subscribe(remoteStream, {
        video: true,
        audio: true
    });
    remoteStream.play(remoteVideo);
});
//监听远端流移除事件
room.on('stream-removed', (data) => {
    remoteStream = data.stream;
});
// // 监听用户进入房间
// room.on('peer-joined', event => {
//     window.alert(`user' ${event.userId} 'joinRoom`);
// });
// // 监听用户离开房间
// room.on('peer-leaved', event => {
//     window.alert(`user' ${event.userId} 'leaveRoom`);
// });