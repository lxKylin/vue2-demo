<template>
  <div id="app" class="y-scroll">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
#app {
  flex: auto;
  font-family: 'PingFangSC-Regular, MicrosoftYaHei, sans-serif';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1250px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  color: #303133;
}
</style>
