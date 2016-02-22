import {Serializable} from "./Serializable";
import {ModelFactory} from "./modelFactory";

export abstract class Model extends Serializable implements ModelFactory<Model>  {
  abstract create() : Model;

  //Dynamically get index based on which property was marked with
  //@indexKey annotation.
  getIndex() : string {
    if (this['indexKey'] === undefined)
    {
        return null;
    }

    return this[this['indexKey']];
  }
}

export function indexKey(target, name) {
  target.indexKey = name;
}
