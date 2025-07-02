<template>
  <div class="api-setting">
    <!-- 响应适配器 -->
    <MonacoEditor
      v-model="form.adaptor"
      :function-params="adaptorFunctionParams"
      :placeholder="ADAPTOR_DEFAULT_CODE"
      style="height: 275px"
      class="mb20"
    />
    <MonacoEditor
      v-model="form.context"
      language="json"
      style="height: 275px"
      class="mb20"
    />
  </div>
</template>

<script>
import MonacoEditor from '@/components/monaco-editor.vue';
import {
  ADAPTOR_API_STRUCT,
  ADAPTOR_RESPONSE_STRUCT,
  ADAPTOR_DEFAULT_CODE
} from '@/constant/common-constants';
export default {
  components: {
    MonacoEditor
  },
  data() {
    return {
      ADAPTOR_DEFAULT_CODE,
      form: {
        adaptor: '',
        context: ''
      },

      adaptorFunctionParams: [
        {
          label: 'payload',
          tip: '当前请求的响应 payload，即 response.data'
        },
        {
          label: 'response',
          tip: ADAPTOR_RESPONSE_STRUCT
        },
        {
          label: 'api',
          tip: ADAPTOR_API_STRUCT
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.api-setting {
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  padding-bottom: 0 !important;
  overflow: hidden;
}
</style>
