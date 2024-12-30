import React from 'react';
import { useIframeState } from '@asiareal/hooks-use-iframe';

const Child = () => {
  const [count, setCount] = useIframeState(0, { topic: 'demo.default' });

  return (
    <div>
      <h3>child</h3>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <button onClick={() => setCount((prev) => prev - 1)}>Decrement</button>
      <p>Count: {count}</p>
    </div>
  );
};

export default Child;
