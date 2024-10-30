import { ElementProps } from "../types";
import { AbstractProcessor, ApplyArguments } from "./processorTypes";

class DefaultProcessor extends AbstractProcessor {
  apply(element: HTMLElement, props?: ElementProps): ApplyArguments {
    const propsCopy = this.removeProp("children", props);
    if (propsCopy) {
      for (let prop in propsCopy) {
        element.setAttribute(prop, propsCopy[prop]);
      }
    }

    return [element, props];
  }
}

export default DefaultProcessor;
