<!--
 * @Fileoverview: 提示组件
 * @Description: 悬停提示组件
-->
<template>
  <div class="qz-tips">
    <el-tooltip popper-class="qs-tooltip" :placement="placement">
      <div class="box" slot="content">
        <div v-html="tipsContent"></div>
      </div>
      <slot>
        <i class="el-icon-warning-outline"></i>
      </slot>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    tipsContent: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'left'
    }
  }
};
</script>

<style lang="less">
.qs-tooltip {
  white-space: pre;
  padding: 0;
  .box {
    padding: 5px;
    max-height: 200px;
    max-width: 450px;
    word-wrap: break-word;
    overflow: auto;
  }
  .highlight-blue {
    color: #1677ff;
  }
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #606266;
  }
}
</style>
