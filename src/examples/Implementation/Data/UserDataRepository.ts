import {Config} from "../Config/config";
import {UserModel} from "../Model/UserModel";
import {ApiRepository} from "../../../lib/classes/Helper/ApiRepository";
import {List} from "../../../lib/classes/Helper/List";
import {AddressModel} from "../Model/AddressModel";
export class UserDataRepository extends ApiRepository<UserModel>
{
  getUrl() : string{
    return Config.BASEURL + '/users';
  }

  modelFactory() : UserModel {
    return new UserModel();
  }

  //How will this work by auto-generation??!
    getAddresses(userId : number) : Promise<List<AddressModel>> {
        // return this.buildRequestAndParseAsModelList(
        //   '/user/{userID}/address'
        //   'GET',
        //   this.genericManyItemParser,
        //   null
        // );


        return null;
    }
}
