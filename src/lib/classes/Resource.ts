import {IAPI} from "../interfaces/IAPI";
import {IModel} from "../interfaces/IModel";
import {Promise} from "es6-promise";



export abstract class Resource<T extends IModel>{
    instantiatibleModel : ICtor<T>;

    constructor(typeScriptObjWithCtor : ICtor<T>){
      this.instantiatibleModel = typeScriptObjWithCtor;
    }

    getEmpty() : T {
      return new this.instantiatibleModel();
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
