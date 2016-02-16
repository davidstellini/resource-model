import {IDataRepositoryAsync} from "../../../lib/interfaces/Data/IDataListAsync";
import {IDataAsync} from "../../../lib/interfaces/Data/IDataAsync";
import {UserModel} from "../Model/UserModel";
import {List} from "../../../lib/classes/Helper/List";
import coll = require("es6-collections");

export class UserServiceAsync {

  //addressDataLayer : IData;

constructor(public userListDl :  IDataRepositoryAsync<UserModel>) {}

getUsers() : Promise<List<UserModel>>{

  return this.userListDl.getAllItems();
}


getItem(emptyModelWithID : UserModel) : Promise<UserModel> {
  return this.userListDl.getItem(emptyModelWithID);
}

exists(emptyModelWithID : UserModel) : Promise<boolean> {
    return this.userListDl.exists(emptyModelWithID);
}

getAllItems() : Promise<List<UserModel>> {
    return this.userListDl.getAllItems();
}

getRange(emptyModelWithIDList : List<UserModel>) : Promise<List<UserModel>> {
    return this.userListDl.getRange(emptyModelWithIDList);
}

count() : number {
    return this.userListDl.count();
}

addItem(modelItem : UserModel) : Promise<UserModel> {
  return this.addItem(modelItem);
}

removeItem(emptyModelWithID : UserModel) : Promise<UserModel> {
  return this.removeItem(emptyModelWithID);
}

saveItem(modelItem : UserModel) : Promise<UserModel> {
  return this.userListDl.saveItem(modelItem);
}


}
