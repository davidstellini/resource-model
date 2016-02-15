import {IModel} from "../Model/IModel";
import {IData} from "./IData";
import {IDataAsync} from "./IDataAsync";
import {List} from "../../classes/Helper/List";

export interface IDataList<BaseType extends IModel, T extends IData<BaseType>>  {
  getItem(emptyModelWithID : IModel) :T;
  exists(emptyModelWithID : IModel) :T;
  getAllItems() : List<T>;
  getRange(emptyModelWithIDList : List<IModel>) : T;
  count() : number;

  addItem(modelItem : BaseType) : T;
  removeItem(emptyModelWithID : BaseType) : T;
}
