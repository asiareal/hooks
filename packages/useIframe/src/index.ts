import { useCallback, useEffect, useState } from 'react';

import { useEventListener } from '@asiareal/hooks-base';

import type { InnerMessage, MessageHandler, Options } from './types';
import { decodeMessage, encodeMessage, isInnerMessage } from './util';
import { MAX_QUEUE_SIZE } from './constants';

export function useIframe<M = unknown>(handleMessage: MessageHandler<M>, options: Options) {
  const { ref, topic, messageMaxLength = MAX_QUEUE_SIZE } = options;

  const [queue, setQueue] = useState<Array<M | InnerMessage>>([]);

  const isParent = ref === undefined;
  const isChild = !isParent && window !== window.parent;
  // 是否连接，子页面默认连接，父页面默认不连接，等待子页面发连接请求
  const [isConnected, setIsConnected] = useState(isChild);

  const dispatch = useCallback(
    (message: M) => {
      setQueue((prev) => {
        if (prev.length >= messageMaxLength) {
          prev.shift();
        }
        return [...prev, message];
      });
    },
    [messageMaxLength],
  );

  const handleInnerMessage = (payload: InnerMessage) => {
    switch(payload.type) {
      case 'mounted':
        if (isParent) {
          setIsConnected(true);
        }
        break;
    }
  };

  useEventListener('message', (e) => {
    const event = e as MessageEvent;
    const decoded =
        decodeMessage<M | InnerMessage>(event.data);
    if (decoded == null || decoded.topic !== topic) {
      return;
    }

    if (isInnerMessage(decoded.payload)) {
      handleInnerMessage(decoded.payload);
    } else {
      handleMessage(decoded.payload, dispatch);
    }
  });

  const postMessage = useCallback((message: M | InnerMessage) => {
    const encodedMessage = encodeMessage(message, topic);

    if (isParent && ref!.current && ref!.current!.contentWindow) {
      ref!.current.contentWindow.postMessage(encodedMessage, '*');
    } else if (isChild) {
      window.parent.postMessage(encodedMessage, '*');
    }
  }, [isChild, isParent, ref, topic]);

  // 发送消息
  useEffect(() => {
    if (!isConnected || !queue.length) {
      return;
    }
    const newQueue = [...queue];
    const message = newQueue.shift()!;
    setQueue(newQueue);
    postMessage(message);
  }, [isConnected, postMessage, queue]);

  return [dispatch];
}
