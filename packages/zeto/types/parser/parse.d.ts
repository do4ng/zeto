import { HTMLElementConstructor } from './html';

export interface ParserOptions {
  keepComment?: boolean;
}

export interface ParserStats {
  current: number;
  parent: HTMLElementConstructor;
  element: HTMLElementConstructor;
  selected: string;
  // tag: <h1></h1>
  // text: Hello
  // comment: <!--insert data-->
  // data: $1
  status: 'tag' | 'text' | 'comment' | 'data' | null;
  dataTagStatus: {
    stringOpened: boolean;
    stringOpenStr: string;
  };
}

export class Parser {
  code: string;

  options: ParserOptions;

  stats: ParserStats;

  result: HTMLElementConstructor[];

  constructor(code: string, options?: ParserOptions);

  parse(): HTMLElementConstructor;
}
