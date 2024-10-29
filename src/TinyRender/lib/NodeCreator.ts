import type {
  NodeSchema,
  ElementSchema,
  TextSchema,
  ElementProps,
} from "./types.ts";
import PropsProcessor from "./PropsProcessor.ts";

class NodeCreator {
  private propsProcessor: PropsProcessor;

  constructor(propPrcsr: PropsProcessor) {
    this.propsProcessor = propPrcsr;
  }

  createThree(root: Element, schema: NodeSchema[] | NodeSchema): Element {
    root.innerHTML = "";
    const elements = this.createNodesArray(schema);
    elements.forEach((el) => root.appendChild(el));
    return root;
  }

  createNodesArray(schema: NodeSchema[] | NodeSchema): Node[] {
    if (Array.isArray(schema)) {
      return schema.map((item) => this.createNode(item));
    }
    return [this.createNode(schema)];
  }

  createNode(schema: NodeSchema): Node {
    if (schema && typeof schema === "object") {
      return this.createElementNode(schema);
    }
    return this.createTextNode(schema);
  }

  createElementNode(schema: ElementSchema): Node {
    const element = document.createElement(schema.tag);
    this.childrenProcessing(element, schema.props);
    this.propsProcessor.applyAll(element, schema.props);
    return element;
  }

  childrenProcessing(
    element: HTMLElement,
    props?: ElementProps
  ): ElementProps | undefined {
    if (!props || !props.hasOwnProperty("children")) {
      return props;
    }

    const propsCopy = { ...props };
    this.createThree(element, propsCopy.children);
    delete propsCopy.children;
    return propsCopy;
  }

  createTextNode(schema: TextSchema): Node {
    let content = "";
    if (
      typeof schema === "string" ||
      (typeof schema === "number" && !isNaN(schema))
    ) {
      content = String(schema);
    }
    return document.createTextNode(content);
  }
}
export default NodeCreator;
