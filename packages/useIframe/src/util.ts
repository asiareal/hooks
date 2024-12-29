import { INNER_MESSAGE, PACKET_ID } from './constants';
import { GlobalObject, InnerMessage, GLOBAL_UNIQUE_ID } from './types';

const globalObj: GlobalObject =
  typeof window === 'undefined' ? ({} as GlobalObject) : (window as GlobalObject);

// 获取全局唯一 id
export function genUniqueId(prefix: string = 'default') {
  if (!globalObj[GLOBAL_UNIQUE_ID]) {
    globalObj[GLOBAL_UNIQUE_ID] = {};
  }
  if (!globalObj[GLOBAL_UNIQUE_ID][prefix]) {
    globalObj[GLOBAL_UNIQUE_ID][prefix] = 0;
  }
  return `${prefix}_${++globalObj[GLOBAL_UNIQUE_ID][prefix]}`;
}

export function isInnerMessage(message: unknown): message is InnerMessage {
  if (!isPlainObject(message)) {
    return false;
  }

  return (message as unknown as InnerMessage)[INNER_MESSAGE] === true;
}

export function encodeMessage<M>(message: M, topic: string): string {
  return JSON.stringify({
    topic,
    payload: message,
    [PACKET_ID]: true,
  });
}

export function decodeMessage<M>(raw: string): { topic: string; payload: M } | undefined {
  try {
    const decoded = JSON.parse(raw);
    if (PACKET_ID in decoded && decoded[PACKET_ID] === true) {
      return {
        topic: decoded.topic,
        payload: decoded.payload,
      };
    }
  } catch (e) {
    return undefined;
  }
  return undefined;
}

function isPlainObject(variable: unknown): variable is Record<string, unknown> {
  return Object.prototype.toString.call(variable) === '[object Object]';
}
