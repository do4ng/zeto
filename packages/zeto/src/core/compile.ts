import { parse } from '../parser';
import { State } from '../state';
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
        } else if (key === '__combine_data') {
          attributes = {
            ...attributes,
            ...value,
          };
        } else {
          attributes[key] =
            data[Number((value as unknown as State<any>).value.slice(1, -1))];
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
