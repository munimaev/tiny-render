# TinyRender

TinyRender is a mini-framework in TypeScript designed to render HTML from a schema object and dynamically update the DOM when the config changes.

## Main features

- TinyRender works with a schema of the form:
  ```
  {
    "tag": "div",
    "props": { 
      "class": "class1",
      "id": "wrapper",
      "children": [ /*...*/ ]
    }
  }
  ```
- The `children` field can contain multiple elements, a single element, or a primitive value.
- The framework supports dynamic DOM updating when the configuration changes, replacing only those parts of the structure where changes occurred. To do this, tag names, properties and attributes are compared.

## Important Commands

- `npm run dev` — run project localy
- `npm run build` — standard project build, __dist__ folder
- `npm run build-gh` — project build for publishing on GitHub Pages, __docs__ folder

## Online Demo

- [Simple elements built by the TinyRender framework](https://munimaev.github.io/tiny-render/): here you can see a basic example of rendering.
- [Dynamic update example](https://munimaev.github.io/tiny-render/play.html): here you can see how TinyRender rebuilds the DOM when the configuration changes and handles different props.

## Usage

To use TinyRender in your project, follow these steps:

1. Import the `createRoot` function:
    ```
    import { createRoot } from "./TinyRender";
    ```

2. Create a root element and render your configuration::
   ```
   const app = createRoot("#app").render(youra);
   ```

3. To re-render the changed configuration, call:
   ```
   app.render(newSchema);
   ```

## Expansion of functionality

TinyRender supports two ways to extend functionality:

1. __Adding handlers for new properties__

   You can add custom handlers for specific properties passed in props:
   ```
   app.propManager.addProcessor(yourProcessor);
   ```

2. __Changing DOM update strategy__

   You can add your own strategy for comparing and replacing DOM elements:
   ```
   app.domUpdater.setStrategy(yourStrategy);
   ```