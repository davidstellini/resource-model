import {Config} from "../Config/config";
import {AddressModel} from "../Model/AddressModel";
import {ApiRepository} from "../../../lib/classes/Helper/ApiRepository";

export class AddressDataRepository extends ApiRepository<AddressModel>
{
  getUrl() : string{
    return Config.BASEURL + '/addresses';
  }

  modelFactory() : AddressModel {
    return new AddressModel();
  }
}
