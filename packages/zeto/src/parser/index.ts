import { Parser, ParserOptions } from './parser';

export function parse(code: string, options?: ParserOptions) {
  const parser = new Parser(code, options);
  parser.parse();

  return parser.stats.parent;
}

export * from './tag';
export * from './parser';
export * from './element';
