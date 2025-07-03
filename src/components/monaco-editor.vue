<template>
  <div
    ref="editorContainer"
    class="qz-monaco-editor"
    :class="{ 'is-fullscreen': isFullscreen }"
  >
    <!-- 函数声明显示区域 -->
    <div v-if="functionParams.length" class="function-header flex">
      <span class="function-keyword ml5 mr5">function</span>
      (<span class="function-params flex">
        <span v-for="(param, index) in functionParams" :key="param.tip">
          <qz-tips :tips-content="param.tip" placement="top">
            <span class="mr5">
              {{ param.label
              }}<span
                style="color: #000"
                v-if="index !== functionParams.length - 1"
                >,
              </span>
            </span>
          </qz-tips>
        </span> </span
      >)
      <span class="function-brace ml5">{</span>
    </div>

    <div class="editor-toolbar" v-if="showFullscreenBtn">
      <el-tooltip
        effect="dark"
        :content="isFullscreen ? '退出全屏' : '全屏'"
        placement="top"
      >
        <span class="pointer" @click="toggleFullscreen">
          <i
            :class="
              isFullscreen ? 'el-icon-bottom-left' : 'el-icon-full-screen'
            "
          ></i>
        </span>
      </el-tooltip>
    </div>

    <!-- 占位文本 -->
    <div v-if="placeholder && showPlaceholder" class="editor-placeholder">
      <div v-html="formattedPlaceholder"></div>
    </div>

    <!-- 编辑器区域 -->
    <div ref="editorContent" class="editor-content"></div>

    <!-- 函数结束大括号显示区域 -->
    <div v-if="functionParams.length" class="function-footer">
      <span class="function-brace ml5">}</span>
    </div>
  </div>
</template>

<script>
import { monacoJava, monacoJavaScript, monacoHttp } from '@/utils/code-utils';
import monaco from 'monaco-editor';

const defaultLanguages = [
  { id: 'java', tokenProvider: monacoJava },
  { id: 'javascript', tokenProvider: monacoJavaScript },
  { id: 'http', tokenProvider: monacoHttp }
];

export default {
  props: {
    value: {
      type: String,
      required: true
    },
    language: {
      type: String,
      default: 'javascript'
    },
    customLanguages: {
      type: Array,
      default: () => []
    },
    theme: {
      type: String,
      default: 'vs-light'
    },
    minimap: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    showFullscreenBtn: {
      type: Boolean,
      default: true
    },
    // 函数参数
    functionParams: {
      type: Array,
      default: () => []
    },
    // 占位文本
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null,
      isFullscreen: false,
      isEmpty: true
    };
  },
  computed: {
    showPlaceholder() {
      return this.isEmpty && !this.readOnly;
    },
    // 格式化占位文本，将换行符转换为HTML换行
    formattedPlaceholder() {
      if (!this.placeholder) return '';
      return this.placeholder
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br/>');
    }
  },
  watch: {
    value(newValue) {
      if (this.editor && newValue !== this.editor.getValue()) {
        this.editor.setValue(newValue);
      }
      this.updateEmptyState(newValue);
    },
    language(newLanguage) {
      if (this.editor) {
        monaco.editor.setModelLanguage(this.editor.getModel(), newLanguage);
      }
    },
    customLanguages: {
      handler(newLanguages) {
        newLanguages.forEach((lang) => {
          this.registerLanguages(lang);
        });
      },
      deep: true
    },
    theme(newTheme) {
      if (this.editor) {
        monaco.editor.setTheme(newTheme);
      }
    },
    minimap(newMinimap) {
      if (this.editor) {
        this.editor.updateOptions({ minimap: { enabled: newMinimap } });
      }
    },
    readOnly(newReadOnly) {
      if (this.editor) {
        this.editor.updateOptions({ readOnly: newReadOnly });
      }
    },
    isFullscreen() {
      this.$nextTick(() => {
        if (this.editor) {
          // 重新计算和渲染布局
          this.editor.layout();
        }
      });
    }
  },
  methods: {
    registerLanguages(languages) {
      languages.forEach((lang) => {
        monaco.languages.register({ id: lang.id });
        monaco.languages.setMonarchTokensProvider(lang.id, lang.tokenProvider);
      });
    },
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;

      if (this.isFullscreen) {
        // 进入全屏模式
        document.body.classList.add('monaco-editor-fullscreen');
        document.addEventListener('keydown', this.handleEscKey);
      } else {
        // 退出全屏模式
        document.body.classList.remove('monaco-editor-fullscreen');
        document.removeEventListener('keydown', this.handleEscKey);
      }
    },
    handleEscKey(event) {
      if (event.key === 'Escape' && this.isFullscreen) {
        // 阻止事件冒泡
        event.preventDefault();
        event.stopPropagation();
        this.toggleFullscreen();
      }
    },
    // 更新空状态
    updateEmptyState(value) {
      this.isEmpty = !value.length;
    }
  },
  mounted() {
    this.registerLanguages(defaultLanguages.concat(this.customLanguages));

    // 初始化空状态
    this.updateEmptyState(this.value);

    this.editor = monaco.editor.create(this.$refs.editorContent, {
      value: this.value,
      language: this.language,
      theme: this.theme,
      automaticLayout: true,
      minimap: {
        enabled: this.minimap
      },
      readOnly: this.readOnly,
      stickyScroll: { enabled: false }
    });

    // 监听内容变化
    this.editor.onDidChangeModelContent(() => {
      const value = this.editor.getValue();
      this.updateEmptyState(value);
      this.$emit('input', value);
    });

    // 添加编辑器容器的点击事件处理
    this.handleEditorClick = () => {
      if (!this.readOnly && this.editor) {
        this.editor.focus();
      }
    };
    this.$refs.editorContainer.addEventListener(
      'click',
      this.handleEditorClick
    );
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.dispose();
    }

    // 移除事件监听器
    if (this.$refs.editorContainer) {
      this.$refs.editorContainer.removeEventListener(
        'click',
        this.handleEditorClick
      );
    }

    // 清理全屏相关的事件和样式
    document.body.classList.remove('monaco-editor-fullscreen');
    document.removeEventListener('keydown', this.handleEscKey);
  }
};
</script>

<style lang="less" scoped>
.qz-monaco-editor {
  position: relative;
  height: 100%;
  border: 1px solid #dcdfe6;

  .function-header,
  .function-footer {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    background: #fff;

    .function-keyword {
      color: #0000ff;
      font-weight: bold;
    }

    .function-params {
      color: #1677ff;
    }

    .function-brace {
      color: #333;
    }
  }

  .editor-toolbar {
    position: absolute;
    top: 0px;
    right: 14px;
    z-index: 10;
    color: #b8babf;
  }

  // 占位文本样式
  .editor-placeholder {
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0px;
    left: 65px;
    color: #999;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 12px;
    line-height: 18px;
    z-index: 1;
    opacity: 0.6;
    transition: opacity 0.2s ease;
    white-space: pre-wrap;
    pointer-events: none;
  }

  .editor-content {
    height: 100%;
    position: relative;
  }

  // 当显示函数头部时，调整编辑器内容高度和占位文本位置
  &:has(.function-header) {
    .editor-content {
      height: calc(100% - 36px);
    }

    .editor-placeholder {
      top: 19px;
    }
  }

  &.is-fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: #fff;
    border: none;

    .function-header {
      position: relative;
      top: 0;
    }

    .editor-toolbar {
      top: 0px;
      right: 16px;
    }

    .editor-content {
      height: 100vh;
      width: 100vw;
    }

    // 全屏模式下有函数头部时的高度调整
    &:has(.function-header) .editor-content {
      height: calc(100vh - 36px);
    }
  }
}
</style>

<style lang="less">
// 全局样式，防止全屏时页面滚动
body.monaco-editor-fullscreen {
  overflow: hidden;
}
</style>
