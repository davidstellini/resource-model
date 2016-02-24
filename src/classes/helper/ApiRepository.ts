import {Model} from "../../../lib/interfaces/model/Model";
import {List} from "../../../lib/classes/helper/List";
import {Serializable} from "../../interfaces/model/Serializable";

import * as requestPromise from "request-promise";
//APIModelList using Request Library
import {DataRepository} from "../../../lib/interfaces/data/DataRepository";
import request = require('request');
import {ModelFactory} from "../../interfaces/model/modelFactory";

import {DefaultApiParser} from "./DefaultApiParser";
import {ApiItemParser} from "./ApiParser";

export abstract class ApiRepository<T extends Model> implements DataRepository<T>
{
    ///Return current url with no trailing slash
    abstract getUrl() : string;
    factory : ModelFactory<T>;

    exists(modelID : string) : Promise<boolean> {
      throw new Error("Not implemented.");
    }

    getRange(modelIDList : List<string>) : Promise<List<T>> {
      throw new Error("Not implemented.");
    }
    count() : number {
      throw new Error("Not implemented.");
    }

    //Build request options
  buildReqOptions(requestType : string, url : string, model : any) : any {

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


  buildRequestAndParseAsT<T extends Model> (
    url : string,
    requestType : string,
    parser : ApiItemParser<T>,
    model : T
  ) : Promise<T> {
    let options = this.buildReqOptions(requestType, url, model);

    return new Promise<T>( (resolve, reject) =>{
      requestPromise(options).promise().then((response) =>
      {
        resolve(parser.Parse(response));
      });
    });
  }

  buildRequestAndParseAsTList<T extends Model> (
    url : string,
    requestType : string,
    parser : ApiItemParser<T>,
    model : T
  ) : Promise<List<T>> {

    let options = this.buildReqOptions(requestType, url, model);

    return new Promise<List<T>>( (resolve, reject) =>{
      requestPromise(options).promise().then((response) =>
      {
        resolve(parser.ParseList(response));
      });
    });
  }


  /** Makes a request. If model is not null, it will pass it to the request
  as JSON. It will parse the response using the parser function provided,
  encapsulated in a promise. Uses default item parser. */
   buildRequestAndParseAsModel (
     url : string,
     requestType : string,
     model : any
   ) : Promise<T> {

     let options = this.buildReqOptions(requestType, url, model);
     let responseParser = new DefaultApiParser(this.factory);

     return this.buildRequestAndParseAsT<T>(url, requestType, responseParser, model);
   }

   //Build a request with list type.
   buildRequestAndParseAsModelList(
     url : string,
     requestType : string,
     model : any
   ) : Promise<List<T>> {

     let options = this.buildReqOptions(requestType, url, model);
     let responseParser = new DefaultApiParser(this.factory);

     return this.buildRequestAndParseAsTList<T>(url, requestType, responseParser, model);
   }


  getItem(modelID : string) : Promise<T> {
    return this.buildRequestAndParseAsModel(
      this.getUrl() + '/' + modelID,
      'GET',
      null
    );
  }


  getAllItems() : Promise<List<T>> {
    return this.buildRequestAndParseAsModelList(
      this.getUrl(),
      'GET',
      null
    );
}

  addItem(modelItem : T) : Promise<T> {
    return this.buildRequestAndParseAsModel(
      this.getUrl(),
      'POST',
      modelItem
    );
}

//TODO: Investigate - removeItem obviously won't return an item because it has been removed.
// check how API is working
  removeItem(emptyModelWithID : T) : Promise<T> {
    return this.buildRequestAndParseAsModel(
      this.getUrl() + '/' + emptyModelWithID,
      'DELETE',
      null
    );
  }


  saveItem(modelItem : T) : Promise<T> {
    return this.buildRequestAndParseAsModel(
      this.getUrl(),
      'PUT',
      modelItem
    );
  }
}
