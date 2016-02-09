import {API} from "../lib/classes/API";
import {Resource,BaseUrl} from "../lib/classes/Resource";
import {IModel} from "../lib/interfaces/IModel";


class UserModel implements IModel{

  id: number;

  name: string;

  surname: string;

  // addresses: Array<AddressModel>;
}



// @BaseUrl("/user")
export class UserResource extends Resource<UserModel>{
  // model: UserModel;
  getUrl() : string {
    return "/user";
  }
}

var user = new UserResource(new API(), UserModel);

user.get().then(data => {data
  console.log(data);
});
