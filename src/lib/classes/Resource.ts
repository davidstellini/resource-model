import {IAPI} from "../interfaces/IAPI";
import {IModel} from "../interfaces/IModel";
import {Promise} from "es6-promise";

export class Resource{
  api : IAPI;
  model: IModel;

  //Annotation Methods
  protected getBaseUrl(): string {
        return null;
  }

  //helper methods
  private toInstance<T>(obj: T, json: T) : T {
      for (var propName in json) {
          obj[propName] = json[propName]
      }
      return obj;
  }

  private toJSON<T>(obj: T){
    var jsonObj = {};
    for (var propName in obj){
      jsonObj[propName] = obj[propName];
    }
    return jsonObj;
  }


  constructor(api : IAPI, model: IModel){
    this.api = api;
    this.model = model;
  }

  save() : Promise<IModel>{
    return this.api.save(this.getBaseUrl(), this.toJSON(this.model));
  }

  get(): Promise<IModel>{
    return this.api.get(this.getBaseUrl()).then((data) => {
      return this.toInstance(this.model, data);
    });
  }

  delete(): Promise<IModel>{
    return this.api.delete(this.getBaseUrl())
      .then(() => this.model);
  }

}

export function BaseUrl(url: string) {
    return function <TFunction extends Function>(Target: TFunction): TFunction {
        Target.prototype.getBaseUrl = function() {
            return this.api.baseURL + url;
        };
        return Target;
    };
}
