import {IAPI} from "../interfaces/IAPI";
import {IModel} from "../interfaces/IModel";
import {Promise} from "es6-promise";



export abstract class Resource<T extends IModel>{
    instantiatibleModel : ICtor<T>;

    constructor(typeScriptObjWithCtor : ICtor<T>){
      this.instantiatibleModel = typeScriptObjWithCtor;
    }

    get() : T {
      return new this.instantiatibleModel();
    }

    put() : Promise<T>{
      return this.api.save(this.getBaseUrl(), this.toJSON(this.model));
    }

    delete() : Promise<T>{
      
    }

}

export function BaseUrl(url: string) {
    return function <TFunction extends Function>(Target: TFunction): TFunction {
        Target.prototype.getBaseUrl = function() {
            return url;
        };
        return Target;
    };
}
