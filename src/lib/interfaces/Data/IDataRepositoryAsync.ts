import {IModel} from "../Model/IModel";
import {List} from "../../classes/Helper/List";

export interface IDataRepositoryAsync<T extends IModel>  {
  getItem(emptyModelWithID : IModel) : Promise<T>;
  exists(emptyModelWithID : IModel) : Promise<boolean>;
  getAllItems() : Promise<List<T>>;
  getRange(emptyModelWithIDList : List<IModel>) : Promise<List<T>>;
  count() : number;

  addItem(modelItem : T) : Promise<T>;
  removeItem(emptyModelWithID : T) : Promise<T>;
  saveItem(modelItem : T) : Promise<T>;
}
