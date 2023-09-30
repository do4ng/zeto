export type CombineData = Array<{ type: 'data'; value: string }>;
export type ElementType = 'element' | 'text' | 'data' | 'fragment' | 'comment';
export type ElementAttributes = Record<
  string,
  | string
  | {
      type: 'data';
      value: string;
    }
  | CombineData
>;

export class HTMLElementConstructor {
  public type: ElementType;

  public tag: string;

  public attributes: ElementAttributes;

  public children: HTMLElementConstructor[];

  public text: string;

  public value: string;

  constructor({
    type,
    tag,
    attributes,
    children,
    text,
  }: {
    type: ElementType;
    tag?: string;
    attributes?: ElementAttributes;
    children?: HTMLElementConstructor[];
    text?: string;
  });

  appendChild(element: HTMLElementConstructor);

  removeChild(element: HTMLElementConstructor);
}
