<template>
    <div class="interaction">
        <div class="tab-header">
            <span
                class="tab-message"
                :class="{ active: getCurrentTab('message') }"
                @click="setTab('message')"
                >聊天</span
            >
            <span
                class="tab-question"
                :class="{ active: getCurrentTab('question') }"
                @click="setTab('question')"
                >问答</span
            >
            <span
                class="tab-board"
                :class="{ active: getCurrentTab('board') }"
                @click="setTab('board')"
                >白板</span
            >
        </div>
        <div class="tab-body">
            <MessageList v-show="getCurrentTab('message')" />
            <QuestionAnswer v-show="getCurrentTab('question')" />
            <WhiteBoard v-show="getCurrentTab('board')" />
        </div>
    </div>
</template>

<script>
import MessageList from "./MessageList";
import QuestionAnswer from "./QuestionAnswer";
import WhiteBoard from "./WhiteBoard";

// const eventEmitter = BJY.eventEmitter

export default {
    components: {
        MessageList,
        QuestionAnswer,
        WhiteBoard
    },
    data() {
        return {
            currentTab: "board"
        };
    },
    computed: {},
    watch: {},
    methods: {
        getCurrentTab(tab) {
            return this.currentTab === tab;
        },
        setTab(tab) {
            this.currentTab = tab;
        }
    },
    created() {},
    mounted() {},
    beforeDestroy() {}
};
</script>

<style lang="scss" scoped>
//@import url(); 引入公共css类
.interaction {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .tab-header {
        width: 100%;
        height: 36px;
        font-size: 16px;
        background: #fff;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        & > * {
            padding: 6px;
            width: 33%;
            text-align: center;
            cursor: pointer;
            box-sizing: border-box;
            display: inline-block;
        }

        .active {
            border-bottom: 2px solid #1795ff;
            color: #1795ff;
        }
    }

    .tab-body {
        top: 36px;
        width: 100%;
        height: 100%;
        flex-grow: 1;
        position: relative;
        overflow: hidden;
    }
}
</style>
