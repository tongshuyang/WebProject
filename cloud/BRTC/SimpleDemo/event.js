var roomId = "1105";
var userId = 10000;
var sig = 'eJw0zsFOhDAUheF3uVvNeEuHVpq4mIkL0CEoEpQl2Aupgm0qEoLx3Y3IbL*Tk-zfUJyedjQ74wnUtdgjXq5kNH2MpjXkQQFDRIT-wVs7-BHDcJNP-V47ZzQooOReMvLLEuvoLm9cm*VhzHP2OJXP-Yuszw-TgYLTVLqsfrPikLym4UX1kIguklfzV1U0tu-j25HSfXA8Hri92Y6jGQgUEzzgyGS0tU5rZLBD*PkNAAD--x6FPIs_';

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
        localStream.play(localVideo);
    });
}
// 切换麦克风状态
function switchMic() {
    localStream.muteAudio()
    localStream.unmuteAudio()

};
// 切换摄像头状态
function switchCam() {
    localStream.muteVideo()
    localStream.unmuteVideo()
    room.publish(localStream).then(() => {
        console.log('本地流发布成功');
    });
};
// 离开房间
function leaveRoom() {
    room.leave();
    localStream.destroy();
}
// 订阅远端流
room.on('stream-added', (data) => {
    remoteStream = data.stream;
    console.log(`user ${remoteStream.getUserId()} publish`);
    room.subscribe(remoteStream, {
        video: true,
        audio: true
    });
    remoteStream.play(remoteVideo);
});
//监听远端流停止事件
room.on('stream-removed', (data) => {
    remoteStream = data.stream;
    window.alert(`user ${remoteStream.getUserId()} leaveRoom`);
    console.log(`user ${remoteStream.getUserId()} leaveRoom`);
});

function shareScreen() {
    if (BRTC.supportScreenSharing()) {

    }
}