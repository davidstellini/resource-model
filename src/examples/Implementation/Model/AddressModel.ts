import {IModel, indexKey} from "../../../lib/interfaces/Model/IModel";

export class AddressModel extends IModel  {
  @indexKey
  id: number;
  AddressLine1: string;
  AddressLine2: string;
  Country: string;
}
