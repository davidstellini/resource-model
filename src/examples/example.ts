//import {Resource,BaseUrl} from "../lib/classes/Resource";
import {IModel, indexKey} from "../lib/interfaces/IModel";
import {IAsyncModel} from "../lib/interfaces/IAsyncModel";
import {RequestApiModelList} from "../examples/RequestApiModelList";
import {RequestApiModel} from "../examples/RequestApiModel";


//These classes should be generated:
//==================================================================
class UserModel extends IModel  {
  @indexKey
  id: number;

  //TODO: @optional annotation.
  name: string="defaultName";
  surname: string;
  // addresses: Array<AddressModel>;
}

class UserModelApi extends RequestApiModel<UserModel>{
  static getBaseUrl(){
    return "http://localhost:3010/pegasus-ci/api/users";
  }

  public otherCustomMethod() : void {

  }

  constructor(){
    super(UserModel);
  }
}
//==================================================================

class APIService {
  private static _UserListApiService : RequestApiModelList<UserModel, UserModelApi>  = null;
  static get UserListApiService() : RequestApiModelList<UserModel, UserModelApi> {
    return APIService._UserListApiService;
  }

  public static init(){
    APIService._UserListApiService = new RequestApiModelList<UserModel, UserModelApi>(UserModel,  UserModelApi, UserModelApi.getBaseUrl())
  }
}


//Init API:
APIService.init();
var userListSvc = APIService.UserListApiService;



//Create empty instance.
var emptyUser = new UserModel();
emptyUser.id = 10;

//Get index from field marked dynamically.
console.log(emptyUser.getIndex());

//Get user asynchronously
var userFromWebService = userListSvc.getItem('10').then(function(user){
  //Set model value
  user.model.name = "David";
  user.save(); //Save -> Make PUT request.
});

//Create new empty model
var newUser = new UserModel();
newUser.name = "David 2";
newUser.surname = "Stellini";

//Add model using API.
userListSvc.addItem(newUser).then(function(user){
  //Print ID from user returned via generics
  console.log(user.model.id);
  user.delete();
});

userListSvc.getAll().then(users => {
  var user = users[0];

  user.model.name = "Daniel";
 user.otherCustomMethod();
 
  user.save();
});
