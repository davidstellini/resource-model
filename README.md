# Resource Model
Allows usage of POTOs (Plain old TypeScript Objects) as models for data layer such as API resource.

## Install npm packages

```sh
$ npm install
```

## Run via webpack

```sh
$ npm start
```

## Examples

The POTO object defines the model as a data object. Properties can be marked using annotations.

##### Model

    //POTO
    class UserModel extends IModel  {
      @indexKey
      id: number;
      name: string="defaultName";
      surname: string;
      // addresses: Array<AddressModel>;
    }

##### Service layer classes
The RequestApiModel is a sample class that binds the model to the Request library. The model does not necessarily have to be bound to an API, you can create a `LocalStorageModel<IModel>` class, for example, that retrieves and puts data in
local storage instead. The `otherCustomMethod()` is to show that it is possible to extend this class with specific functionality.

    class UserModelApi extends RequestApiModel<UserModel>{
      static getBaseUrl(){
        return "http://localhost:3010//api/users";
      }
    
      public otherCustomMethod() : void {}
    
      constructor(){
        //This is required because generic information is removed at compile time.
        super(UserModel); 
      }
    }

Once the above has been implemented, you can use the model as follows:

##### Sample model use:
    //Create empty instance.
    var emptyUser = new UserModel();
    emptyUser.id = 10;
    
    //Get index from field marked dynamically from marked annotation.
    console.log(emptyUser.getIndex());

You can then perform operations at an entity level, or at an entity list level, and this will be handled by your service layer:

##### Sample service use: GET / PUT
    APIService.init();
    var userListSvc = APIService.UserListApiService;
    
    //Get user asynchronously
    var userFromWebService = userListSvc.getItem('10').then(function(user){
      //Set model value
      user.model.name = "David"; //User type is accessible via generics

	  //Save -> Make PUT request directly from type returned by service.	
      user.save(); 
    });
    
Thanks to generics, you have access to the typed UserModelApi and can access any extended methods (otherCustomMethod) at any point:
 
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

##### Sample singleton service implementation:
    /** Just an example, we need to work on this. There are many workarounds here because of generic type erasure: We cannot instantiate an instance of a type in the class without passing it directly as type info is erased in compile time. */
    
    class APIService {
      //UserModelApi is optional, but passing it here means we can extend it and do stuff like call otherCustomMethod without doing any casting.
      
    private static _UserListApiService : RequestApiModelList<UserModel, UserModelApi>  = null;
	      static get UserListApiService() : RequestApiModelList<UserModel, UserModelApi> {
        return APIService._UserListApiService;
	 }
    
      public static init(){
        APIService._UserListApiService = new RequestApiModelList<UserModel, UserModelApi>(UserModel,  UserModelApi, UserModelApi.getBaseUrl()) 

      }
	}

Passing (UserModel, UserModelApi) should not be necessary. However passing the type in constructor [seems to be the best workaround](http://stackoverflow.com/questions/17382143/how-to-create-a-new-object-from-type-parameter-in-generic-class-in-typescript) in typescript.
