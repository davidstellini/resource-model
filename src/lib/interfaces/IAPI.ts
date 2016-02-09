import {Promise} from "es6-promise";

export interface IModelApi<T extends IModel>{

  baseURL : string;

  put(url : string, model : T) : Promise<any>;

  get(url : string) : Promise<any>;

  delete(url : string): Promise<any>;
}
