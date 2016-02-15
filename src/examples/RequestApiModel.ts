import {IAsyncModel} from "../lib/interfaces/IAsyncModel";
import {IModel} from "../lib/interfaces/IModel";
import * as requestPromise from "request-promise";

//APIModelList using Request Library
export class RequestApiModel<T extends IModel> implements IAsyncModel<T> {
    baseUrl : string;
    model : T;

    constructor(model){
      this.model = model;
    }

    public static FromModel<T extends IModel>(model : T) : RequestApiModel<T>{
      return new RequestApiModel<T>(model);
    }

    /** Auth is implemented separately of this library
    setAuth(authToken : string){

    }*/

    private makePromiseReq(type : string) : Promise<T>{
      var options = {
        method : type,
        uri : this.baseUrl,
        body : this.model,
        json : true
      }

      return requestPromise(options).promise();
    }


    save() : Promise<T> {
      return this.makePromiseReq('POST');
    }

    delete() : Promise<T>{
      return this.makePromiseReq('DELETE');
    };

}
