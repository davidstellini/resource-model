import {API} from "../lib/classes/API";
import {Resource,BaseUrl} from "../lib/classes/Resource";
import {IModel} from "../lib/interfaces/IModel";


class UserModel implements IModel{

  id: number;

  name: string;

  surname: string;

  //addresses: Array<AddressModel>;

}

@BaseUrl("/user")
export class UserResource extends Resource{
  model: UserModel;
}

var user = new UserResource(new API(), new UserModel());

user.model.id = 42;

user.get().then(model => {
  console.log(model);
});
