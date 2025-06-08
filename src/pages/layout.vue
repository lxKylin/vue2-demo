<template>
  <el-container>
    <el-header height="46px">
      <Header />
    </el-header>
    <el-main>Main</el-main>
  </el-container>
</template>

<script>
import Header from '@/components/header';
export default {
  components: {
    Header
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
  z-index: 100;
}
</style>
