<!-- 跑马灯组件，此组件不需要预置dom，只需在创建的时候指定挂载dom（即要在哪个dom里面跑） -->
<template>
  <div class="bjy-sidebar" :class="{ 'bjy-active': show }">
    <div @click="show = !show" class="bjy-toggle-btn">文档列表</div>
    <div class="bjy-doc-list"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    BJY.Catalogue.create({
      element: $(".bjy-doc-list"),
      thumbnailWidth: 100,
      hasWhiteboard: true,
    });
  },
};
</script>

<style lang="scss" scoped>
.bjy-sidebar {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: -1;
  left: 0;
  width: 160px;
  background: #fff;
  box-shadow: 5px -5px 5px 5px #aaa;

  &.bjy-active {
    left: -160px;
  }

  .bjy-toggle-btn {
    position: absolute;
    left: -24px;
    top: 100px;
    width: 24px;
    word-break: break-all;
    font-size: 14px;
    line-height: 20px;
    padding: 10px 0;
    text-align: center;
    background: #fff;
    color: #4a4a4a;
    border: 1px solid #4a4a4a;
    cursor: pointer;
  }
}
</style>
