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

##### Model and Resource
    //POTO
    class UserModel implements IModel{
      id: number;
      name: string;
      surname: string;
      addresses: Array<AddressModel>;
    }
    //API RESOURCE REFERENCE
    class UserResource extends Resource{
      getUrl() : string {
        return "/user";
      }
    }

##### Data Layer

    import {Promise} from "es6-promise";
    class MyAPI implements IAPI{
        baseURL : string = "/api/v1";
        save(url: string, model: any) : Promise<any>{
            console.log("Saving: "+url, model);
            return null;
        }
        get(url: string) : Promise<any>{
            console.log("Getting", url);
            return null;
        }
        delete(url: string) : Promise<any>{
            console.log("Deleting", url);
            return null;
        }
    }

##### Case Scenario
    //An application should have only one instance of DataLayer
    var API = new MyAPI();
    //Setup a new resource for user, assigning our API datalayer and empty user model
    var userResource = new UserResource(API, UserModel);

    //calling our API via resource

    userResource.get().then(function(model){ //GET /api/v1/user
        console.log(model); //{name: "David", surname: "Mifsud"}
        console.log(userResource.model); //{name: "David", surname: "Mifsud"}
    };
