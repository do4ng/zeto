import { ElementAttributes } from '../parser/html';
import { State } from '../state';

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
