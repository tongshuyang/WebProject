<template>
    <div class="chat-box">
        <div class="header" v-if="userListChatType === 1">
            <span class="title" :class="{'checked': (userListStatus && type !== 2), 'select': userListStatus}" @click="checkChat()">聊天</span>
            <span class="title" v-if="userListStatus" :class="{'checked': type === 2}" @click="checkUser">成员列表（{{ currentUserList.length }}）</span>
            <el-tooltip class="item" effect="light" content="关闭" placement="top">
                <span class="close" @click="closeUserListChatBox">x</span>
            </el-tooltip>
        </div>
        <div class="header" v-else>
            <span class="title" :class="{'checked': (chatStatus && type !== 1), 'select': chatStatus}" @click="checkUser">成员列表（{{ currentUserList.length }}）</span>
            <span class="title" v-if="chatStatus" :class="{'checked': type === 1}" @click="checkChat()">聊天</span>
            <el-tooltip class="item" effect="light" content="关闭" placement="top">
                <span class="close" @click="closeUserListChatBox">x</span>
            </el-tooltip>
        </div>
        <div v-show="(userListChatType === 1 || type === 1) && type !== 2" class="chat">
            <div class="chat-area">
                <div v-for="(item, index) in currentMessageList" :key="item.id" class="message-list">
                    <p v-if="index === 0 || item.time - currentMessageList[index - 1].time > 300">{{ item.time | formatTime()}}</p>
                    <div v-if="userId == item.from.id" class="sender">
                        <EmojiAnimation :emojiSize="120" :emojiName="item.content" v-if="emojiList.indexOf(item.content) !== -1"/>
                        <div class="message-box" v-html="enter(item.content)" v-else></div>
                    </div>
                    <div v-else class="receiveder">
                        <p class="user">{{ item.from.name }}</p>
                        <EmojiAnimation :emojiSize="120" :emojiName="item.content" v-if="emojiList.indexOf(item.content) !== -1"/>
                        <div class="message-box" v-html="enter(item.content)" v-else></div>
                    </div>
                </div>
            </div>
            <div class="bottom-input">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 4 }"
                    placeholder="请输入内容"
                    class="message-input"
                    maxlength="140"
                    v-model="messageContent"
                    @keyup.enter.native="sendMessage"
                    @keyup.native="chatHeight()">
                </el-input> 
                <div class="right-message-btn">
                    <div class="message-btn">
                        <span class="message-icon-emoji" @click="emojiListBtn"></span>
                        <span class="message-icon-send" :class="{'send': messageContent.replace(/(^\s*)|(\s*$)/g, '').length}" @click="sendMessage"></span>
                    </div>
                    <div class="text-limit-tip" v-show="showTextLength">{{ messageContent.replace(/(^\s*)|(\s*$)/g, '').length }}/140</div>
                </div>
            </div>
        </div>
        <div v-show="(userListChatType === 2 || type === 2) && type !== 1" class="user-list">
            <div v-for="item in currentUserList" :key="item.id">
                <p v-if="item.id == userId">
                    <span class="user-name">{{ item.name }}</span>
                    <span class="user-name">（自己）</span>
                </p>
                <p v-else>
                    <span class="user-name">{{ item.name }}</span>
                    <span class="icon out" @click="kickOutTip(item)"></span>
                    <span class="icon video" :class="{'mute': !item.videoOn}" @click="videoSwitch(item)"></span>
                    <span class="icon mic" :class="{'mute': !item.audioOn}" @click="audioSwitch(item)"></span>
                </p>
            </div>
        </div>
        <el-dialog :visible.sync="showEmojiList" :modal="false" :show-close="false" class="emoji">
            <div class="emoji-list">
                <div>
                    <div class="emoji-icon" v-for="(item, index) in emojiList" :key="index"
                        @mouseenter="animationPlay(item, index)" @mouseleave="animationStop(item)"
                        @click="sendEmoji(item)">
                        <EmojiAnimation 
                            v-if="emojiIndex === index" :emojiName="item"
                            :ref="item" :emojiSize="76" class="emoji-icon-svg"/>
                        <span v-if="emojiIndex !== index" :class="'emoji-icon-img ' + item.replace(/\[|\]/g, '')"></span>
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="showKickOutDialog"
            width="30%" :modal="false"
            center>
            <span>确认要踢出“{{ kickOutInfo.name }}”吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showKickOutDialog = false">取消</el-button>
                <el-button type="primary" @click="kickOut">踢出</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import EmojiAnimation from './EmojiAnimation'
const emojiList = ['[angel]', '[angry]', '[blushing]', '[cool]', '[crying]', '[cussing]', '[flushed]', '[happy]', '[heartEyes]', '[kiss]', '[laughing]', '[laughingTears]', '[meh]', '[noseSteam]', '[sad]', '[sadTear]', '[shocked]', '[silly]', '[sleeping]', '[vomiting]']
export default {
    props: {
        messageList: {},
        currentUserList: {}
    },
    data() {
        return {
            messageContent: '',
            type: 0,
            showTextLength: false,
            emojiList: emojiList,
            showEmojiList: false,
            showKickOutDialog: false,
            kickOutInfo: {},
            loading: false,
            emojiIndex: -1
        }
    },
    computed: {
        userId () {
            return this.$store.state.userId * 10;
        },
        chatStatus () {
            return this.$store.state.showChat;
        },
        userListStatus () {
            return this.$store.state.showUserList;
        },
        userListChatType () {
            let userListChatType = this.$store.state.userListChatType;
            this.type = userListChatType;
            return userListChatType;
        },
        currentMessageList () {
            let messageList = this.messageList.slice(-80);
            return messageList
        }
    },
    filters: {
        formatTime(time) {
            let h = new Date(time * 1000).getHours();
            let m = new Date(time * 1000).getMinutes();
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            return h + ':' + m;
        }
    },
    watch: {
        type(newVal, oldVal) {
            if (oldVal === 1) {
                this.$store.commit('setNewMessageStatus', false)
            }
        }
    },
    components: {
        EmojiAnimation: EmojiAnimation
    },
    mounted () {
        setTimeout(()=> {
            this.chatHeight();
        }, 50)
    },
    methods: {
        sendMessage () {
            let message = this.messageContent;
            message = message.replace(/(^\s*)|(\s*$)/g, '');
            if (message) {
                this.$emit('sendMessage', { message: message, isEmoji: false });
            }
        },
        closeUserListChatBox () {
            this.$emit('closeUserListChatBox');
        },
        audioSwitch (item) {
            this.$message.warning('无此权限')
            // this.$emit('audioSwitch', {
            //     status: !item.isMuteAudio,
            //     id: item.id
            // });
        },
        videoSwitch (item) {
            this.$message.warning('无此权限')
            // this.$emit('videoSwitch', {
            //     status: !item.isMuteVideo,
            //     id: item.id
            // });
        },
        kickOutTip (item) {
            this.kickOutInfo = item;
            this.showKickOutDialog = true;
        },
        kickOut () {
            let item = this.kickOutInfo;
            this.$emit('kickOut', {
                id: item.id
            });
        },

        /**
         * 计算聊天区域的高度
         */
        chatHeight () {
            let chatInputHeight = document.getElementsByClassName('bottom-input')[0].clientHeight;
            let chatAreaHeight = document.getElementsByClassName('chat')[0].clientHeight;
            let chatDom = document.getElementsByClassName('chat-area')[0];
            chatDom.style.bottom = chatInputHeight + 5 + 'px';
            chatDom.scrollTop = chatDom.scrollHeight;
            if (chatInputHeight > 80) {
                this.showTextLength = true
            }
            else {
                this.showTextLength = false
            }
        },
        checkChat () {
            this.type = 1;
            this.$store.commit('setNewMessageStatus', false)
            this.$store.commit('setUserChatBoxType', 1)
            setTimeout(() => {
                this.chatHeight()
            }, 50)
        },
        animationPlay (emojiName, index) {
            this.emojiIndex = index;
            this.$nextTick(() => {
                this.$refs[emojiName][0].play();
            })
        },
        animationStop (emojiName) {
            this.emojiIndex = -1;
        },
        sendEmoji (message) {
            this.$emit('sendMessage', { message: message, isEmoji: true });
        },
        emojiListBtn () {
            this.showEmojiList = true;
            this.loading = true
            setTimeout(() => {
                this.loading = false
            }, 100)
        },
        enter(str) {
            return str.replace(/\n/g, '<br/>');
        },
        checkUser() {
            if (this.type === 1) {
                this.$store.commit('setNewMessageStatus', false)
            }
            this.type = 2;
            this.$store.commit('setUserChatBoxType', 2)
        }
    }
}
</script>

<style lang="less" scoped>
.chat-box {
    width: 320px;
    background: rgba(255, 255, 255, 0.85);
    border-radius: 12px;
    box-shadow: 0px 5px 10px 0px rgba(5, 6, 53, 0.10); 
    overflow: hidden;
    position: fixed;
    right: 270px;
    bottom: 70px;
    height: 680px;
    min-height: 380px;
    max-height: 80%;
    .header {
        position: relative;
        width: 100%;
        height: 41px;
        line-height: 40px;
        border-bottom: 1px solid rgba(176, 190, 197, 0.20);
        padding: 0 20px;
        text-align: left;
        .title {
            display: inline-block;
            font-size: 16px;
            font-family: PingFangSC;
            color: #03081a;
            & + .title {
                margin-left: 30px;
                cursor: pointer;
                &:hover {
                    border-bottom: 1px solid #1795FF;
                }
            }
            &.checked {
                border-bottom: 1px solid #1795FF;
            }
            &.select {
                cursor: pointer;
                &:hover {
                    border-bottom: 1px solid #1795FF;
                }
            }
        }
        .close {
            float: right;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #ff3b30;
            border: 1px solid #e64a19;
            margin-top: 14px;
            cursor: pointer;
            font-size: 14px;
            color: #e64a19;
            overflow: hidden;
            text-align: center;
            line-height: 9px;
            padding-left: 1px;
            &:hover {
                color: #03081a;
            }
        }
    }
    .chat {
        position: relative;
        height: calc(100% - 44px);
    }
    .chat-area {
        width: 100%;
        padding: 0px 20px;
        overflow: auto;
        position: absolute;
        top: 0;
        .message-list {
            margin-top: 20px;
            >p {
                text-align: center;
                font-size: 10px;
                font-family: PingFang, PingFang-SC;
                color: #03081a;
                margin-top: 20px;
            }
            .sender, .receiveder {
                .message-box {
                    display: inline-block;
                    padding: 8px 12px;
                    max-width: 240px;
                    font-size: 14px;
                    font-family: PingFang, PingFang-SC;
                    color: #03081a;
                    word-break: break-all;
                }
            }
            .sender {
                text-align: right;
                .message-box {
                    background: #c9e7ff;
                    border: 1px solid #bbd7ee;
                    border-radius: 16px 4px 16px 16px;
                    text-align: left;
                }
            }
            .receiveder {
                text-align: left;
                .message-box {
                    background: #fff;
                    border: 1px solid #ededee;
                    border-radius: 4px 16px 16px 16px;
                }
                .user {
                    font-size: 10px;
                    font-family: PingFang, PingFang-SC;
                    color: #b0bec5;
                    margin-bottom: 0px;
                }
            }
        }
    }
    .bottom-input {
        width: 100%;
        overflow: hidden;
        position: absolute;
        padding-top: 5px;
        border-top: 1px solid rgba(176, 190, 197, 0.20);
        padding-bottom: 10px;
        bottom: 0px;
        .message-input {
            width: 330px;
            background-color: rgba(255, 255, 255, 0);
        }
        .text-limit-tip {
            position: absolute;
            font-size: 10px;
            font-family: PingFang, PingFang-SC;
            font-weight: SC;
            right: 20px;
            bottom: 10px;
        }
        .right-message-btn .message-btn {
            >span {
                display: inline-block;
                position: absolute;
                width: 24px;
                height: 24px;
                background: url(../assets/sprites/icon-message-btn.png) no-repeat;
                background-image: -webkit-image-set(url(../assets/sprites/icon-message-btn@2x.png) 2x);
                background-position: 0 0;
                cursor: pointer;
                &.message-icon-emoji {
                    right: 60px;
                    top: 10px;
                }
                &.message-icon-send {
                    width: 32px;
                    height: 32px;
                    right: 20px;
                    top: 5px;
                    background-position-x: -26px;
                    cursor: not-allowed;
                    &.send {
                        background-position-x: -60px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .user-list {
        padding: 0 20px;
        overflow: auto;
        height: calc(100% - 44px);
        >div {
            border-bottom: 1px solid rgba(176, 190, 197, 0.20);
            height: 44px;
            line-height: 44px;
            text-align: left;
            .user-name {
                display: inline-block;
                max-width: 120px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow:ellipsis;
            }
            .icon {
                float: right;
                width: 32px;
                height: 32px;
                background: url(../assets/sprites/icon-user-auth.png) no-repeat;
                background-image: -webkit-image-set(url(../assets/sprites/icon-user-auth@2x.png) 2x);
                background-position: 0 0;
                cursor: pointer;
                &.mic {
                    background-position: 0 0;
                }
                &.video {
                    background-position: -32px 0;
                }
                &.out {
                    background-position: -96px 0;
                }
                &.mute {
                    background-position-y: -31px;
                }
            }
        }
    }
    .emoji-list {
        width: 400px;
        height: 250px;
        overflow-y: auto;
        .emoji-icon {
            display: flex;
            float: left;
            width: 76px;
            align-items: center;
            height: 76px;
            cursor: pointer;
            &-img {
                display: inline-block;
                width: 72px;
                height: 72px;
                background: url(../assets/sprites/emoji-sprites.png) no-repeat;
                background-image: -webkit-image-set(url(../assets/sprites/emoji-sprites@2x.png) 2x);
                background-position: 0 0;
                &.angel {
                    background-position: 0 0;
                }
                &.angry {
                    background-position: -72px 0;
                }
                &.blushing {
                    background-position: -144px 0;
                }
                &.cool {
                    background-position: -216px 0;
                }
                &.crying {
                    background-position: -288px 0;
                }
                &.cussing {
                    background-position: 0 -72px;
                }
                &.flushed {
                    background-position: -72px -72px;
                }
                &.happy {
                    background-position: -144px -72px;
                }
                &.heartEyes {
                    background-position: -216px -72px;
                }
                &.kiss {
                    background-position: -288px -72px;
                }
                &.laughing {
                    background-position: 0 -144px;
                }
                &.laughingTears {
                    background-position: -72px -144px;
                }
                &.meh {
                    background-position: -144px -144px;
                }
                &.noseSteam {
                    background-position: -216px -144px;
                }
                &.sad {
                    background-position: -288px -144px;
                }
                &.sadTear {
                    background-position: 0 -216px;
                }
                &.shocked {
                    background-position: -72px -216px;
                }
                &.silly {
                    background-position: -144px -216px;
                }
                &.sleeping {
                    background-position: -216px -216px;
                }
                &.vomiting {
                    background-position: -288px -216px;
                }
            }
        }
    }
}
</style>

<style lang="less">
.chat-box {
    .el-textarea__inner {
        border: none;
        background-color: rgba(255, 255, 255, 0);
        padding-right: 100px;
    }
    .emoji .el-dialog {
        position: absolute;
        right: 220px;
        bottom: 100px;
        width: 412px;
        .el-dialog__body {
            padding: 10px;
        }
        .el-dialog__header {
            display: none;
        }
    }
}
</style>
