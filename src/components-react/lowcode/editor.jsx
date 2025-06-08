// 必须要手动引入 React，否则会报错
import React from 'react';
import { Editor } from 'amis-editor';
import { Message } from 'element-ui';
import 'amis/lib/themes/cxd.css';
import 'amis-ui/lib/themes/cxd.css';
import '@/assets/css/override-amis.less';
import 'amis/lib/helper.css';
// import './amis-iconfont/iconfont.css';
import 'amis-editor-core/lib/style.css';
/**
 * amis底层是通过import()的方式引入monaco-editor，在本项目中会报错
 * 所以这里需要手动引入monaco-editor，避免报错
 */
// eslint-disable-next-line no-unused-vars
import monaco from 'monaco-editor';
import axios from 'axios';

import { setIconVendor } from 'amis';

// 设置编辑器可选择的图标
setIconVendor([
  {
    name: 'Font Awesome 5 Free',
    prefix: 'fa fa-',
    icons: [
      'filter',
      'cog',
      'upload',
      'undo',
      'sync',
      'user',
      'times',
      'sort-up',
      'sort-down',
      'sort-amount-up',
      'sort-amount-down',
      'sort-alpha-up',
      'sort-alpha-down',
      'sort',
      'sign-out-alt',
      'sign-in-alt',
      'angle-up',
      'angle-down',
      'angle-left',
      'angle-right'
    ]
  }
]);

export default function editor({ schema, onChange }) {
  return (
    <Editor
      showCustomRenderersPanel={true}
      value={schema}
      onChange={onChange}
      plugins={[]}
      amisEnv={{
        fetcher: axios,
        notify: (type, msg) => {
          Message[type](msg);
        },
        alert: (msg) => {
          alert(msg);
        }
      }}
    ></Editor>
  );
}
