/* eslint-disable no-unused-vars */

import { ElementAttributes } from '$zeto/src/parser';
import { State } from '$zeto/src/state';
import { AttributeProcessors } from '../attributes/processors';

export interface AttributeProcessorProps {
  target: HTMLElement;
  data: any;
}

export interface AttributeProcessorOutput {
  /**
   * `["id", "onClick"]`
   */
  attribute: string[];
  /**
   * + `true`
   *
   * `<h1 keep>`
   *
   * + `false`
   *
   * `<h1>`
   */
  keepAttribute: boolean;

  onMount?: (props: AttributeProcessorProps) => void;
  onDestroy?: (props: AttributeProcessorProps) => void;
  onBeforeUpdate?: (props: AttributeProcessorProps) => void;
  onAfterUpdate?: (props: AttributeProcessorProps) => void;
}

/**
 * Attribute Processors are run when attribute value is data (inserted data (state...))
 */
export type AttributeProcessor = (
  props: AttributeProcessorProps
) => AttributeProcessorOutput;

export function processorAttribute(attributes: ElementAttributes, target: HTMLElement) {
  Object.keys(attributes).forEach((attribute) => {
    const value = attributes[attribute];

    if (typeof value !== 'string') {
      AttributeProcessors.forEach((processor) => {
        const props = {
          data: value as unknown as State<any>,
          target,
        };
        const processorResult = processor(props);

        if (!processorResult.attribute.includes(attribute)) return;

        if (processorResult.onMount) {
          processorResult.onMount(props);
        }
      });
    } else {
      target.setAttribute(attribute, value);
    }
  });
}
