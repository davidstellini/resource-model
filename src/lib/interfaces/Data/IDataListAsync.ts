import {IModel} from "../Model/IModel";
import {IData} from "./IData";
import {IDataAsync} from "./IDataAsync";
import {List} from "../../classes/Helper/List";

export interface IDataListAsync<BaseType extends IModel, T extends IData<BaseType>>  {
  getItem(emptyModelWithID : IModel) : Promise<T>;
  exists(emptyModelWithID : IModel) : Promise<boolean>;
  getAllItems() : Promise<List<T>>;
  getRange(emptyModelWithIDList : List<IModel>) : Promise<List<T>>;
  count() : number;

  addItem(modelItem : BaseType) : Promise<T>;
  removeItem(emptyModelWithID : BaseType) : Promise<T>;
}
