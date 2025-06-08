import js from '@eslint/js';
// import pluginVue from 'eslint-plugin-vue';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  // {
  //   name: 'app/files-to-lint',
  //   files: ['**/*.{js,mjs,jsx,vue}']
  // },
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
  { languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      'vue/multi-word-component-names': 'off',
      'no-const-assign': 'error', //不允许改变用const声明的变量
      'no-use-before-define': 'warn', //禁止定义前使用
      'default-case': 'error', // 要求 Switch 语句中有 Default 分支
      'handle-callback-err': 'error', // 强制回调错误处理
      // 声明后永远不会重新分配的变量需要 const 声明，自动监测，会将没有被重新赋值的let改为const
      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: false
        }
      ]
    }
  }
  // ...pluginVue.configs['flat/essential']
]);
