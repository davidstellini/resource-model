import {UserModel} from "../model/UserModel";
import {List} from "../../../lib/classes/helper/List";
import {AddressDataRepository} from "../data/AddressDataRepository";
import {UserDataRepository} from "../data/UserDataRepository";

import {Inject, TypeBinding, Kernel, TypeBindingScopeEnum} from "inversify";


@Inject("UserDataRepository", "AddressDataRepository")
export class UserService {


 public userDataLayer : UserDataRepository;
 public addressDataLayer : AddressDataRepository;

  constructor(  userDataLayer : UserDataRepository,
                addressDataLayer : AddressDataRepository
            ) {
              this.userDataLayer = userDataLayer;
              this.addressDataLayer = addressDataLayer;
            }

  //Gets a user list with empty address
  getUsers() : Promise<List<UserModel>>{
    return this.userDataLayer.getAllItems();
  }

  //Gets a user, filled up with addresses.
  getCompleteUser(modelID : string) : Promise<UserModel> {
    var addressPromise = this.userDataLayer.getAddresses(modelID);
    var userPromise = this.userDataLayer.getItem(modelID);

    return Promise.all([userPromise, addressPromise]).then(resolve => {
      var user = resolve[0];
      var address = resolve[1];
      user.addresses = address;
      return user;
    });

  }

  exists(modelID : string) : Promise<boolean> {
      return this.userDataLayer.exists(modelID);
  }

  getAllItems() : Promise<List<UserModel>> {
      return this.userDataLayer.getAllItems();
  }

  getRange(modelIDList : List<string>) : Promise<List<UserModel>> {
      return this.userDataLayer.getRange(modelIDList);
  }

  count() : number {
      return this.userDataLayer.count();
  }

  addItem(modelItem : UserModel) : Promise<UserModel> {
    return this.addItem(modelItem);
  }

  removeItem(modelID : string) : Promise<UserModel> {
    return this.removeItem(modelID);
  }

  saveItem(modelItem : UserModel) : Promise<UserModel> {
    return this.userDataLayer.saveItem(modelItem);
  }
}
