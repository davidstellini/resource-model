import {IAPI} from "../interfaces/IAPI";
import {Promise} from "es6-promise";

export class API implements IAPI{

  baseURL : string = "/your-custom-api-url";

  //This is where we can use something like Restangular

  save(url: string, model: any) : Promise<any>{
    console.log("Saving: "+url);

    return new Promise((resolve, reject) => {

      if (true) {
        resolve(model);
      }
      // else {
      //   reject(Error("It broke"));
      // }
    });
  }

  get(url: string) : Promise<any>{
    console.log("Getting", url);
    return new Promise((resolve, reject) => {

      if (true) {
        resolve({
          id: new Date().getTime()
        });
      }
      // else {
      //   reject(Error("It broke"));
      // }
    });
  }

  delete(url: string) : Promise<any>{
    console.log("Deleting", url);
    return Promise.resolve("Resource <"+url+"> deleted successfuly");
  }

}
