import {DataRepository} from "../../../lib/interfaces/data/DataRepository";
import {UserModel} from "../model/UserModel";
import {List} from "../../../lib/classes/helper/List";
import {AddressModel} from "../model/AddressModel";
import {ModelFactory} from "../../../lib/interfaces/model/modelFactory";

export interface UserDataRepository extends DataRepository<UserModel> {
    getAddresses(userId : string) : Promise<List<AddressModel>>;

}
