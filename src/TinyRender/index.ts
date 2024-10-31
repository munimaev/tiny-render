import type { NodeSchema } from "./lib/types.ts";
import PropsManager from "./lib/PropsManager.ts";
import NodeCreator from "./lib/NodeCreator.ts";
import DomUpdater from "./lib/DomUpdater.ts";
import DefaultStrategy from "./lib/strategies/DefaultStrategy.ts";
import StyleProcessor from "./lib/processors/StyleProcessor.ts";

class TinyRender {
  private root: Element;
  private virtualRoot: Element;
  public propManager: PropsManager;
  private nodeCreator: NodeCreator;
  public domUpdater: DomUpdater;

  constructor(element: Element) {
    this.root = element;
    this.virtualRoot = document.createElement("div");

    this.propManager = new PropsManager();
    this.propManager.addProcessor(new StyleProcessor());

    this.nodeCreator = new NodeCreator(this.propManager);

    this.domUpdater = new DomUpdater(this.root, new DefaultStrategy());
  }

  render(schema: NodeSchema[] | NodeSchema): TinyRender {
    this.virtualRoot.innerHTML = "";
    this.virtualRoot = this.nodeCreator.createThree(this.virtualRoot, schema);
    this.domUpdater.update(this.virtualRoot);

    return this;
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
