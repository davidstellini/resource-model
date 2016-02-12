import {IModel} from "./IModel";

export interface ICtor<T extends IModel>{
  new() : T;
}
