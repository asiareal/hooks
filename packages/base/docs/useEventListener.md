---
sidebar_label: useEventListener
sidebar_position: 0
---

# useEventListener

用于监听事件的 Hook。

```jsx preview
import { useEventListener } from '@asiareal/hooks-base';

export default function App() {
  useEventListener('click', () => {
    console.log('click');
  }, document.getElementById('event-listener-demo1'));

  return <button id="event-listener-demo1">Click me</button>;
}
```

比较常用的用法可以监听全局消息事件：

```jsx
import { useEventListener } from '@asiareal/hooks-base';

export default function App() {
  useEventListener('message', (event) => {
    console.log('message', event.data);
  });

  return <div>Message listener</div>;
}
```
