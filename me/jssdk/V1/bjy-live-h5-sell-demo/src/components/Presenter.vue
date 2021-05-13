<template>
    <div class="bjy-presenter" v-show="userName">
        <img class="bjy-presenter-avatar" :src="userAvatar" v-if="userAvatar" />
        <div class="content">
            <span class="user-name">{{ userName }}</span>
            <span class="user-count-wrapper">
                <span class="user-count">{{ userCount }}</span>
                人观看
            </span>
        </div>
    </div>
</template>

<script>
var eventEmitter = BJY.eventEmitter;
var userData = BJY.data.user;
var store = BJY.store;

var DEFAULT_NAME = "主播";
var DEFAULT_AVATAR =
    "https://test-img.baijiayun.com/0bjcloud/live/avatar/v2/teacherv3.png?x-oss-process=image%2Fresize%2Climit_0%2Cm_mfit%2Cw_36%2Ch_36%2Fquality%2Cq_100%2Fformat%2Cpng";
function getPresenter() {
    return userData.find(store.get("presenterId"));
}
export default {
    data() {
        var user = getPresenter() || {};
        return {
            userAvatar: user.avatar || DEFAULT_AVATAR,
            userName: user.name || DEFAULT_NAME,
            userCount: 1,
            namespace: "_presenter" + Math.random()
        };
    },
    mounted() {
        var me = this;
        eventEmitter.on(eventEmitter.USER_COUNT_CHANGE, function(event, data) {
            var teacher = store.get("teacher");
            var userCount = data.userCount;
            if (teacher && userCount) {
                userCount--;
            }
            if (me.userCount !== userCount) {
                me.userCount = userCount;
            }
        });
        store.watch("presenterId", function() {
            var user = getPresenter() || {};
            this.userAvatar = user.avatar || DEFAULT_AVATAR;
            this.userName = user.name || DEFAULT_NAME;
        });
    }
};
</script>

<style lang="scss" scoped>
.bjy-presenter {
    display: flex;
    align-items: center;
    max-width: 160px;
    height: 40px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 23px;

    .bjy-presenter-avatar {
        width: 36px;
        height: 36px;
        border-radius: 100%;
        margin-left: 2px;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .content {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        flex: 1;
        font-size: 13px;
        margin-left: 4px;
        margin-right: 16px;
        color: #ffffff;

        .user-name {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 120px;
        }
    }
}
</style>
