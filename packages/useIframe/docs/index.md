---
title: useIframe
sidebar_position: 1
---

功能强大，可以非常方便帮你同步 iframe 的 state。无惧跨域问题。

## 安装

```bash
pnpm add @asiareal/hooks-use-iframe -D
# or
yarn add @asiareal/hooks-use-iframe -D
# or
npm install @asiareal/hooks-use-iframe -D
```

## 使用

```tsx preview
import React from 'react';
import { useIframeState } from '@asiareal/hooks-use-iframe';

// 父页面
const Parent = () => {
  const ref = React.useRef<HTMLIFrameElement>(null);
  
  const [count, setCount] = useIframeState(0, { topic: 'demo.default', ref });

  return (
    <div>
      <h3>parent</h3>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Increment
      </button>
      <p>Count: {count}</p>
      <iframe ref={ref} src="/hooks/demos/iframe1" style={{ border: '1px solid red' }} />
    </div>
  );
};

// 子页面
const Child = () => {
  const [count, setCount] = useIframeState(0, { topic: 'demo.default' });

  return (
    <div>
      <h3>child</h3>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Increment
      </button>
      <p>Count: {count}</p>
    </div>
  );
};

export default Parent;
```
