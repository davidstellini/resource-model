import {IModel} from "../../../lib/interfaces/Model/IModel";
import {List} from "../../../lib/classes/Helper/List";
import * as requestPromise from "request-promise";
import {Config} from "../Config/config";
import {UserData} from "./UserData";
import {UserModel} from "../Model/UserModel";
//APIModelList using Request Library

export class UserDataList
{
  url = '/users';


    exists(emptyModelWithID : IModel) : Promise<boolean> {
      throw new Error("Not implemented.");
    }

    getRange(emptyModelWithIDList : List<IModel>) : Promise<List<UserData>> {
      throw new Error("Not implemented.");
    }
    count() : number {
      throw new Error("Not implemented.");
    }


  getItem(emptyModelWithID : IModel) : Promise<UserData> {
    var options = {
      method : 'GET',
      uri : Config.BASEURL + this.url + '/' + emptyModelWithID.getIndex()
    }

    return new Promise<UserData>( (resolve, reject) =>{
      requestPromise(options).promise().then((response) =>
      {
        resolve(new UserData((new UserModel()).parse<UserModel>(response)));
      });
    });
  }


  getAllItems() : Promise<List<UserData>> {
    var options = {
      method : 'GET',
      uri : Config.BASEURL + this.url
    }

    return new Promise<List<UserData>>( (resolve, reject) =>{
     requestPromise(options).promise().then((response) =>{
        var items : List<UserData>  = new List<UserData>();
        var resp = JSON.parse(response);
        resp.payload.forEach(modelListItem =>
        {
          var model = new UserModel();
          model.FromJson(modelListItem);

          items.add(new UserData(model));
        });

        resolve(items);
      });
  });
}

  addItem(modelItem : UserModel) : Promise<UserData> {
         var options = {
           method : 'POST',
           uri : Config.BASEURL + this.url,
           body : modelItem,
           json : true
         }

         //todo: Can be generic
         return new Promise<UserData>( (resolve, reject) =>{
           requestPromise(options).promise().then((response) =>
           {
               resolve(new UserData((new UserModel()).parse<UserModel>(response)));
           });
         });
       }


  removeItem(emptyModelWithID : UserModel) : Promise<UserData> {
    var options = {
      method : 'DELETE',
      uri : Config.BASEURL + this.url,
      body : emptyModelWithID,
      json : true
    }

    //todo: Can be generic
    return new Promise<UserData>( (resolve, reject) =>{
      requestPromise(options).promise().then((response) =>
      {
          resolve(new UserData((new UserModel()).parse<UserModel>(response)));
      });
    });
  }


}
