import {IAsyncModel} from "../lib/interfaces/IAsyncModel";
import {IAsyncModelList} from "../lib/interfaces/IAsyncModelList";
import {RequestApiModel} from "./RequestApiModel";
import {IModel} from "../lib/interfaces/IModel";
import {ICtor} from "../lib/interfaces/ICtor"
import * as requestPromise from "request-promise";

//APIModelList using Request Library

export class RequestApiModelList<T extends IModel,
                                RT extends RequestApiModel<T>>
                                implements IAsyncModelList<T, RT>
{
    //Force model to have a default constructor. Workaround/hack for missing
    // where T : new() constraint, so as to be able to initialize a new instance
    // of T()
    instantiatibleModel : ICtor<T>;
    instantiatibleRequestApiModel :  ICtor<RT>;
    baseUrl : string;
    /**
    * Creates a new instance of an ApiModelList:
    * instantiatibleModel */
    constructor(instantiatibleModel : ICtor<T>, instantiatibleRequestApiModel :  ICtor<RT>, baseUrl : string){
      this.instantiatibleModel = instantiatibleModel;
      this.instantiatibleRequestApiModel = instantiatibleRequestApiModel;
      this.baseUrl = baseUrl;
    }

    /** Auth is implemented separately of this library
    setAuth(authToken : string){

    }*/

    private makePromiseReq(type : string, body : Object, uri : string=null) : Promise<RT>{
      if (uri===null) {
        uri = this.baseUrl;
      }

      var options = {
        method : type,
        uri : uri,
        body : body,
        json : true
      }

      return requestPromise(options).promise();
    }

    public addItem(baseModel : T) : Promise<RT>
    {
          return this.makePromiseReq('POST', baseModel);
    }

    public removeItem(modelItem : T) : Promise<RT>{
      return this.makePromiseReq('DELETE', modelItem);
    };


    public getAll() : Promise<Array<RT>> {
      var respList = new Array<RT>();

      var options = {
        method : 'GET', uri :  this.baseUrl + "/"
      }

      var getAllPromise = new Promise<Array<RT>>( (resolve, reject) =>{
        requestPromise(options).promise().then((response) =>{
            response.payload.forEach(modelListItem =>
            {
              //Parse list item
              var newApiModel = new this.instantiatibleModel();
              var newReqApiModel = new this.instantiatibleRequestApiModel();

              var modelFromPayload = newApiModel.parse<T>(modelListItem);
              newReqApiModel.model = modelFromPayload;

              //Wrap with API
              respList.push(newReqApiModel);
            });

            resolve(respList);
        });
      });

      return getAllPromise;
    }

    public getItem(modelItem : T) : Promise<RT>
    public getItem(index : string) : Promise<RT>;
    public getItem(arg  : T  | string) : Promise<RT>{
      var getRequestUri  =  this.baseUrl + "/";
      if (typeof arg === typeof this.instantiatibleModel){
          getRequestUri += (<T>arg).getIndex();
      } else {
          getRequestUri += arg;
      }

      var options = {
        method : 'GET', uri : getRequestUri,
      }

      var getReqPromise =  requestPromise(options).promise();


      return new Promise<RT>( (resolve, reject) =>{
          getReqPromise.then((response) => {
           var newApiModel = new this.instantiatibleModel();
           var newReqApiModel = new this.instantiatibleRequestApiModel();

           var modelFromPayload = newApiModel.parse<T>(response.payload[0]);
           newReqApiModel.model = modelFromPayload;

           resolve(newReqApiModel);
          });
        });
    }

}
