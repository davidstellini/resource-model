import {Model} from "../model/Model";
import {List} from "../../classes/helper/List";
import {ModelFactory} from "../model/modelFactory";

export interface DataRepository<T extends Model>  {
  getItem(modelID : string) : Promise<T>;
  exists(modelID : string) : Promise<boolean>;
  getAllItems() : Promise<List<T>>;
  getRange(modelIDList : List<string>) : Promise<List<T>>;
  count() : number;

  addItem(modelItem : T) : Promise<T>;
  removeItem(emptyModelWithID : T) : Promise<T>;
  saveItem(modelItem : T) : Promise<T>;

  factory : ModelFactory<T>;
}
