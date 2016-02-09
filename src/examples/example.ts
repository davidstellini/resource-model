import {API} from "../lib/classes/API";
import {Resource,BaseUrl} from "../lib/classes/Resource";
import {IModel} from "../lib/interfaces/IModel";


class UserModel extends IModel {

  id: number;

  name: string="defaultName";

  surname: string;

  // addresses: Array<AddressModel>;
}


export class UserResource extends Resource<UserModel>{
  constructor(){
    super(UserModel);
  }

  getUrl() : string {
    return "/user";
  }
}

var userResourceService = new UserResource();
var user = userResourceService.getEmpty();
console.log(user.name);
