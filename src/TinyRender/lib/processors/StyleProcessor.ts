import { ElementProps } from "../types";
import { AbstractProcessor, ApplyArguments } from "./processorTypes";

class StyleProcessor extends AbstractProcessor {
  apply(element: HTMLElement, props?: ElementProps): ApplyArguments {
    if (!props || !props.hasOwnProperty("style")) {
      return [element, props];
    }
    const propsCopy = { ...props };
    if (typeof propsCopy.style === "string") {
      element.setAttribute("style", propsCopy.style);
    } else {
      const styleValues: string[] = [];
      for (let style in propsCopy.style) {
        styleValues.push(`${style}:${propsCopy.style[style]}`);
      }
      element.setAttribute("style", styleValues.join(";"));
    }
    delete propsCopy.style;

    return [element, propsCopy];
  }
}

export default StyleProcessor;
