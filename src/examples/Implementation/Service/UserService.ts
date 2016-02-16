import {IDataListAsync} from "../../../lib/interfaces/Data/IDataListAsync";
import {IDataAsync} from "../../../lib/interfaces/Data/IDataAsync";
import {UserModel} from "../Model/UserModel";
import {List} from "../../../lib/classes/Helper/List";
import coll = require("es6-collections");

export class UserService<UserDataDL extends IDataAsync<UserModel>> {

  //addressDataLayer : IData;

constructor(public userListDl :  IDataListAsync<UserModel, UserDataDL>) {}

getUsers() : Promise<List<UserDataDL>>{

  return this.userListDl.getAllItems();
}


getItem(emptyModelWithID : UserModel) : Promise<UserDataDL> {
  return this.userListDl.getItem(emptyModelWithID);
}

exists(emptyModelWithID : UserModel) : Promise<boolean> {
    return this.userListDl.exists(emptyModelWithID);
}

getAllItems() : Promise<List<UserDataDL>> {
    return this.userListDl.getAllItems();
}

getRange(emptyModelWithIDList : List<UserModel>) : Promise<List<UserDataDL>> {
    return this.userListDl.getRange(emptyModelWithIDList);
}

count() : number {
    return this.userListDl.count();
}

addItem(modelItem : UserModel) : Promise<UserDataDL> {
  return this.addItem(modelItem);
}

removeItem(emptyModelWithID : UserModel) : Promise<UserDataDL> {
  return this.removeItem(emptyModelWithID);
}



}
