import React, { useRef, useEffect } from 'react';
import Vue from 'vue';

// eslint-disable-next-line react/prop-types
export default function VueProxy({ component, props, listeners }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const inst = new Vue({
      render(h) {
        return h(component, {
          props,
          on: listeners
        });
      }
    });

    // 清除containerRef.current的子元素，创建新的子元素，并将其插入到containerRef.current中。以新的子元素为根元素，创建一个新的Vue实例。
    containerRef.current.innerHTML = '';
    const ele = document.createElement('div');
    containerRef.current.appendChild(ele);
    inst.$mount(ele);

    // 清理 Vue 实例
    return () => {
      inst.$destroy();
    };
  }, [component, props, listeners]);

  return <div ref={containerRef}></div>;
}
