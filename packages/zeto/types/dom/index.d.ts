import { ElementAttributes } from '../parser';
import { State } from '../state';
import { ZetoElement, ZetoFragment, ZetoTextElement, ZetoDataElement } from './types';

export * from './types';

export function createFragment(...children: ZetoElement[]): ZetoFragment;

export function createText(text: string): ZetoTextElement;

export function createData(value: State<any>): ZetoDataElement;

export function createElement(
  tag: string,
  attributes: ElementAttributes,
  ...children: ZetoElement[]
): ZetoElement;
