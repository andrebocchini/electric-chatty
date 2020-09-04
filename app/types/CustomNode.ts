import { Node } from 'node-html-parser';

export default interface CustomNode extends Node {
  tagName: string;
  rawAttrs: string;
  classNames: string[];
}
