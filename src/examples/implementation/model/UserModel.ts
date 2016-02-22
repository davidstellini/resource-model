import {Model, indexKey} from "../../../lib/interfaces/model/Model";
import {List} from "../../../lib/classes/helper/List";
import {AddressModel} from "./AddressModel";

export class UserModel extends Model   {
  @indexKey
  id: string;

  //TODO: @optional, @readonly, @otherValidationAnnotations (ask wallace).
  name: string="defaultName";
  surname: string;

  //TODO: @complex. Also need to see about recursive serialization
  addresses: List<AddressModel>;

  create() : UserModel{
    return new UserModel();
  }
}
