export type NodeSchema = ElementSchema | TextSchema;

export type ElementSchema = {
  tag: string;
  props?: ElementProps;
};

export type TextSchema = string | number | boolean | null | undefined;

export type ElementProps = {
  class?: string;
  id?: string;
  children?: Array<NodeSchema> | NodeSchema;
  style?: string | Record<string, string>;
  [key: string]: any;
};
