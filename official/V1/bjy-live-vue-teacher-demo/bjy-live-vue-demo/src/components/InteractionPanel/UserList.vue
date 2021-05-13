<template>
  <div id="user-list"></div>
</template>

<script>
import userRoleMap from "./common/roleMap";
let auth = BJY.auth;
let config = BJY.config;

export default {
  components: {},
  data() {
    return {
      userLayerInstance: null,
      lastUser: null,
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 生成浮层
    setLayer(useParameterUser, e) {
      let ele = $(".bjy-user-layer");
      if (!this.userLayerInstance || (this.userLayerInstance && !ele[0])) {
        if (this.userLayerInstance && !ele[0]) {
          this.userLayerInstance.destroy();
        }
        let node = document.createElement("div");
        $("#app").append(node);
        this.userLayerInstance = BJY.UserLayer.create({
          user: this.lastUser,
          element: $(node),
          renderUser: function (user, width, height) {
            return {
              id: user.id,
              name: user.name,
              number: user.number,
              // 头像需压缩
              avatar: BJY.compressImage({
                url: user.avatar,
                width: width,
                height: height,
              }),
              avatar2x: BJY.compressImage({
                url: user.avatar,
                width: width * 2,
                height: height * 2,
              }),
              // 根据用户类型，配置角色的英文和本地语言
              role: userRoleMap[user.type].en,
              localRole: userRoleMap[user.type].cn,
            };
          },
          useParameterUser: useParameterUser,
          speakInviteTimeout: 10 * 1000,
          setMediaTimeout: 10 * 1000,
          hasSwitchPaint: function (user) {
            if (auth.isTeacher() || auth.isAssistant()) {
              if (auth.isStudent(user.type)) {
                if (
                  user.endType === config.END_TYPE_MOBILE_BROWSER ||
                  user.endType === config.END_TYPE_XIAOCHENGXU
                ) {
                  return false;
                }
                // 大班课学生没有上麦就不要有授权画笔的按钮了
                if (!user.videoOn && !user.audioOn) {
                  return false;
                }
                return true;
              }
            }
            return false;
          },
          hasSwitchDocumentControl: function (user) {
            return false;
          },
          onKickOutConfirm: function (deferred, user, content) {
              if (window.confirm('确定要将该学生踢出教室吗？')) {
                  deferred.resolve(true)
                } else {
                  deferred.reject(false)
                }
                return deferred;
          }
        });
      } else {
        this.userLayerInstance.set("useParameterUser", useParameterUser);
        this.userLayerInstance.set("user", this.lastUser);
      }
      $(".bjy-user-layer").css({
        top: e.originalEvent.clientY + 10 + "px",
        left: e.originalEvent.clientX - 150 + "px",
      });

      $(".bjy-user-layer").toggle();
    },
  },
  created() {
    let eventEmitter = BJY.eventEmitter;
    // 监听人数变化
    eventEmitter.on(eventEmitter.USER_COUNT_CHANGE, function (e, data) {
      $("#user-count").text("(" + data.userCount + ")");
    });
  },
  mounted() {
    let eventEmitter = BJY.eventEmitter;
    let me = this;

    BJY.UserList.create({
      element: $("#user-list"),
      renderUser: function (user, width, height) {
        return {
          id: user.id,
          name: user.name,
          number: user.number,
          // 头像需压缩
          avatar: BJY.compressImage({
            url: user.avatar,
            width: width,
            height: height,
          }),
          avatar2x: BJY.compressImage({
            url: user.avatar,
            width: width * 2,
            height: height * 2,
          }),
          // 根据用户类型，配置角色的英文和本地语言
          role: userRoleMap[user.type].en,
          localRole: userRoleMap[user.type].cn,
        };
      },
    });

    // 老师端在用户列表生成操作浮层
    if (BJY.auth.isTeacher()) {
      // 是否允许邀请上麦
      BJY.auth.canSpeakInvite = function (target) {
        return BJY.auth.isTeacher() && (target ? !target.group : true);
      };

      // 是否允许强制发言（与邀请发言互斥）
      BJY.auth.canSpeakForce = function (target) {
        return false;
        // 组内用户不允许被强制发言
        return BJY.auth.isTeacher() && (target ? !target.group : true);
      };
      $(".user-list").delegate(".bjy-user-item", "click", function (e) {
        event.stopPropagation();
        let number = e.currentTarget.dataset.number;
        let user = BJY.data.user.findByNumber(number);
        // user不存在到服务器获取
        if (!user) {
          eventEmitter.one(eventEmitter.USER_SEARCH_RES, function (event, data) {
            if (data.result && data.result.length > 0) {
              user = data.result[0];
              BJY.data.user.add(user);
              me.lastUser = user;
              me.setLayer(false, e);
            }
          });
          eventEmitter.trigger(eventEmitter.USER_SEARCH_REQ, {
            query: userNumber,
            field: "number",
          });
        } else {
          me.lastUser = user;
          me.setLayer(false, e);
        }
      });

      $("#app").delegate(".bjy-user-layer", "click", function (event) {
        event.stopPropagation();
      });

      $("#app").click(function () {
        $(".bjy-user-layer") && $(".bjy-user-layer").hide();
      });
    } else {
      // 学生端接收邀请发言信令
      let userSpeak = BJY.userSpeak;
      eventEmitter.on(eventEmitter.SPEAK_INVITE_CONFIRM, function () {
        let res = confirm("老师邀请你上麦发言");
        if (res) {
          userSpeak.processInvite(true);
        } else {
          userSpeak.processInvite(false);
        }
      });
    }
  },
  beforeDestroy() {},
};
</script>

<style lang="scss">
//@import url() 引入公共css类
.bjy-user-layer {
  position: fixed;
}
</style>
