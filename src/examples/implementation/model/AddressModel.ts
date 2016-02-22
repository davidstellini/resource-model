import {Model, indexKey} from "../../../lib/interfaces/model/Model";

export class AddressModel extends Model  {
  @indexKey
  id: string;
  AddressLine1: string;
  AddressLine2: string;
  Country: string;

  create() : AddressModel {
    return new AddressModel();
  }
}
