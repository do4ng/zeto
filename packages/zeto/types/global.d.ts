export interface ZetoStateElement {
  type: 'attribute-ref' | 'attribute' | 'text';
  element: HTMLElement | Text;
  target?: string;
}

export interface ZetoWindow {
  state: Record<symbol, Array<ZetoStateElement>>;
}

declare global {
  interface Window {
    $$zeto: ZetoWindow;
  }
}

export {};
