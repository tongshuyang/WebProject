<template>
    <div id="message-panel">
        <div class="message-list"></div>
        <div
            class="message-sender-holder"
            v-show="!showSender"
            @click="displaySender"
        >
            <i class="sprite-icon icon-sender"></i>
            <span>说点什么吧~</span>
        </div>
        <div class="message-sender" v-show="showSender"></div>
    </div>
</template>

<script>
import userRoleMap from "../common/roleMap";

var eventEmitter = BJY.eventEmitter;

export default {
    components: {},
    data() {
        return {
            showSender: false,
            input: null
        };
    },
    computed: {},
    watch: {},
    methods: {
        displaySender: function() {
            this.showSender = true;
            this.$emit("toggle-show-sender", { showSender: this.showSender });
            setTimeout(() => this.input && this.input.focus());
        }
    },
    mounted() {
        // 创建消息列表
        BJY.MessageList.create({
            element: $("#message-panel .message-list"),
            replace: false,
            skin: "simple",
            newMessageHint: "条新消息",
            renderEmoji: function(name, url) {
                if (BJY.isAlicloudImage(url)) {
                    return (
                        '<img ondragstart="return false" src="' +
                        (url + "@100w_1e_1l.png") +
                        '" srcset="' +
                        (url + "@200w_1e_1l.png") +
                        ' 2x">'
                    );
                }
                return '<img ondragstart="return false" src="' + url + '">';
            },
            renderImage: function(url) {
                if (BJY.isAlicloudImage(url)) {
                    return (
                        '<img ondragstart="return false" src="' +
                        (url + "@100w_1e_1l.png") +
                        '" srcset="' +
                        (url + "@200w_1e_1l.png") +
                        ' 2x">'
                    );
                }
                return '<img ondragstart="return false" src="' + url + '">';
            },
            renderUser: function(user, width, height) {
                return {
                    id: user.id,
                    name: user.name,
                    number: user.number,
                    // 头像需压缩
                    avatar: BJY.compressImage({
                        url: user.avatar,
                        width: width,
                        height: height
                    }),
                    avatar2x: BJY.compressImage({
                        url: user.avatar,
                        width: width * 2,
                        height: height * 2
                    }),
                    // 根据用户类型，配置角色的英文和本地语言
                    role: userRoleMap[user.type].en,
                    localRole: userRoleMap[user.type].cn
                };
            },
            loadDistance: 0
        });
        // 创建消息发送组件
        var sender = BJY.MessageSender.create({
            element: $("#message-panel .message-sender"),
            replace: false,
            canSendEmoji: false,
            multiline: true,
            messageMaxLength: 140,
            placeholder: ""
        });
        setTimeout(() => {
            var bjyInput = sender && sender.$refs && sender.$refs.bjyInput;
            var input = bjyInput && bjyInput.$refs && bjyInput.$refs.input;
            this.input = input && $(input);
            input &&
                $(input).on("blur", () => {
                    setTimeout(() => {
                        this.showSender = false;
                        this.$emit("toggle-show-sender", {
                            showSender: this.showSender
                        });
                    }, 1000);
                });
        }, 2000);
    },
    beforeDestroy() {}
};
</script>

<style lang="scss">
//@import url(); 引入公共css类
#message-panel {
    position: relative;
    width: 100%;
    height: 100%;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }

    .message-list {
        width: 100%;
        height: unset;
        position: absolute;
        top: 0;
        bottom: 50px;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
            display: none;
        }

        .no-more-history-message-hint {
            display: none;
        }
    }

    .message-sender-holder {
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 0;
        padding: 0 8px;
        height: 40px;
        width: 160px;
        border-radius: 56px;
        color: #ffffff;
        background: rgba(0, 0, 0, 0.25);
    }

    .message-sender {
        position: fixed;
        bottom: 30px;
        left: 30px;
        right: 30px;
        height: 40px;
        border-radius: 56px;
        border: solid 1px rgb(255, 255, 255);
        background: rgba(255, 255, 255, 0.9);

        .bjy-no-forbidden {
            display: flex;
            height: 50px;
            align-items: center;
            justify-content: space-between;

            .bjy-message-input {
                flex-grow: 1;
            }

            textarea {
                height: 40px;
                line-height: 24px;
                margin-left: 10px;
                margin-bottom: 10px;
                font-size: 14px;
                // border-radius: 56px;
                // background: rgba(0, 0, 0, 0.25);
                background: transparent;
                border-color: transparent;
                box-shadow: unset;
                -ms-overflow-style: none;
                &::-webkit-scrollbar {
                    display: none;
                }

                &::-webkit-input-placeholder {
                    color: #ffffff;
                }
            }

            .bjy-action-bar {
                margin-top: -10px;
                margin-right: 13px;
                position: relative;
                zoom: 1;

                .bjy-length-hint {
                    display: none;
                }

                .bjy-button {
                    width: 52px;
                    height: 32px;
                    background: #1795ff;
                    border-radius: 56px;
                    color: #ffffff;
                    &[disabled] {
                        background-color: #e4e4e4;
                    }
                }
            }
        }
    }
}
</style>
