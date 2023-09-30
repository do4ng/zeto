/* eslint-disable no-return-assign */
import { isJSON } from '$zeto/lib/isJson';

import '../setup';

import { Symbols } from '../symbols';

export interface State<T> {
  value: T;
  $$: {
    [key: typeof Symbols.state]: boolean;
    id: symbol;
  };
}

function stateChanged(id: symbol, to: any) {
  for (const target of window.$$zeto.state[id]) {
    switch (target.type) {
      case 'attribute-ref':
        if (!isJSON(to)) {
          throw new Error('"attribute-ref must be JSON (excluding array)"');
        }

        Object.keys(to).forEach((key) => {
          (target.element as HTMLElement).setAttribute(key, to[key]);
        });

        break;

      case 'attribute':
        (target.element as HTMLElement).setAttribute(target.target, to);

        break;

      case 'text':
        (target.element as Text).nodeValue = to;
        break;

      default:
        break;
    }
  }
}

function validType(v?: any) {
  const type = typeof v;

  if (type === 'bigint' || type === 'number') {
    return true;
  }

  if (type === 'boolean') {
    return true;
  }

  if (type === 'string') {
    return true;
  }

  if (type === 'undefined') {
    return true;
  }

  if (type === 'object') {
    return true;
  }

  return false;
}

// eslint-disable-next-line no-unused-vars
export function state<T>(init: T = undefined): [State<T>, (value: T) => void] {
  if (!validType(init)) {
    throw new Error(
      'state value type must be "string", "number", "object", "undefined", "boolean"'
    );
  }

  const value = {
    $$: {
      [Symbols.state]: true,
      id: Symbol(`state-${init}`),
    },
    value: init,
  };

  if (!window.$$zeto.state[value.$$.id]) window.$$zeto.state[value.$$.id] = [];

  return [
    value,
    (v) => {
      if (!validType(init)) {
        throw new Error(
          'state value type must be "string", "number", "object", "undefined", "boolean"'
        );
      }
      value.value = v;
      stateChanged(value.$$.id, v);
    },
  ];
}
