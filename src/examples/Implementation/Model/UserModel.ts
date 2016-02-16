import {IModel, indexKey} from "../../../lib/interfaces/Model/IModel";
import {List} from "../../../lib/classes/Helper/List";
import {AddressModel} from "./AddressModel";

export class UserModel extends IModel  {
  @indexKey
  id: number;

  //TODO: @optional, @readonly, @otherValidationAnnotations (ask wallace).
  name: string="defaultName";
  surname: string;

  //TODO: @complex. Also need to see about recursive serialization
  addresses: List<AddressModel>;
}
