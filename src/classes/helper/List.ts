import es6Coll = require("es6-collections");

export class List<T> {
    private items: Array<T>;

    constructor() {
        this.items = [];
    }

    size(): number {
        return this.items.length;
    }

    add(value: T): void {
        this.items.push(value);
    }

    get(index: number): T {
        return this.items[index];
    }

    first() : T {
      if (this.size() > 0){
        return this.items[0];
      } else {
        return null;
      }
    }

    last() : T {
      if (this.size() > 0){
        return this.items[this.size() -1];
      } else {
        return null;
      }
    }

}
