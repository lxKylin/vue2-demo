import { defineConfig } from '@rsbuild/core';
import { pluginVue2 } from '@rsbuild/plugin-vue2';
import { pluginLess } from '@rsbuild/plugin-less';

import path from 'path';

function resolve(dir) {
  // eslint-disable-next-line no-undef
  return path.resolve(__dirname, dir);
}

export default defineConfig({
  plugins: [
    pluginVue2(),
    pluginLess({
      lessLoaderOptions: {
        additionalData: `@import "@/assets/css/mixins.less";@import "@/assets/css/global.less";`
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  // 与构建产物有关的选项
  output: {
    // publicPath: '/', // rspack中的publicPath配置项
    assetPrefix: '/', // publicPath与之效果一致
    /**
     * 浏览器兼容
     * usage: 注入的 polyfill 体积更小，适合对包体积有较高要求的项目使用
     * entry: 注入的 polyfill 较为全面，适合对兼容性要求较高的项目使用
     */
    polyfill: 'entry'
  },
  source: {
    // 指定入口文件
    entry: {
      index: './src/main.js'
    }
  },
  html: {
    template: './public/index.html'
  }
});
