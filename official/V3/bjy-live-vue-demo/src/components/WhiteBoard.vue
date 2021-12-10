<template>
  <div id="whiteboard">
    <div class="placeholder"></div>
    <div v-if="canChangePage" class="pre-page">
      <span class="icon-chevron-left" :class="{ forbid: !canPrePage }"><</span>
    </div>
    <div v-if="canChangePage" class="next-page">
      <span class="icon-chevron-right" :class="{ forbid: !canNextPage }">></span>
    </div>

    <div v-show="canPaint" class="bjy-toolbar">
      <div class="bjy-toolbar-placeholder">
        
      </div>
    </div>
  </div>
</template>

<script>
const eventEmitter = BJY.eventEmitter;
const auth = BJY.auth;
const store = BJY.store;
const config = BJY.config;

export default {
  components: {},
  data() {
    return {
      canPrePage: false,
      canNextPage: false,
      pageData: null,
      forbidChange: true,
      isTeacher: auth.isTeacher(),
      canStudentPanit: false
    };
  },
  computed: {
    canChangePage() {
      return auth.isTeacher() || !this.forbidChange;
    },
    canPaint() {
      return auth.isTeacher() || this.canStudentPanit;
    }
  },
  methods: {
    setPageAuth() {
      var prePage = $(".icon-chevron-left");
      var nextPage = $(".icon-chevron-right");

      if (this.canPrePage) {
        prePage.addClass("has-page");
      } else {
        prePage.removeClass("has-page");
      }
      if (this.canNextPage) {
        nextPage.addClass("has-page");
      } else {
        nextPage.removeClass("has-page");
      }
    },
  },
  created() {
    this.pageData = BJY.data.page;
    this.canPrePage = this.pageData.getClientPage() > 0;
    this.canNextPage = this.pageData.getClientPage() < this.pageData.getMaxPage;
  },
  mounted() {
    var element = $("#whiteboard");

    // 文档白板
    BJY.Whiteboard.create({
      element: element.find(".placeholder"),
      fit: 1, // 1 自适应  2 撑满容器
    });

    // 画笔工具
    BJY.PainterToolBar.create({
        // DOM 父元素
        element: $(".bjy-toolbar-placeholder"),
        replace: true,
        // 是否水平放置
        isVertical: false,
        // 是否使用选择工具
        canUseSelectTool: true,
        //是否使用粉笔工具
        canUsePencilTool: true,
        //是否使用图形工具
        canUseShapeTool: true,
        //是否使用文本工具
        canUseFontTool: true,
        //是否有调色板
        canUsePaletteTool: true,
        //是否使用删除键
        canUseDeleteTool: true,
        //是否使用激光笔
        canUsePointTool: true,
      });

    this.setPageAuth();

    // 白板工具事件
    element.find(".pre-page").on("click", () => {
      if (this.canPrePage && this.canChangePage) {
        eventEmitter.trigger(eventEmitter.PAGE_PREV_TRIGGER);
      }
    });

    element.find(".next-page").on("click", () => {
      if (this.canNextPage && this.canChangePage) {
        eventEmitter.trigger(eventEmitter.PAGE_NEXT_TRIGGER);
      }
    });

    eventEmitter
      .on(eventEmitter.WHITEBOARD_LAYOUT_CHANGE, (e, data) => {
        // 重新设置白板的高度并让其居中
      })
      .on(eventEmitter.CLIENT_PAGE_CHANGE, () => {
        console.log("客户端翻页");
      })
      .on(eventEmitter.PAGE_CHANGE_END, (e, data) => {
        var currentPage = this.pageData.getClientPage();
        var maxPage = this.pageData.getMaxPage();

        if (currentPage > 0) {
          this.canPrePage = true;
        } else {
          this.canPrePage = false;
        }
        if (currentPage < maxPage) {
          this.canNextPage = true;
        } else {
          this.canNextPage = false;
        }
        this.setPageAuth();
      })
      .on(eventEmitter.STUDENT_PPT_AUTH_CHANGE, (e, data) => {
        console.log(data.forbid);
        this.forbidChange = data.forbid;
      })
      .on(eventEmitter.SWITCH_STUDENT_PAINT, (e, data) => {
        if (auth.isStudent()) {
          var authList = data.studentPaintAuth;
          authList.filter(userNumber => {
            return store.get('user.number') === userNumber;
          })
          this.canStudentPanit = authList.length > 0;
          eventEmitter.trigger(
              eventEmitter.PAINT_AUTH_CHANGE,
              {
                  canPaint: this.canStudentPanit,
                  fromTeacher: true,
                  cache: 1
              }
          );
        }
      })
      .on(eventEmitter.MEDIA_PUBLISH, (e, data) => {
        if (data.audioOn === false && data.videoOn === false && data.user.id == store.get('user.id')) {
          this.canStudentPanit = false
        }
      });
  },
  beforeDestroy() {},
};
</script>

<style lang="scss">
//@import url(); 引入公共css类
/*白板样式*/
#whiteboard {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 30px;
  right: 30px;

  .bjy-toolbar {
    position: absolute;
    bottom: 0;
  }

  /*白板工具*/
  .next-page,
  .pre-page {
    position: absolute;
    width: 30px;
    top: 0;
    bottom: 0;
    transition: background-color 0.5s;
    color: transparent;

    .forbid:hover {
      cursor: not-allowed;
    }
  }
  .pre-page {
    left: -30px;
  }
  .next-page {
    right: -30px;
  }
  .pre-page:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  .next-page:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  .icon-chevron-left,
  .icon-chevron-right {
    font-size: 40px;
    position: absolute;
    top: 50%;
    margin-top: -25px;
    color: #fff;
  }
  .has-page {
    cursor: pointer;
  }
}
</style>
