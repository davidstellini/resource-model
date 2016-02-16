import {IDataAsync} from "../../../lib/interfaces/Data/IDataAsync";
import {UserModel} from "../Model/UserModel";
import {Config} from "../Config/config";
import * as requestPromise from "request-promise";

export class UserData implements IDataAsync<UserModel> {
  model : UserModel;

  //Typescript: Multiple constructor implementations are not allowed.
  // See: http://stackoverflow.com/questions/12702548/constructor-overload-in-typescript
  constructor();
  constructor(model : UserModel);
  constructor(model? : UserModel){
    this.model = model || new UserModel();
  }


  save() : Promise<UserModel> {
    return this.makePromiseReq('PUT');
  }

  delete() : Promise<UserModel>{
    return this.makePromiseReq('DELETE');
  };


  private makePromiseReq(type : string) : Promise<UserModel>{
    var options = {
      method : type,
      uri : Config.BASEURL + '/users/' + this.model.getIndex(),
      body : this.model,
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
