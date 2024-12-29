import { INNER_MESSAGE } from './constants';

export const GLOBAL_UNIQUE_ID = Symbol('__USE_IFRAME_ID__');

export interface GlobalObject {
  [GLOBAL_UNIQUE_ID]?: { [key: string]: number };
}

export interface Options {
  // 通信主题 ID，用于区分不同的通信
  topic: string;
  // iframe ref, 父页面必须传递
  ref?: React.RefObject<HTMLIFrameElement>;
  // 最大消息数
  messageMaxLength?: number;

}

export type MessageDispatcher<M> = (message: M) => void;

export type UseIframeResult<M> = [MessageDispatcher<M>];

export type MessageHandler<M> = (message: M, dispatch: MessageDispatcher<M>) => void;

export enum InnerMessageType {
  MOUNTED = 'mounted',
}

export interface InnerMessage {
  [INNER_MESSAGE]: boolean;
  type: InnerMessageType | `${InnerMessageType}`;
  payload?: string;
}
