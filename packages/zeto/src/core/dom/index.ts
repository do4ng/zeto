/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable no-use-before-define */
import { ElementAttributes } from '$zeto/src/parser';
import { State } from '$zeto/src/state';
import { Symbols } from '$zeto/src/symbols';
import { processorAttribute } from '../processors/attribute';

export interface RefElement {
  children: ZetoElement[];
  parent?: ZetoElement;
}

export interface ZetoHTMLElement extends RefElement {
  tag: string;
  attributes: ElementAttributes;
  element: HTMLElement;
  type: 'element';
}

export interface ZetoTextElement extends RefElement {
  element: Text;
  text: string;
  type: 'text';
}

export interface ZetoDataElement extends RefElement {
  element: Text;
  value: State<any>;
  type: 'data';
}

export interface ZetoFragment extends RefElement {
  type: 'fragment';
  $$fragment: symbol;
}

export type ZetoElement =
  | ZetoHTMLElement
  | ZetoTextElement
  | ZetoDataElement
  | ZetoFragment;

export function createFragment(...children: ZetoElement[]): ZetoFragment {
  const fragment: ZetoFragment = {
    type: 'fragment',
    $$fragment: Symbols.fragment,
    children,
  };

  const components = [];

  fragment.children = children.map((child) => {
    if (child.type === 'data') {
      if (
        typeof child.value === 'object' &&
        child.value?.$$ &&
        child.value?.$$[Symbols.state]
      ) {
        // data
        return { ...createData(child.value), parent: fragment };
      }

      if (
        typeof child.value === 'object' &&
        (child as any).value.$$fragment === Symbols.fragment
      ) {
        // html

        (child.value as unknown as ZetoFragment).children.forEach((child) => {
          components.push({
            ...child,
            parent: fragment,
          });
        });

        return null;
      }

      return { ...createText(child.value as any), parent: fragment };
    }

    if (child.type === 'text') {
      return {
        ...createText(child.text),
        parent: child,
      };
    }
    if (child.type === 'element') {
      return {
        ...createElement(child.tag, child.attributes, ...child.children),
        parent: child,
      };
    }
    return { ...createFragment(...child.children), parent: child };
  });

  fragment.children.push(...components);

  return fragment;
}

export function createText(text: string): ZetoTextElement {
  const element = document.createTextNode(text);

  return {
    type: 'text',
    children: [],
    text,
    element,
  };
}

export function createData(value: State<any>): ZetoDataElement {
  const element = document.createTextNode(value.value);

  window.$$zeto.state[value.$$.id].push({ type: 'text', element });

  return {
    type: 'data',
    children: [],
    value,
    element,
  };
}

export function createElement(
  tag: string,
  attributes: ElementAttributes,
  ...children: ZetoElement[]
): ZetoElement {
  const $: ZetoElement = {
    tag,
    type: 'element',
    attributes,
    children: [],
    element: document.createElement(tag.trim()),
  };

  $.children = children.map((child) => {
    if (child.type === 'data') {
      if (
        typeof child.value === 'object' &&
        child.value?.$$ &&
        child.value?.$$[Symbols.state]
      ) {
        // data
        return { ...createData(child.value), parent: $ };
      }

      if (typeof child.value === 'object' && (child as any).$$fragment) {
        // html
        $.children.push(...child.children);

        return null;
      }

      return { ...createText(child.value as any), parent: $ };
    }
    if (child.type === 'text') {
      return {
        ...createText(child.text),
        parent: $,
      };
    }
    if (child.type === 'element') {
      return {
        ...createElement(child.tag, child.attributes, ...child.children),
        parent: $,
      };
    }
    return { ...createFragment(...child.children), parent: $ };
  });
  $.children.forEach((child) => {
    if (child.type === 'fragment') {
      throw new Error('Fragment must be used in top-level');
    }
    if (child.parent.type === 'fragment') {
      throw new Error('Fragment must be used in top-level');
    }

    child.parent.element.appendChild(child.element);
  });

  processorAttribute($.attributes, $.element);

  return $;
}
