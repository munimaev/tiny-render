export interface Strategy {
  update(realRoot: Element, virtualRoot: Element): void;
}
