<template>
  <react-proxy
    v-if="showDom"
    :component="ReportPreview"
    :props="{ schema, params: sparams }"
  ></react-proxy>
</template>
<script>
import ReportPreview from '@/components-react/lowcode/viewer.jsx';
import amisDemoData from '@/data/amis-demo.json';

export default {
  props: ['code'],
  data() {
    return {
      ReportPreview,
      schema: {},
      sparams: {}, //额外的参数
      showDom: false
    };
  },
  mounted() {
    this.schema = amisDemoData;
    this.showDom = true;
    console.log(this.schema);
  }
};
</script>

<style lang="less" scoped>
::v-deep .ae-Editor {
  height: 100%;
  .ae-RendererList-item .icon-box::before {
    display: none;
  }
}
</style>
