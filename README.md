# Zeto

Zeto is a frontend library

## Features

- Without Compile
- Easy to use
- Typescript Supported

```ts
import { html, render } from 'zeto';

const target = document.getElementById('app');
const element = html`<h1>Hello World</h1>`;

render(target, element);
```

## State

```ts
import { html, state } from 'zeto';

const [count, setCount] = state(0);

const element = html`
  <h1>Count: ${count}</h1>

  <button
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
  </button>
`;
```

## License

[MIT](/LICENSE)
