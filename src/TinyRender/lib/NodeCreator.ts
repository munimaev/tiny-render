import type {
  NodeSchema,
  ElementSchema,
  TextSchema,
  ElementProps,
} from "./types.ts";
import PropsManager from "./PropsManager.ts";

class NodeCreator {
  private propsProcessor: PropsManager;

  constructor(propPrcsr: PropsManager) {
    this.propsProcessor = propPrcsr;
  }

  createThree(root: Element, schema: NodeSchema[] | NodeSchema): Element {
    const elements = this.createNodesArray(schema);
    elements.forEach((el) => {
      root.appendChild(el);
    });

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
    const noChildrenProps = this.childrenProcessing(element, schema.props);

    return this.propsProcessor.applyAllProcessor(element, noChildrenProps);
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
