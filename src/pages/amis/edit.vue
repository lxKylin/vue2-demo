<template>
  <div class="amis-report-editor">
    <div class="header">
      <div class="title">新增模板</div>
      <div class="toole">
        <el-button size="mini" type="primary" @click="save">保存</el-button>
        <el-button size="mini" type="primary" @click="pre">预览</el-button>
      </div>
    </div>
    <react-proxy
      :component="ReportEditor"
      :props="{ schema, onChange: handleSchemaChange }"
      class="body"
    ></react-proxy>
  </div>
</template>
<script>
import ReportEditor from '@/components-react/lowcode/editor.jsx';
import { PAGE_URL_AMIS_PRE } from '@/constant/page-url-constants';
// import { getStrategyDetail, saveStrategy } from '@/service/strategy-template';

export default {
  data() {
    return {
      ReportEditor,
      schema: {},
      templateInfo: {},
      amisInfo: {
        pageConfig: {}
      },
      amisForm: {}
    };
  },
  async mounted() {
    // if (this.$route.query?.id) {
    //   let resAmisData = await getStrategyDetail({ id: this.$route.query?.id });
    //   this.amisInfo = resAmisData.data;

    //   this.schema = JSON.parse(this.amisInfo.pageConfig);

    //   this.amisForm.id = this.amisInfo?.id || '';
    //   this.amisForm.name = this.amisInfo?.name || '';
    //   this.amisForm.description = this.amisInfo?.description || '';
    //   this.amisForm.code = this.amisInfo?.code || '';
    //   this.amisForm.step = this.amisInfo?.extend?.step || 1;
    // } else {
    //   this.schema = JSON.parse(localStorage.getItem('amisdata'));
    //   this.amisForm = JSON.parse(localStorage.getItem('amisForm'));
    // }

    this.schema = JSON.parse(localStorage.getItem('amisdata'));
    this.amisForm = JSON.parse(localStorage.getItem('amisForm'));
  },
  methods: {
    handleSchemaChange(schema) {
      this.schema = schema;
      this.amisInfo.pageConfig = schema;
    },
    save() {
      let params = {
        ...this.amisForm,
        extend: JSON.stringify({ step: this.amisForm.step }),
        pageConfig: JSON.stringify(this.amisInfo.pageConfig)
      };

      saveStrategy(params)
        .then((res) => {
          this.$message.success(res.msg || '操作成功');
          localStorage.removeItem('amisForm');
          //清除自定义中的绑定在window的数据
          window.taskStorageType = {};
          localStorage.setItem('amisdata', JSON.stringify(this.schema));
        })
        .catch((err) => {
          console.error(err);
          this.$message.error(err.msg || '操作失败');
        });
    },
    pre() {
      localStorage.setItem('amisdata', JSON.stringify(this.schema));
      // this.$linkTo({
      //   path: PAGE_URL_AMIS_PRE,
      //   query: {},
      //   type: '_blank'
      // });
    }
  }
};
</script>

<style lang="less" scoped>
.amis-report-editor {
  width: 100%;
  height: calc(100vh - 105px);
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  .header {
    flex: none;
  }
  .body {
    flex: auto;
    overflow-y: auto;
  }
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  padding: 5px 10px;
  .title {
    font-size: 16px;
    font-weight: bold;
  }
}
::v-deep .ae-Editor {
  height: 100%;
  .ae-RendererList-item .icon-box::before {
    display: none;
  }
}
</style>
