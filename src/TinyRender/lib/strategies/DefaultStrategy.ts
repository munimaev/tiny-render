import { Strategy } from "./strategyTypes";

class DefaultStrategy implements Strategy {
  update(realRoot: Node, virtualRoot: Node): void {
    const realElements: Node[] = Array.from(realRoot.childNodes);
    const virtElements: Node[] = Array.from(virtualRoot.childNodes);
    const maxCount = Math.max(realElements.length, virtElements.length);
    for (let i = 0; i < maxCount; i++) {
      this.compareAndReplace(realRoot, realElements[i], virtElements[i]);
    }
  }

  compareAndReplace(parent: Node, realNode?: Node, virtNode?: Node): void {
    console.log("COMPARE", 13, [realNode, virtNode]);
    if (realNode && virtNode) {
      if (this.isNodeEqual(realNode, virtNode)) {
        this.update(realNode, virtNode);
      } else {
        parent.replaceChild(virtNode, realNode);
      }
    } else if (realNode) {
      parent.removeChild(realNode);
    } else if (virtNode) {
      parent?.appendChild(virtNode);
    }
  }

  isNodeEqual(firstNode: Node, secondNode: Node): boolean {
    if (firstNode.nodeType !== secondNode.nodeType) {
      return false;
    }
    if (firstNode.nodeName !== secondNode.nodeName) {
      return false;
    }
    if (firstNode.nodeValue !== secondNode.nodeValue) {
      return false;
    }
    if (firstNode instanceof Element && secondNode instanceof Element) {
      if (firstNode.tagName !== secondNode.tagName) {
        return false;
      }
      if (!this.isAttributesEqual(firstNode, secondNode)) {
        return false;
      }
    }

    return true;
  }

  isAttributesEqual(firstNode: Element, secondNode: Element): boolean {
    const firstAttrs = firstNode.attributes;
    const secondAttrs = secondNode.attributes;

    if (firstAttrs.length !== secondAttrs.length) {
      return false;
    }

    for (let first of firstAttrs) {
      const second = secondNode.getAttribute(first.name);

      if (second === null || first.value !== second) {
        return false;
      }
    }

    return true;
  }
}
export default DefaultStrategy;
