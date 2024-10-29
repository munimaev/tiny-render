import type { ElementProps } from "./types.ts";

class PropsProcessor {
  removeProp(key: string, props?: ElementProps) {
    if (!props || !props.hasOwnProperty(key)) {
      return props;
    }
    const propsCopy = { ...props };
    delete propsCopy[key];
    return propsCopy;
  }

  applyAll(element: HTMLElement, props?: ElementProps): Node {
    const noStyleProps = this.applyStyle(element, props);
    // more specific processors can be added here
    return this.applyAttributes(element, noStyleProps);
  }

  applyStyle(
    element: HTMLElement,
    props?: ElementProps
  ): ElementProps | undefined {
    if (!props || !props.hasOwnProperty("style")) {
      return props;
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
    return propsCopy;
  }

  applyAttributes(element: HTMLElement, props?: ElementProps): Node {
    const propsCopy = this.removeProp("children", props);
    if (propsCopy) {
      for (let prop in props) {
        element.setAttribute(prop, props[prop]);
      }
    }
    return element;
  }
}

export default PropsProcessor;
