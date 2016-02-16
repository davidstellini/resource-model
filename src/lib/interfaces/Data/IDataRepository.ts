import {IModel} from "../Model/IModel";
import {IData} from "./IData";
import {IDataAsync} from "./IDataAsync";
import {List} from "../../classes/Helper/List";

export interface IDataList<T extends IModel>  {
  getItem(emptyModelWithID : IModel) :T;
  exists(emptyModelWithID : IModel) :T;
  getAllItems() : List<T>;
  getRange(emptyModelWithIDList : List<IModel>) : T;
  count() : number;

  addItem(modelItem : T) : T;
  removeItem(emptyModelWithID : T) : T;
  saveItem(modelItem : T) : T;
  delete(emptyModelWithID : T): T;
}
