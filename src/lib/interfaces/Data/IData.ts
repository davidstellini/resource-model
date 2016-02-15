import {IModel} from "../Model/IModel";

//The <T extends IModel> is a workaround for https://github.com/Microsoft/TypeScript/wiki/FAQ#what-is-type-erasure.
export interface IData<T extends IModel> {

   // Must keep model instance.
  model : T;

  //Save/Delete implementation for current object.
  save() : T;
  delete(): T;
}
