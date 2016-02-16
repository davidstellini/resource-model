import {Config} from "../Config/config";
import {UserModel} from "../Model/UserModel";
import {ApiRepository} from "../../../lib/classes/Helper/ApiRepository";

export class UserDataRepository extends ApiRepository<UserModel>
{
  getUrl() : string{
    return Config.BASEURL + '/users';
  }

  modelFactory() : UserModel {
    return new UserModel();
  }
}
