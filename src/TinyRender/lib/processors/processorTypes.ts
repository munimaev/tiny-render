import { ElementProps } from "../types";

export type ApplyArguments = [HTMLElement, ElementProps | undefined];

export interface Processor {
  apply(element: HTMLElement, props?: ElementProps): ApplyArguments;
}

export abstract class AbstractProcessor implements Processor {
  removeProp(key: string, props?: ElementProps): ElementProps | undefined {
    if (!props || !props.hasOwnProperty(key)) {
      return props;
    }
    const propsCopy = { ...props };
    delete propsCopy[key];

    return propsCopy;
  }

  abstract apply(element: HTMLElement, props?: ElementProps): ApplyArguments;
}
