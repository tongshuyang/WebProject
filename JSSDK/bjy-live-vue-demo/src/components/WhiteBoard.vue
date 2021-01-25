<template>
    <div id="whiteboard">
      <div class="placeholder"></div>
      <div class="pre-page">
          <span class="icon-chevron-left" :class="{forbid: forbidChange || !canPrePage}"><</span>
      </div>
      <div class="next-page">
          <span class="icon-chevron-right" :class="{forbid: forbidChange || !canNextPage}">></span>
      </div>
    </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      canPrePage: false,
      canNextPage: false,
      pageData: null,
      forbidChange: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    setPageAuth () {
      var prePage = $('.icon-chevron-left')
      var nextPage = $('.icon-chevron-right')

      if (this.canPrePage) {
        prePage.addClass('has-page')
      } else {
        prePage.removeClass('has-page')
      }
      if (this.canNextPage) {
        nextPage.addClass('has-page')
      } else {
        nextPage.removeClass('has-page')
      }
    }
  },
  created () {
    this.pageData = BJY.data.page
    this.canPrePage = this.pageData.getClientPage() > 0
    this.canNextPage = this.pageData.getClientPage() < this.pageData.getMaxPage
  },
  mounted () {
    var eventEmitter = BJY.eventEmitter
    var element = $('#whiteboard')

    // 文档白板
    BJY.Whiteboard.create({
      element: element.find('.placeholder'),
      fit: 1 // 1 自适应  2 撑满容器
    })

    this.setPageAuth()

    // 白板工具事件
    element.find('.pre-page').on('click', () => {
      if (this.canPrePage && !this.forbidChange) {
        eventEmitter.trigger(
          eventEmitter.PAGE_PREV_TRIGGER
        )
      }
    })

    element.find('.next-page').on('click', () => {
      if (this.canNextPage && !this.forbidChange) {
        eventEmitter.trigger(
          eventEmitter.PAGE_NEXT_TRIGGER
        )
      }
    })

    eventEmitter
      .on(
        eventEmitter.WHITEBOARD_LAYOUT_CHANGE,
        (e, data) => {
          // 重新设置白板的高度并让其居中
        }
      )
      .on(
        eventEmitter.CLIENT_PAGE_CHANGE,
        () => {
          console.log('客户端翻页')
        }
      )
      .on(
        eventEmitter.PAGE_CHANGE_END,
        (e, data) => {
          var currentPage = this.pageData.getClientPage()
          var maxPage = this.pageData.getMaxPage()

          if (currentPage > 0) {
            this.canPrePage = true
          } else {
            this.canPrePage = false
          }
          if (currentPage < maxPage) {
            this.canNextPage = true
          } else {
            this.canNextPage = false
          }
          this.setPageAuth()
        }
      )
      .on(eventEmitter.STUDENT_PPT_AUTH_CHANGE,
        (e, data) => {
          console.log(data.forbid)
          this.forbidChange = data.forbid
        }
      )
  },
  beforeDestroy () {}
}
</script>

<style lang='scss'>
//@import url(); 引入公共css类
/*白板样式*/
#whiteboard {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 30px;
    right: 30px;

    /*白板工具*/
    .next-page, .pre-page {
        position: absolute;
        width: 30px;
        top: 0;
        bottom: 0;
        transition: background-color .5s;
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
        background-color: rgba(0, 0, 0, .4);
    }
    .next-page:hover {
        background-color: rgba(0, 0, 0, .4);
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
