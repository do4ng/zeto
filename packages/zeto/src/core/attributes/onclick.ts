// <h1></h1>

import { AttributeProcessor } from '../processors/attribute';

const OnClickProcessor: AttributeProcessor = (props) => {
  const listener = () => {
    if (typeof props.data !== 'function') {
      throw new Error('attribute value must be function');
    }
    (props.data as any)();
  };

  return {
    attribute: ['onClick', 'on:click'],
    keepAttribute: false,

    onMount() {
      props.target.addEventListener('click', listener);
    },

    onDestroy(props) {
      props.target.removeEventListener('click', listener);
    },
  };
};

export { OnClickProcessor };
