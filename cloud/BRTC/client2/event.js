const client = BRTC.createClient({
    codec: 'h264', // 目前只支持 h264
    appId: 'eIK71erzzHd9JRbpfOR5H3R1QvVWlX7a' // 在控制台创建的 appId
});
var roomId = "1105";
var userId = 10001;
var sig = 'eJw0zsFOhDAUheF3udsxY*90OkATFxoXRQ1KJWDcIb1oRaRWaAzGdzcis-1OTvJ-Q3Fzv6UvZz2BjA97xk4WsobeR9ta8iABGWMI-4Mfhv6PkIlVPk1XO2cNSKD0OkLy86xMcqWfXHurheIa81BWbw9RfXzYZ5AQwnlW*c3dI3-ZqXwsBp5fnKKeLruGhCk-mk2cpa-RhCo9W4*j7QkkHjgmeyGStTUskbstg5-fAAAA--8XGzx1';
var localStream;
var remoteStream;
//进入房间
function joinRoom() {
    client.join(
        roomId,
        userId,
        sig).then(() => {
        console.log('加入房间成功');
    });
}
// 通过 BRTC.createStream 方法创建本地流实例
function createStream() {
    localStream = BRTC.createStream({
        video: true,
        audio: true,
    });
    console.log("本地流初始化成功");
}
// 通过 localStream.init() 方法 初始化本地流
function initStream() {
    localStream.init()
        .then(() => {
            console.log("本地流初始化成功");
        })
}
//播放本地流
function localPlay() {
    localStream.play(localVideo).then(() => {
        console.log('本地流播放成功');
    });
}
// 通过 BRTCClient.publish 将创建的本地音视频轨道发布到应用中
function publish() {
    client.publish(localStream).then(() => {
        console.log('本地流发布成功');
    });
};
// 离开房间
function leaveRoom() {
    client.leave();
}
// 订阅远端流
client.on('stream-added', (data) => {
    remoteStream = data.stream;
    console.log(`user ${remoteStream.getUserId()} publish`);
    client.subscribe(remoteStream, {
        video: true,
        audio: true
    });
    remoteStream.play(remoteVideo);
});
//监听远端流停止事件
client.on('stream-removed', (data) => {
    remoteStream = data.stream;
    window.alert(`user ${remoteStream.getUserId()} leaveRoom`);
    console.log(`user ${remoteStream.getUserId()} leaveRoom`);
});