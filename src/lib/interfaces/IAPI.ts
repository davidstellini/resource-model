import {Promise} from "es6-promise";

export interface IAPI{

  baseURL : string;

  save(url : string, model : any) : Promise<any>;

  get(url : string) : Promise<any>;

  delete(url : string): Promise<any>;
}
