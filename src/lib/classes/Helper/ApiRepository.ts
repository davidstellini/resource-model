import {IModel} from "../../../lib/interfaces/Model/IModel";
import {List} from "../../../lib/classes/Helper/List";

import * as requestPromise from "request-promise";
//APIModelList using Request Library
import {IDataRepositoryAsync} from "../../../lib/interfaces/Data/IDataRepositoryAsync";

import request = require('request');

export abstract class ApiRepository<T extends IModel> implements IDataRepositoryAsync<T>
{
    ///Return current url with no trailing slash
    abstract getUrl() : string;

    /// Return an instance of the model. Type erasure limitation, new T() not possible.
    abstract modelFactory() : T;

    exists(emptyModelWithID : IModel) : Promise<boolean> {
      throw new Error("Not implemented.");
    }

    getRange(emptyModelWithIDList : List<IModel>) : Promise<List<T>> {
      throw new Error("Not implemented.");
    }
    count() : number {
      throw new Error("Not implemented.");
    }

    //Build request options
  private buildReqOptions(requestType : string, url : string, model : T) : any {

    var options = {
      method : requestType,
      uri : url
    }

    if (model !== null){
      options['json'] = true;
      options['body'] = model;
    }

    return options;
  }

  /** Makes a request. If model is not null, it will pass it to the request
  as JSON. It will parse the response using the parser function provided,
  encapsulated in a promise */
   private buildRequestAndParseAsModel (
     url : string,
     requestType : string,
     responseParser : (response : string) => T,
     model : T
   ) : Promise<T> {

     let options = this.buildReqOptions(requestType, url, model);

     return new Promise<T>( (resolve, reject) =>{
       requestPromise(options).promise().then((response) =>
       {
         resolve(responseParser(response));
       });
     });
   }

   //Build a request with list type.
   private buildRequestAndParseAsModelList(
     url : string,
     requestType : string,
     responseParser : (response : string) => List<T>,
     model : T
   ) : Promise<List<T>> {

     let options = this.buildReqOptions(requestType, url, model);

     return new Promise<List<T>>( (resolve, reject) =>{
       requestPromise(options).promise().then((response) =>
       {
         resolve(responseParser(response));
       });
     });
   }

   private oneItemParser(response : string) : T{
     return (this.modelFactory()).parse<T>(response);
   }

   private manyItemParser(response : string) : List<T> {
     var items : List<T>  = new List<T>();
     var resp = JSON.parse(response);
     resp.payload.forEach(modelListItem =>
     {
       var model = this.modelFactory();
       model.FromJson(modelListItem);

       items.add(model);
     });

     return items;
   }



  getItem(emptyModelWithID : IModel) : Promise<T> {
    return this.buildRequestAndParseAsModel(
      this.getUrl() + '/' + emptyModelWithID.getIndex(),
      'GET',
      this.oneItemParser,
      null
    );
  }


  getAllItems() : Promise<List<T>> {
    return this.buildRequestAndParseAsModelList(
      this.getUrl(),
      'GET',
      this.manyItemParser,
      null
    );
}

  addItem(modelItem : T) : Promise<T> {
    return this.buildRequestAndParseAsModel(
      this.getUrl(),
      'POST',
      this.oneItemParser,
      modelItem
    );
}

//TODO: Investigate - removeItem obviously won't return an item because it has been removed.
// check how API is working
  removeItem(emptyModelWithID : T) : Promise<T> {
    return this.buildRequestAndParseAsModel(
      this.getUrl() + '/' + emptyModelWithID,
      'DELETE',
      this.oneItemParser,
      null
    );
  }


  saveItem(modelItem : T) : Promise<T> {
    return this.buildRequestAndParseAsModel(
      this.getUrl(),
      'PUT',
      this.oneItemParser,
      modelItem
    );
  }

}
