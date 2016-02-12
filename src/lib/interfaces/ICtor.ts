import {IModel} from "./IModel";

export interface ICtor<T>{
  new() : T;
}
