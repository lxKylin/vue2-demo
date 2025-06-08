import { render as renderAmis } from 'amis';
import 'amis/lib/themes/cxd.css';
import 'amis-ui/lib/themes/cxd.css';
import '@/assets/css/override-amis.less';
import 'amis/lib/helper.css';
import './amis-iconfont/iconfont.css';
import axios from 'axios';
/**
 * amis底层是通过import()的方式引入monaco-editor，在本项目中会报错
 * 所以这里需要手动引入monaco-editor，避免报错
 */
// eslint-disable-next-line no-unused-vars

import { Message } from 'element-ui';

export default function preview({ schema, params }) {
  return renderAmis(
    schema,
    {
      // 这里可以传入自定义的 props
      data: params || {}
    },
    {
      fetcher: axios,
      notify: (type, msg) => {
        Message[type](msg);
      },
      alert: (msg) => {
        alert(msg);
      }
    }
  );
}
