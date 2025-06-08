<template>
  <div ref="reactRoot" class="react-root"></div>
</template>

<script>
import React from 'react';
import ReactDOM from 'react-dom';

export default {
  name: 'ReactProxy',
  props: {
    component: {
      type: Function,
      required: true
    },
    props: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    component: 'renderReactComponent',
    props: 'renderReactComponent'
  },
  mounted() {
    this.renderReactComponent();
  },
  beforeDestroy() {
    ReactDOM.unmountComponentAtNode(this.$refs.reactRoot);
  },
  methods: {
    renderReactComponent() {
      const { component, props } = this;
      ReactDOM.render(
        React.createElement(component, props),
        this.$refs.reactRoot
      );
    }
  }
};
</script>

<style lang="less" scoped>
.react-root {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
