import { Symbols } from './symbols';

export interface State<T> {
  value: T;
  $$: {
    [key: typeof Symbols.state]: boolean;
    id: symbol;
  };
}
export function state<T = unknown>(init: T): [State<T>, (value: T) => void];
