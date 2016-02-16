import {Config} from "../Config/config";
import {AddressModel} from "../Model/AddressModel";
import {ApiRepository} from "../../../lib/classes/Helper/ApiRepository";
import {List} from "../../../lib/classes/Helper/List";

export class AddressDataRepository extends ApiRepository<AddressModel>
{
  getUrl() : string{
    return Config.BASEURL + '/addresses';
  }

  modelFactory() : AddressModel {
    return new AddressModel();
  }

//How will this work by auto-generation??!
  getByUser(userId : number) : Promise<List<AddressModel>> {
      return this.buildRequestAndParseAsModelList(
        this.getUrl() + '?byUser=' + userId,
        'GET',
        this.genericManyItemParser,
        null
      );
  }
}
