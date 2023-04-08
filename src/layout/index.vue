<template>
  <el-container>
    <el-header v-if="showHeader" class="bg-white">
      <div class="main-container">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/list.html">列表页</el-menu-item>
          <el-menu-item index="/spa.html">单页面（包含vuex、router）</el-menu-item>
          <el-menu-item index="3" disabled>公共头部</el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main class="main-container">
      <slot />
    </el-main>
    <el-footer v-if="showFooter" class="text-center bg-white flex-center">
      Copyright ©2023 公共底部
    </el-footer>
  </el-container>
</template>

<script>
export default {
  props: {
    showHeader: {
      type: Boolean,
      default: true,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      activeIndex: location.pathname,
    }
  },
  methods: {
    handleSelect(val) {
      location.href = val
    },
  },
}
</script>

<style>
/* 版心，一般 - -看设计图，多大就多大，虚假样式 */
.main-container {
  width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 120px);
}
</style>
