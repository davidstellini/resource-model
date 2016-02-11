//import {Resource,BaseUrl} from "../lib/classes/Resource";
import {IModel, indexKey} from "../lib/interfaces/IModel";
import {IAsyncModel} from "../lib/interfaces/IAsyncModel";
import {RequestApiModelList} from "../examples/RequestApiModelList";
import {RequestApiModel} from "../examples/RequestApiModel";

class UserModel extends IModel {
  @indexKey
  id: number;
  name: string="defaultName";
  surname: string;
  // addresses: Array<AddressModel>;
}
/*
class UserAsyncModel extends UserModel implements IAsyncModel {

}
*/
class APIService {


  private static _UserListApiService : RequestApiModelList<RequestApiModel<UserModel>, UserModel>  = null;

  get UserListApiService() : RequestApiModelList<RequestApiModel<UserModel>, UserModel> {
    return APIService._UserListApiService;
  }

  public static init(){
    var req = new RequestApiModel<UserModel>(UserModel);
    APIService._UserListApiService = new RequestApiModelList<RequestApiModel<UserModel>, UserModel>
    (req, "/api/users");

  }
}


APIService.init();



//
//
// export class UserResource extends Resource<UserModel>{
//   constructor(){
//     super(UserModel);
//   }
//
//   getUrl() : string {
//     return "/user";
//   }
// }

// var userResourceService = new UserResource();
//var user = userResourceService.getEmpty();
//console.log(user.name);
