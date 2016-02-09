import {IAPI} from "../interfaces/IAPI";
import {IModel} from "../interfaces/IModel";
import {Promise} from "es6-promise";



export abstract class Resource<T extends IModel>{
  api : IAPI;
  model: T;
  instantiatibleModel : new() => T;
  models: Array<IModel>;


  abstract getUrl() : string;

  //Annotation Methods
  protected getBaseUrl(): string {
        return null;
  }

  //helper methods
  private toInstance(obj: any, json: any) : any {

    //return new T();

      for (var propName in json) {
          obj[propName] = json[propName]
      }
      return obj;
  }

  private toJSON(obj: any) : any{
    var jsonObj = {};
    for (var propName in obj){
      jsonObj[propName] = obj[propName];
    }
    return jsonObj;
  }

  constructor(api : IAPI,  modelWithctor : { new(): T }){
    this.api = api;
    this.instantiatibleModel = modelWithctor;
  //  this.model = modelType;
   // this.modelTest = new ({new(): modelType; })();
  }

  save() : Promise<T>{
    return this.api.save(this.getBaseUrl(), this.toJSON(this.model));
  }

  get(): Promise<T>{
    var url : string = this.getBaseUrl();

      //var inst = new this.instantiatibleModel();



    // if (this.model.id){ //or ference model map
    //   url += "/" + this.model.id;
    //   isList = false;
    // }

    return this.api.get(url).then((data) => {

        return this.toInstance(new this.instantiatibleModel(), data);

    });
  }

  delete(): Promise<T>{
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
