import {IAsyncModel} from "./IAsyncModel";
import {IModel} from "./IModel";

export interface IAsyncModelList<BaseType extends IModel, T extends IAsyncModel<BaseType>>  {
  addItem(modelItem : BaseType) : Promise<T>;
  removeItem(modelItem : BaseType) : Promise<T>;
  getItem(modelItem : BaseType) : Promise<T>;
}
