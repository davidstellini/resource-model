import {ApiRepository} from "tsmvc";
import {AddressModel} from "../model/AddressModel";

export class AddressDataRepositoryImpl extends ApiRepository<AddressModel> implements AddressDataRepository
{
  getUrl() : string{
    return Config.BASEURL + '/addresses';
  }
}
