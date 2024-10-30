import "./style.css";
import "../public/play.css";
import { createRoot } from "./TinyRender";

const data: Record<string, any> = {
  "One string": {
    tag: "div",
    props: {
      class: "class1",
      id: "wrapper",
      children: {
        tag: "h2",
        props: {
          children: "HELLO WORLD!",
        },
      },
    },
  },
  "Multiple primitives": {
    tag: "div",
    props: {
      class: "class1",
      id: "wrapper",
      children: {
        tag: "h2",
        props: {
          children: [
            "HELL",
            0,
            " ",
            "W",
            -0,
            "RLD",
            null,
            false,
            NaN,
            "!",
            true,
          ],
        },
      },
    },
  },
  "Multiple elements": {
    tag: "div",
    props: {
      class: "class1",
      id: "wrapper",
      children: {
        tag: "h2",
        props: {
          children: [
            { tag: "i", props: { children: "HELLO" } },
            { tag: "span", props: { children: " " } },
            { tag: "b", props: { children: "WORLD" } },
            { tag: "span", props: { children: "!" } },
          ],
        },
      },
    },
  },
  "Mixed elements": {
    tag: "div",
    props: {
      class: "class1",
      id: "wrapper",
      children: {
        tag: "h2",
        props: {
          children: [
            { tag: "b", props: { children: "HELLO" } },
            " ",
            { tag: "i", props: { children: "WORLD!" } },
            "!",
          ],
        },
      },
    },
  },
  "Add style": {
    tag: "div",
    props: {
      class: "class1",
      id: "wrapper",
      children: {
        tag: "h2",
        props: {
          children: [
            {
              tag: "i",
              props: {
                children: "HELLO ",
                style: { color: "lightblue", fontwight: "bold" },
              },
            },
            {
              tag: "b",
              props: {
                children: "WORLD!",
                style: "color:darkblue; text-transform: italic",
              },
            },
          ],
        },
      },
    },
  },
  "Branches 2 / 2": {
    tag: "div",
    props: {
      class: "class1",
      id: "wrapper",
      children: [
        {
          tag: "h2",
          props: {
            children: [
              { tag: "b", props: { children: "HELLO " } },
              { tag: "i", props: { children: "MY" } },
            ],
          },
        },
        {
          tag: "h2",
          props: {
            children: [
              { tag: "strong", props: { children: "PERFECT " } },
              { tag: "em", props: { children: "WORLD!" } },
            ],
          },
        },
      ],
    },
  },
  "Branches 1 / 2": {
    tag: "div",
    props: {
      class: "class1",
      id: "wrapper",
      children: [
        {
          tag: "h2",
          props: {
            children: [{ tag: "b", props: { children: "HELLO " } }],
          },
        },
        {
          tag: "h2",
          props: {
            children: [
              { tag: "strong", props: { children: "PERFECT " } },
              { tag: "em", props: { children: "WORLD!" } },
            ],
          },
        },
      ],
    },
  },
  "Branches 1 / 3": {
    tag: "div",
    props: {
      class: "class1",
      id: "wrapper",
      children: [
        {
          tag: "h2",
          props: {
            children: [{ tag: "b", props: { children: "HELLO " } }],
          },
        },
        {
          tag: "h2",
          props: {
            children: [
              { tag: "i", props: { children: "MY " } },
              { tag: "strong", props: { children: "PERFECT " } },
              { tag: "em", props: { children: "WORLD!" } },
            ],
          },
        },
      ],
    },
  },
};

const selectors = document.getElementById("selectors");
const applyButton = document.getElementById("apply");
const afterElement = document.getElementById("after");
const beforeElement = document.getElementById("before");
let before = Object.keys(data)[0];
let after = Object.keys(data)[0];

Object.keys(data).forEach((key) => {
  const button = document.createElement("button");
  button.innerText = key;
  button.addEventListener("click", () => {
    after = key;
    if (afterElement) {
      afterElement.innerText = JSON.stringify(data[key], null, 2);
    }
  });
  selectors?.appendChild(button);
});

const app = createRoot("#polygon").render(data[before]);

if (beforeElement) {
  beforeElement.innerText = JSON.stringify(data[before], null, 2);
}
if (afterElement) {
  afterElement.innerText = JSON.stringify(data[after], null, 2);
}

applyButton?.addEventListener("click", () => {
  app.render(data[after]);
  before = after;
  if (beforeElement) {
    beforeElement.innerText = JSON.stringify(data[before], null, 2);
  }
});
