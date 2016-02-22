import {Config} from "../config/config";
import {AddressModel} from "../model/AddressModel";
import {ApiRepository} from "../../../lib/classes/helper/ApiRepository";
import {List} from "../../../lib/classes/helper/List";
import {AddressDataRepository} from "./AddressDataRepository";
import {ModelFactory} from "../../../lib/interfaces/model/modelFactory";

export class AddressDataRepositoryImpl extends ApiRepository<AddressModel> implements AddressDataRepository
{
  getUrl() : string{
    return Config.BASEURL + '/addresses';
  }
}
