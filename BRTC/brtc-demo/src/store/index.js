import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cameraList: [],
    micList: [],
    speakerList: [],
    cameraIndex: 0,
    micIndex: 0,
    speakerIndex: 0,
    roomId: '',
    userId: null,
    userName: null,
    joined: false,
    videoOn: false,
    audioOn: false,
    speakerVolume: 100,
    netStatus: navigator.onLine, // 网络状态 true/false
    subWindows: [{ id: 1, name: 'yugq', mic: true }], // 小窗数组
    debug: false,
    videoBitrateVolume: 150,
    debugSetting: {
      videoResolution: true,
      fps: true,
      upLoss: true,
      downLoss: true,
      rtt: true,
      videoBitrate: true,
      audioBitrate: true,
      receivedBytes: true,
      sendBytes: true
    },
    useLaser: false,
    showChat: false,
    showUserList: false,
    userListChatType: 1,
    currentUserList: {},
    hasNewMessage: false,
    userChatBoxType: 0,
    whiteboardNewMessageTip: false
  },
  mutations: {
    netStatusChange (state, payload) {
      state.netStatus = payload.data
    },
    subWindowsChange (state, payload) {
      state.subWindows = payload.data
    },
    videoOn (state, payload) {
      state.videoOn = payload.videoOn
    },
    audioOn (state, payload) {
      state.audioOn = payload.audioOn
    },
    speakerVolume (state, payload) {
      state.speakerVolume = payload.speakerVolume
    },
    roomId (state, payload) {
      state.roomId = payload.roomId
    },
    joined (state, payload) {
      state.joined = payload.joined
    },
    userId (state, payload) {
      state.userId = payload.userId
    },
    userName (state, payload) {
      state.userName = payload.userName
    },
    cameraList (state, payload) {
      state.cameraList = payload.cameraList
    },
    micList (state, payload) {
      state.micList = payload.micList
    },
    speakerList (state, payload) {
      state.speakerList = payload.speakerList
    },
    cameraIndex (state, payload) {
      state.cameraIndex = payload.cameraIndex
    },
    micIndex (state, payload) {
      state.micIndex = payload.micIndex
    },
    speakerIndex (state, payload) {
      state.speakerIndex = payload.speakerIndex
    },
    useTencent (state, payload) {
      state.useTencent = payload.useTencent
    },
    shortTimeToken (state, payload) {
      state.shortTimeToken = payload.shortTimeToken
    },
    debug (state, payload) {
      state.debug = payload.debug
    },
    debugSetting (state, payload) {
      state.debugSetting = payload.debugSetting
    },
    videoBitrateVolume (state, payload) {
      state.videoBitrateVolume = payload.videoBitrateVolume
    },
    useLaser (state, payload) {
      state.useLaser = payload.useLaser
    },
    setChatBox (state, payload) {
      state.showChat = payload.chatStatus
      state.userListChatType = payload.type
    },
    setShowUserList (state, payload) {
      state.showUserList = payload.userListStatus
      state.userListChatType = payload.type
    },
    closeBox (state, payload) {
      state.showUserList = false
      state.showChat = false
      state.userListChatType = 0
    },
    initUserList (state, payload) {
      state.currentUserList = payload
    },
    setUserAudioVideoStatus (state, payload) {
      state.currentUserList[payload.id][payload.type] = payload.status
    },
    setNewMessageStatus (state, payload) {
      state.hasNewMessage = payload
    },
    setUserChatBoxType (state, payload) {
      state.userChatBoxType = payload
    },
    whiteboardNewMessageTip (state, payload) {
      state.whiteboardNewMessageTip = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
