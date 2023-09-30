import { html } from '../../packages/zeto/src/core/html';
import { state } from '../../packages/zeto/src/state';
import { render } from '../../packages/zeto/src/render';

const [count, setCount] = state(0);

const counter = html` <button
    onClick=${() => {
      setCount(count.value + 1);
    }}
  >
    +
  </button>
  <button
    onClick=${() => {
      setCount(count.value - 1);
    }}
  >
    -
  </button>`;

const element = html`
  <h1>${'Count'}: <span style="color: green">${count}</span></h1>

  ${counter}
`;

render(document.getElementById('app') as HTMLElement, element);
