import { ZetoFragment, ZetoHTMLElement } from './core/dom';

export function render(target: HTMLElement, html: ZetoFragment) {
  html.children.forEach((child) => {
    if (child) target.appendChild((child as ZetoHTMLElement).element);
  });
}
