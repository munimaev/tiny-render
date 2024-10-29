import type { NodeSchema } from "./lib/types.ts";
import PropsProcessor from "./lib/PropsProcessor";
import NodeCreator from "./lib/NodeCreator.ts";

class TinyRender {
  private root: Element;
  private virtualRoot: Element;
  private virtualDom: Node[];
  private propProcessor: PropsProcessor;
  private nodeCreator: NodeCreator;

  constructor(element: Element) {
    this.root = element;
    this.virtualRoot = document.createElement("div");
    this.virtualDom = [];
    this.propProcessor = new PropsProcessor();
    this.nodeCreator = new NodeCreator(this.propProcessor);
  }

  render(schema: NodeSchema[] | NodeSchema): void {
    // create three and  save thre in state
    this.nodeCreator.createThree(this.virtualRoot, schema);
    // compare and replace dom
    this.root.innerHTML = "";
    this.virtualDom.forEach((el) => this.root.appendChild(el));
  }
}

function createRoot(selector: string): TinyRender {
  const element = document.querySelector(selector);
  if (!element) {
    throw Error(`There is now element for root with [${selector}] slector`);
  }
  const tynyRender = new TinyRender(element);
  return tynyRender;
}

export { createRoot };
