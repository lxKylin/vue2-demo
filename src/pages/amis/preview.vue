<template>
  <react-proxy
    v-if="showDom"
    :component="ReportPreview"
    :props="{ schema, params: sparams }"
  ></react-proxy>
</template>
<script>
import ReportPreview from '@/components-react/lowcode/viewer.jsx';
// import { getAmisConfig } from '@/service/role-service';
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
  // watch: {
  //   $route: {
  //     handler(val) {
  //       this.showDom = false;
  //       const acode = this.$route.query?.acode || this.code;
  //       if (acode) {
  //         getAmisConfig({ resourceCode: acode }).then((res) => {
  //           this.schema = JSON.parse(res?.data[0]?.pageConfig || '{}');
  //           this.showDom = true;
  //         });
  //       } else {
  //         this.schema = localStorage.getItem('amisdata')
  //           ? JSON.parse(localStorage.getItem('amisdata'))
  //           : {};
  //         this.showDom = true;
  //       }
  //     },
  //     immediate: true,
  //     deep: true,
  //   },
  // },
  mounted() {}
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
