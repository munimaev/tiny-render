import { Strategy } from "./strategyTypes";

class ReplaceStrategy implements Strategy {
  update(realRoot: Element, virtualRoot: Element): void {
    realRoot.innerHTML = "";
    const subElements = Array.from(virtualRoot.childNodes);
    for (let element of subElements) {
      realRoot.appendChild(element);
    }
  }
}

export default ReplaceStrategy;
