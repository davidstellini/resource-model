import {Config} from "../config/config";
import {UserModel} from "../model/UserModel";
import {ApiRepository} from "../../../lib/classes/helper/ApiRepository";
import {List} from "../../../lib/classes/helper/List";
import {AddressModel} from "../model/AddressModel";
import {ModelFactory} from "../../../lib/interfaces/model/modelFactory";
import {UserDataRepository} from "./UserDataRepository";
import {DefaultApiParser} from "../../../lib/classes/helper/DefaultApiParser";

export class UserDataRepositoryImpl extends ApiRepository<UserModel> implements UserDataRepository
{
  factory  = new UserModel();

  getUrl() : string{
    return Config.BASEURL + '/users';
  }


  //How will this work by auto-generation??!
    getAddresses(userId : string) : Promise<List<AddressModel>> {
        return this.buildRequestAndParseAsTList<AddressModel>(
          Config.BASEURL + '/user/' + userId + '/addresses',
          'GET',
          new DefaultApiParser<AddressModel>(new AddressModel()),
          null
        )
    }
}
