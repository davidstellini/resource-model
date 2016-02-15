import {IModel} from "./IModel";

//The <T extends IModel> is a workaround for https://github.com/Microsoft/TypeScript/wiki/FAQ#what-is-type-erasure.
export interface IAsyncModel<T extends IModel> {
  
   // Must keep model instance.
    model : T;

  //Save/Delete implementation for current object.
  save() : Promise<T>;
  delete(): Promise<T>;
}
