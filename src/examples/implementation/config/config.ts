
import {UserDataRepository} from "../data/UserDataRepository";
import {UserDataRepositoryImpl} from "../data/UserDataRepositoryImpl";
import {AddressDataRepository} from "../data/AddressDataRepository";
import {AddressDataRepositoryImpl} from "../data/AddressDataRepositoryImpl";
import {UserService} from "../service/UserService";

import {Inject, TypeBinding, Kernel, TypeBindingScopeEnum} from "inversify";

export class Config {
  public static BASEURL : string = "http://localhost:8091";
}

export class Services {
    public static userService  : UserService;

}



var kernel = new Kernel();
kernel.bind(new TypeBinding<UserDataRepository>("UserDataRepository", UserDataRepositoryImpl, TypeBindingScopeEnum.Singleton));
kernel.bind(new TypeBinding<AddressDataRepository>("AddressDataRepository", AddressDataRepositoryImpl, TypeBindingScopeEnum.Singleton));
kernel.bind(new TypeBinding<UserService>("UserService", UserService, TypeBindingScopeEnum.Singleton));
Services.userService = kernel.resolve<UserService>("UserService");
