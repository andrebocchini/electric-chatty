export default class ElementKeyIndexer {
  public readonly key: string;

  private index = 0;

  constructor(key: string) {
    this.key = key;
  }

  increment() {
    this.index += 1;
    return this.toString();
  }

  toString() {
    return `${this.key}_${this.index}`;
  }
}
