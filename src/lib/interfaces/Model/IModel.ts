import {Serializable} from "./ISerializable";

export abstract class IModel extends Serializable {


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
