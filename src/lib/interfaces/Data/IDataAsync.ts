import {IModel} from "../Model/IModel";
import {IData} from "./IData";
import {IDataAsync} from "./IDataAsync";
import {List} from "../../classes/Helper/List";

//The <T extends IModel> is a workaround for https://github.com/Microsoft/TypeScript/wiki/FAQ#what-is-type-erasure.
export interface IDataAsync<T extends IModel> {
   // Must keep model instance.
  model : T;

  //Save/Delete implementation for current object.
  save() : Promise<T>;
  delete(): Promise<T>;
}
