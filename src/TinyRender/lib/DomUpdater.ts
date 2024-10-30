import { Strategy } from "./strategies/strategyTypes.ts";

class DomUpdater {
  private root: Element;
  private strategy: Strategy;

  constructor(realRoot: Element, strategy: Strategy) {
    this.root = realRoot;
    this.strategy = strategy;
  }

  setStrategy(strategy: Strategy): void {
    this.strategy = strategy;
  }

  update(virtualRoot: Element): void {
    this.strategy.update(this.root, virtualRoot);
  }
}
export default DomUpdater;
