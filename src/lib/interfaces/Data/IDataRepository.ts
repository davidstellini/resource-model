import {IModel} from "../Model/IModel";
import {List} from "../../classes/Helper/List";

export interface IDataRepository<T extends IModel>  {
  getItem(emptyModelWithID : IModel) :T;
  exists(emptyModelWithID : IModel) :T;
  getAllItems() : List<T>;
  getRange(emptyModelWithIDList : List<IModel>) : T;
  count() : number;

  addItem(modelItem : T) : T;
  removeItem(emptyModelWithID : T) : T;
  saveItem(modelItem : T) : T;
}
