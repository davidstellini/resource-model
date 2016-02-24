//import {Model, indexKey, List} from "typescriptMvc";

import Model from 'lib';


  export class UserModel extends tm.Model   {
    @tm.indexKey
    id: string;

    //TODO: @optional, @readonly, @otherValidationAnnotations (ask wallace).
    name: string="defaultName";
    surname: string;

    //TODO: @complex. Also need to see about recursive serialization
    addresses: tm.List<AddressModel>;

    create() : UserModel{
      return new UserModel();
    }
  }
