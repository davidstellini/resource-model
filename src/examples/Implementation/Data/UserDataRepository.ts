import {IModel} from "../../../lib/interfaces/Model/IModel";
import {List} from "../../../lib/classes/Helper/List";
import * as requestPromise from "request-promise";
import {Config} from "../Config/config";
import {UserModel} from "../Model/UserModel";
//APIModelList using Request Library
import {IDataRepositoryAsync} from "../../../lib/interfaces/Data/IDataRepositoryAsync";

export class UserDataRepository implements IDataRepositoryAsync<UserModel>
{
  url = '/users';


    exists(emptyModelWithID : IModel) : Promise<boolean> {
      throw new Error("Not implemented.");
    }

    getRange(emptyModelWithIDList : List<IModel>) : Promise<List<UserModel>> {
      throw new Error("Not implemented.");
    }
    count() : number {
      throw new Error("Not implemented.");
    }


  getItem(emptyModelWithID : IModel) : Promise<UserModel> {
    var options = {
      method : 'GET',
      uri : Config.BASEURL + this.url + '/' + emptyModelWithID.getIndex()
    }

    return new Promise<UserModel>( (resolve, reject) =>{
      requestPromise(options).promise().then((response) =>
      {
        resolve((new UserModel()).parse<UserModel>(response));
      });
    });
  }


  getAllItems() : Promise<List<UserModel>> {
    var options = {
      method : 'GET',
      uri : Config.BASEURL + this.url
    }

    return new Promise<List<UserModel>>( (resolve, reject) =>{
     requestPromise(options).promise().then((response) =>{
        var items : List<UserModel>  = new List<UserModel>();
        var resp = JSON.parse(response);
        resp.payload.forEach(modelListItem =>
        {
          var model = new UserModel();
          model.FromJson(modelListItem);

          items.add(model);
        });

        resolve(items);
      });
  });
}

  addItem(modelItem : UserModel) : Promise<UserModel> {
         var options = {
           method : 'POST',
           uri : Config.BASEURL + this.url,
           body : modelItem,
           json : true
         }

         //todo: Can be generic
         return new Promise<UserModel>( (resolve, reject) =>{
           requestPromise(options).promise().then((response) =>
           {
               resolve((new UserModel()).parse<UserModel>(response));
           });
         });
       }


  removeItem(emptyModelWithID : UserModel) : Promise<UserModel> {
    var options = {
      method : 'DELETE',
      uri : Config.BASEURL + this.url,
      body : emptyModelWithID,
      json : true
    }

    //todo: Can be generic
    return new Promise<UserModel>( (resolve, reject) =>{
      requestPromise(options).promise().then((response) =>
      {
          resolve((new UserModel()).parse<UserModel>(response));
      });
    });
  }



  saveItem(modelItem : UserModel) : Promise<UserModel> {
    return this.makePromiseReq('PUT', modelItem);
  }

  delete(emptyModelWithID : UserModel): Promise<UserModel> {
    return this.makePromiseReq('DELETE', emptyModelWithID);
  };


  private makePromiseReq(type : string, model : UserModel) : Promise<UserModel>{
    var options = {
      method : type,
      uri : Config.BASEURL + '/users/' + model.getIndex(),
      body : model,
      json : true
    }

    return new Promise<UserModel>( (resolve, reject) =>{
        requestPromise(options).promise().then((response) =>
        {
          let parsedUser : UserModel = null;

          try {
            parsedUser = (new UserModel).parse<UserModel>(response);
            resolve(parsedUser);
          } catch (ex) {
            resolve(parsedUser);
          };
      });
    });
  }

}
