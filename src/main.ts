import "./style.css";
import { createRoot } from "./TinyRender";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>Empty page</div>
`;

createRoot("#app").render([
  {
    tag: "h2",
    props: {
      class: "class1",
      id: "wrapper",
      children: { tag: "span", props: { children: ["HELLO"] } },
      style: { color: "lightblue", "margin-bottom": "-10px" },
    },
  },
  {
    tag: "h3",
    props: {
      class: "class1",
      id: "wrapper",
      children: { tag: "span", props: { children: "WORLD" } },
      style: "color:darkblue",
    },
  },
  {
    tag: "div",
    props: {
      children: [
        { tag: "span", props: { children: "Link to the " } },
        {
          tag: "a",
          props: {
            href: "/play.html",
            target: "_self",
            children: { tag: "i", props: { children: "play room" } },
          },
        },
        { tag: "span", props: { children: "." } },
      ],
    },
  },
  {
    tag: "hr",
  },
  {
    tag: "div",
    props: {
      style: undefined,
      children: [
        "Different primitives: ",
        null,
        NaN,
        undefined,
        false,
        true,
        1,
        0,
        "",
        -0,
      ],
    },
  },
]);