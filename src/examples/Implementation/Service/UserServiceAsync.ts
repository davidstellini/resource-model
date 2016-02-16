import {UserModel} from "../Model/UserModel";
import {List} from "../../../lib/classes/Helper/List";
import {UserDataRepository} from "../Data/UserDataRepository";
import {AddressDataRepository} from "../Data/AddressDataRepository";

export class UserServiceAsync {

  constructor(public userDataLayer :  UserDataRepository,
              public addressDataLayer : AddressDataRepository) {}

  //Gets a user list with empty address
  getUsers() : Promise<List<UserModel>>{
    return this.userDataLayer.getAllItems();
  }

  //Gets a user, filled up with addresses.
  getUser(emptyModelWithID : UserModel) : Promise<UserModel> {
     this.userDataLayer.getItem(emptyModelWithID).then(user => {
       //addressDataLayer.getItem()
     });

     return null;
  }

  exists(emptyModelWithID : UserModel) : Promise<boolean> {
      return this.userDataLayer.exists(emptyModelWithID);
  }

  getAllItems() : Promise<List<UserModel>> {
      return this.userDataLayer.getAllItems();
  }

  getRange(emptyModelWithIDList : List<UserModel>) : Promise<List<UserModel>> {
      return this.userDataLayer.getRange(emptyModelWithIDList);
  }

  count() : number {
      return this.userDataLayer.count();
  }

  addItem(modelItem : UserModel) : Promise<UserModel> {
    return this.addItem(modelItem);
  }

  removeItem(emptyModelWithID : UserModel) : Promise<UserModel> {
    return this.removeItem(emptyModelWithID);
  }

  saveItem(modelItem : UserModel) : Promise<UserModel> {
    return this.userDataLayer.saveItem(modelItem);
  }
}
