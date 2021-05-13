<template>
    <div id="app">
        <Loading v-if="!loaded" />
        <div v-if="loaded" id="main">
            <!-- 主播视频窗口 -->
            <Player ref="player" />
            <!-- 主播信息及观看人数 -->
            <div class="header">
                <Presenter class="presenter" />
                <ExitLive />
            </div>
            <!-- 消息列表 -->
            <div class="message-wrapper" :data-show-sender="showMessageSender">
                <Message-List @toggle-show-sender="toggleShowSender" />
            </div>
            <!-- 购物车组件客户可根据自定义广播信令自己实现 -->
            <CustomShop class="shopping-wrapper" />
        </div>
    </div>
</template>

<script>
import Loading from "./components/Loading";
import Player from "./components/Player";
import Presenter from "./components/Presenter";
import ExitLive from "./components/ExitLive";
import MessageList from "./components/MessageList";
import CustomShop from "./components/CustomShop";

var eventEmitter = BJY.eventEmitter;

BJY.logger.enable();

export default {
    data() {
        return {
            loaded: false,
            showMessageSender: false
        };
    },
    methods: {
        toggleShowSender(data) {
            this.showMessageSender = data && data.showSender;
        },
        // 支持解析输入的url进教室
        urlParser(url) {
            var params = {};
            if (url) {
                try {
                    // 获取query
                    var queryStr = url.split("?")[1];
                    var paramList = queryStr.split("&");
                    paramList.forEach(item => {
                        var pair = item.split("=");
                        params[pair[0]] = pair[1];
                    });
                    // 个性域名
                    params.prefixName = url.split(".")[0].split("//")[1];
                    // 区分环境
                    params.env = params.env || this.getEnv(url);
                } catch (e) {
                    console.log(e);
                }
            }
            return params;
        },
        getEnv(url) {
            if (!~url.indexOf(".")) {
                return "test";
            }
            // 获取环境
            const hostName = url.match(/\/\/(.*)\./)[1];
            if (
                /test/.test(hostName) ||
                /localhost/.test(hostName) ||
                /\d{1,3}\.\d{1,3}\.\d{1,3}/.test(hostName)
            ) {
                return "test";
            }
            if (/beta/.test(hostName)) {
                return "beta";
            }
            if (/www/.test(hostName)) {
                return "";
            }
            return "";
        }
    },
    components: {
        Loading,
        Player,
        Presenter,
        ExitLive,
        MessageList,
        CustomShop
    },
    created() {
        console.log(
            "******************************************************************************"
        );
        console.log("*   欢迎使用 BJY JS SDK - 百家云直播 - " + BJY.version);
        console.log(
            "*   API 文档：https://www.baijiayun.com/js-sdk/doc/#/README"
        );
        console.log(
            "******************************************************************************"
        );
        
        var options = {
            prefixName: "e70655665",
            env: "production",
            room_id: "20121171444643",
            user_number: "10086",
            user_avatar: "https://img.baijiayun.com/0bjcloud/live/avatar/v2/103.jpg",
            user_name: "audience",
            user_role: 0,
            sign: "3cd26d2d9c8811820070be455462d407",
            webrtc: 1
        };
        if (~location.href.indexOf("?")) {
            options = Object.assign(options, this.urlParser(location.href));
            options.prefixName = "";
        }

        // debug 模式支持输入传送门链接进入
        // 非webrtc大班课需要在url后拼上 &webrtc=0
        if (location.href.includes("debug=1")) {
            var url = prompt(
                "输入传送门链接进入教室,webrtc课程请在链接后加上&webrtc=1"
            );
            options = Object.assign(options, this.urlParser(url));
        }
        console.log(options);

        var classOption = {
            // 必须为字符串
            id: options.room_id
        };

        if (Number(options.webrtc)) {
            classOption.webrtcType = Number(options.webrtc);
        }

        BJY.init({
            env: options.env,
            privateDomainPrefix: options.prefixName,
            class: classOption,
            user: {
                number: options.user_number,
                avatar: decodeURIComponent(options.user_avatar),
                name: decodeURIComponent(options.user_name),
                type: Number(options.user_role)
            },
            teacher: {
                type: 1
            },
            sign: options.sign
        });

        eventEmitter
            .on(eventEmitter.CLASSROOM_CONNECT_TRIGGER, function(event, data) {
                // 开始连接服务器，可以在这做一下创建组件之前的准备
            })
            .on(eventEmitter.VIEW_RENDER_TRIGGER, (event, data) => {
                // 本事件触发表示直播服务已准备就绪，开始创建组件。该事件只会触发一次，会在BJY.init()之后很短时间内触发，注意监听时机
                this.loaded = true;
            })
            // 监听 loading 结束加载事件
            .one(eventEmitter.LOADING_PANEL_END, (event, data) => {
                // loading 结束加载时要做的事情
                $("#main").css({
                    top: 0,
                    bottom: 0
                });
            })
            .on(eventEmitter.LOGIN_CONFLICT, () => {
                alert("你已被踢，请确保user_number唯一");
            });
    }
};
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}
html,
body {
    height: 100%;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
}
#main {
    height: 100%;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 8px;
    left: 16px;
    right: 16px;
    z-index: 2;
}
.message-wrapper {
    position: fixed;
    left: 16px;
    bottom: 32px;
    width: 280px;
    height: 210px;
    padding-right: 32px;
    background: transparent;
    z-index: 2;
    box-sizing: border-box;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
    &[data-show-sender] {
        z-index: 5;
    }
}
.shopping-wrapper {
    position: fixed;
    right: 15px;
    bottom: 28px;
    z-index: 2;

    .recommend-item {
        position: fixed;
        right: 15px;
        bottom: 80px;
        width: 120px;
    }

    .list {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        .list-content {
            max-height: 300px;
            overflow-y: auto;
        }
    }
}
</style>
