<template>
    <div id="app">
        <Loading @loaded="loadEnd()" />
        <div v-if="loaded" id="main">
            <div class="video-wrap">
                <Player :videoData="videoData" ref="player" />
            </div>

            <!-- 聊天、问答、白板、公告等 -->
            <div class="media-panel">
                <div class="notice">
                    <Notice />
                </div>
                <!-- 线路选择 -->
                <select v-if="lineList.length > 1" v-model="currentLine" name="line" id="line-control" title="线路">
                    <option v-for="(item, index) in lineList" :selected="index === currentLine" :key="index" :value="index">{{index | lineFilter}}</option>
                </select>
                <InteractionPanel />
            </div>

            <!-- 弹出层，响应老师发起的测验，答题器等 -->
            <ModalPanel />
        </div>
    </div>
</template>

<script>
import Loading from "./components/Loading";
import Player from "./components/Player";
import InteractionPanel from "./components/InteractionPanel";
import ModalPanel from "./components/ModalPanel";
import Notice from "./components/Notice";

var eventEmitter = BJY.eventEmitter;

export default {
    name: "App",
    components: {
        Loading,
        Player,
        Notice,
        InteractionPanel,
        ModalPanel
    },
    data() {
        return {
            loaded: false,
            videoData: null,
            currentLine: 0,
            lineList: []
        };
    },
    filters: {
        lineFilter (index) {
            return '线路' + (++index)
        }
    },
    watch: {
        currentLine: {
            deep: true,
            handler: function (val, oldVal) {
                this.videoData = this.lineList[val]
            }
        }
    },
    created() {
        var options = {
            token:
                "_NyxgArpLb5hp9iW7Rdvm2O6jv5wAF3VXpYHZM7T6Pm4biEtKMpMKu50p-1Gp3QQTKmkrktPRgsKp0fXMnVKLQ",
            classId: "20121042083339",
            sessionId: "202105120",
            prefixName: 'e70655665'
        }

        if (location.href.includes('debug=1')) {
            // <!-- 这里给一个测试入口：输入回放的url即可测试对应的回放 -->
            var url = prompt("输入回放url以测试");
            
            // 有回放链接用回放链接，没有回放链接用我们的测试用例
            if (url) {
                var params = this.getQuery(url);
                options.token = params.token;
                options.classId = params.classid;
                options.sessionId = Number(params.session_id);
                options.prefixName = params.prefixName;
            }
            console.log(options);
        }

        // 初始化房间
        BJY.playback
            .init({
                env: "production",
                privateDomainPrefix: options.prefixName,
                token: options.token,
                class: {
                    id: options.classId,
                    sessionId: options.sessionId
                },
                useEncrypt: true,
                user: {
                    number: "13147056",
                    avatar:
                        "http://static.sunlands.com/newUserImagePath/13147056/40_40/13147056.jpg",
                    name: "xxx",
                    type: 0
                }
            })
            .then(data => {
                this.loaded = true;
                let quality = data.defaultDefinition
                this.videoData = data.videos[quality][this.currentLine];
                this.lineList = data.videos[quality]
            });
    },
    methods: {
        loadEnd() {
            $("#main").css("top", 0);
        },
        getQuery(url) {
            var query = url.split("?")[1];
            // 获取自定义域名
            var prefixName = url.split('.')[0].split('//')[1]

            var list = query.split("&");
            var params = {
                prefixName: prefixName
            };
            list.forEach(item => {
                var pair = item.split("=");
                params[pair[0]] = pair[1];
            });
            return params;
        }
    },
    mounted() {}
};
</script>

<style lang="scss">
@import "./assets/iconfont/iconfont.css";
#app {
    height: 100%;
    width: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    #main {
        position: absolute;
        width: 100%;
        height: 100%;
        top: -10000px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        .video-wrap {
            width: 100%;
            position: relative;
        }

        .media-panel {
            flex-grow: 1;
            width: 100%;
            position: relative;
            overflow: hidden;

            #line-control {
                position: absolute;
                top: 80px;
                background: #fff;
                z-index: 1;
                right: 10px;
            }
        }
    }
}
</style>
