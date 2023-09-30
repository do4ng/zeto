import { isJSON } from '$zeto/lib/isJson';
import { parse } from '../parser';
import { State } from '../state';
import { Symbols } from '../symbols';
import { ZetoElement, ZetoFragment, createFragment } from './dom';

// eslint-disable-next-line no-unused-vars
function explore(ast: ZetoElement, handler: (ast: ZetoElement) => ZetoElement) {
  handler(ast);

  if (ast.children) {
    ast.children = ast.children.map((child) => explore(child, handler));
  }

  return ast;
}

export function compile(code: string, data: any[]): ZetoFragment {
  const handler = (ast: ZetoElement): ZetoElement => {
    if (ast.type === 'element') {
      let attributes = {};
      Object.keys(ast.attributes).forEach((key) => {
        const value = ast.attributes[key];

        if (typeof value === 'string') {
          attributes[key] = value;
        } else if (key === '__ref_data') {
          const inserting = data[Number(value[0].value.slice(1, -1))];

          if (!isJSON(JSON.stringify(inserting), false)) {
            throw new Error('<... {data}> type must be JSON (not array)');
          }

          attributes = {
            ...attributes,
            ...inserting,
          };
        } else {
          attributes[key] =
            data[Number((value as unknown as State<any>).value.slice(1, -1))];
          if (typeof attributes[key] === 'object' && attributes[key].$$[Symbols.state]) {
            throw new Error('attribute value cannot be state');
          }
        }
      });

      ast.attributes = attributes;
    }

    if (ast.type === 'data') {
      ast.value = data[Number((ast.value as unknown as string).slice(1, -1))];

      return ast;
    }

    return ast;
  };

  const ast = explore(parse(code) as unknown as ZetoFragment, handler);

  const element = createFragment(ast as ZetoFragment);

  return element.children[0] as any;
}
