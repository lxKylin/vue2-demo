import { defineConfig } from '@rsbuild/core';
import { pluginVue2 } from '@rsbuild/plugin-vue2';
import { pluginVue2Jsx } from '@rsbuild/plugin-vue2-jsx';
import { pluginLess } from '@rsbuild/plugin-less';

import CompressionPlugin from 'compression-webpack-plugin'; // 兼容
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'; // 兼容

import path from 'path';

function resolve(dir) {
  // eslint-disable-next-line no-undef
  return path.resolve(__dirname, dir);
}

const fePort = 8088;

export default defineConfig({
  plugins: [
    pluginVue2(),
    pluginVue2Jsx(),
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
  },
  // 与 Rsbuild 服务器有关的选项
  server: {
    port: fePort, // 端口号
    compress: true,
    host: 'localhost',
    open: true, //配置自动启动浏览器
    proxy: {
      // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
      historyApiFallback: {
        index: '/index.html' //与output的publicPath
      }
    }
  },
  tools: {
    /**
     * tools.rspack修改Rspack的配置项
     */
    rspack: (config, { rspack }) => {
      config.cache = true;
      config.optimization.providedExports = true; // 允许 tree-shaking
      config.optimization.usedExports = true; // 允许 tree-shaking
      config.plugins.push(
        new CompressionPlugin({
          test: /\.(js|css)?$/i, // 压缩文件类型
          filename: '[path][base].gz', // 压缩后的文件名
          algorithm: 'gzip', // 使用 gzip 压缩
          minRatio: 0.8, // 压缩率小于 1 才会压缩
          threshold: 10240, // 对超过 10k 的数据压缩
          deleteOriginalAssets: false // 是否删除未压缩的文件(源文件)，不建议开启
        }),

        /**
         * 关闭警告：
         * public/tools/regulex中存在动态require
         * Critical dependency: require function is used in a way in which dependencies cannot be statically extracted
         */
        new rspack.ContextReplacementPlugin(
          /require\(\[".*"\]\)/,
          resolve('public')
        )
      );
    },
    bundlerChain: (chain) => {
      /** 添加对react的支持 */
      chain.module
        .rule('jsx')
        .test(/components-react\/.*\.jsx$/)
        .use('builtin:swc-loader')
        .loader('builtin:swc-loader')
        .options({
          jsc: {
            parser: {
              syntax: 'ecmascript',
              jsx: true
            },
            transform: {
              react: {
                pragma: 'React.createElement' // 如果你用的是 React 17 的新 JSX 转换，可以去掉这行
              }
            }
          }
        })
        .end();

      chain.resolve.extensions.add('.tsx').add('.ts').add('.jsx').add('.js');
      chain.plugin('monaco-editor').use(
        new MonacoWebpackPlugin({
          languages: ['javascript']
        })
      );
      /** monaco-editor的代码用了很多新特性，需要babel转译 */
      chain.module
        .rule('monaco-editor')
        .test(/monaco-editor[\\/].*\.js$/)
        .include.add(resolve('node_modules/monaco-editor/esm/vs'))
        .end()
        .exclude.add(resolve('node_modules/monaco-editor/esm/vs/language'))
        .end()
        .use('builtin:swc-loader')
        .loader('builtin:swc-loader')
        .options({
          jsc: {
            parser: {
              syntax: 'ecmascript'
            },
            target: 'es5' // 将代码转译为 ES5
          }
        })
        .end();
    }
  }
});
