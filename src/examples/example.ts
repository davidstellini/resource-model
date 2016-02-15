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

  //TODO: @optional, @readonly, @otherValidationAnnotations (ask wallace).
  name: string="defaultName";
  surname: string;
  
  //TODO: @complex. Also need to see about recursive serialization
  // addresses: Array<AddressModel>;
}

class UserModelApi extends RequestApiModel<UserModel>{
  static getBaseUrl(){
    return "http://localhost:3010//api/users";
  }

  public otherCustomMethod() : void {

  }

  constructor(){
    super(UserModel);
  }
}
//==================================================================


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
  user.model.name = "David"; //User type is accessible via generics
  user.save(); //Save -> Make PUT request directly from type returned by service.
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
  //This returns a List<UserWithAPI>
  var user = users[0]; //So once we have one user, 

  user.model.name = "Daniel"; //we can change the model
 user.otherCustomMethod(); //Call any methods that extend our model 

  user.save(); //and make a put request directly from here to update it.
});





// Just an example, we need to work on this. There are many workarounds here because of generic type erasure:
// We cannot instantiate an instance of a type in the class without passing it directly as type info is erased
// in compile time. 
class APIService {
  //UserModelApi is optional, but passing it here means we can extend it and do stuff like call otherCustomMethod 
  //without doing any casting.
  private static _UserListApiService : RequestApiModelList<UserModel, UserModelApi>  = null;
  static get UserListApiService() : RequestApiModelList<UserModel, UserModelApi> {
    return APIService._UserListApiService;
  }

  public static init(){
    APIService._UserListApiService = new RequestApiModelList<UserModel, UserModelApi>(
      UserModel,  UserModelApi, UserModelApi.getBaseUrl()) //UserModel, UserModelApi should not be necessary here, but passing type in constructor
      // seems to be the best workaround http://stackoverflow.com/questions/17382143/how-to-create-a-new-object-from-type-parameter-in-generic-class-in-typescript
  }
}
