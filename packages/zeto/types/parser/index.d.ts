import { HTMLElementConstructor } from './html';

export interface ParserOptions {
  keepComment?: boolean;
}

export interface ParserStats {
  current: number;
  parent: HTMLElement;
  element: HTMLElement;
  selected: string;
  status: 'tag' | 'text' | 'comment' | 'data' | null;
  dataTagStatus: {
    stringOpened: boolean;
    stringOpenStr: string;
  };
}

export function parse(code: string, options?: ParserOptions): HTMLElementConstructor;

export * from './html';
export * from './parse';
