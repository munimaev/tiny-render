import type { ElementProps } from "./types.ts";
import { Processor, ApplyArguments } from "./processors/processorTypes.ts";
import DefaultProcessor from "./processors/DefaultProcessor.ts";

class ProcessorController {
  private processors: Processor[] = [];
  private defaultProcessor: DefaultProcessor;

  constructor() {
    this.defaultProcessor = new DefaultProcessor();
  }

  addProcessor(processor: Processor): void {
    this.processors.push(processor);
  }

  applyAllProcessor(element: HTMLElement, props?: ElementProps): Node {
    let elementWithProps: ApplyArguments = [element, props];
    for (let processor of this.processors) {
      elementWithProps = processor.apply(...elementWithProps);
    }
    const [processedElement] = this.defaultProcessor.apply(...elementWithProps);

    return processedElement;
  }
}

export default ProcessorController;
