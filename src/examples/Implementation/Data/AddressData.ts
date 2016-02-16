import {IDataAsync} from "../../../lib/interfaces/Data/IDataAsync";
import {AddressModel} from "../Model/AddressModel";
import {Config} from "../Config/config";
import * as requestPromise from "request-promise";

export class AddressData implements IDataAsync<AddressModel> {
  model : AddressModel;

  //Typescript: Multiple constructor implementations are not allowed.
  // See: http://stackoverflow.com/questions/12702548/constructor-overload-in-typescript
  constructor();
  constructor(model : AddressModel);
  constructor(model? : AddressModel){
    this.model = model || new AddressModel();
  }

  static read(payload : string) : AddressData{
    let parsedObj : AddressData = new AddressData();
    try {
      parsedObj = new AddressData((new AddressModel()).parse<AddressModel>(payload));
      return parsedObj;
    } catch (ex) {
      return null;
    };
  }

  save() : Promise<AddressModel> {
    return this.makePromiseReq('POST');
  }

  delete() : Promise<AddressModel>{
    return this.makePromiseReq('DELETE');
  };


  private makePromiseReq(type : string) : Promise<AddressModel>{
    var options = {
      method : type,
      uri : Config.BASEURL + '/Addresss',
      body : this.model,
      json : true
    }

    return new Promise<AddressModel>( (resolve, reject) =>{
        requestPromise(options).promise().then((response) =>
        {
          let parsedAddress : AddressModel = null;

          try {
            parsedAddress = (new AddressModel).parse<AddressModel>(response);
            resolve(parsedAddress);
          } catch (ex) {
            resolve(parsedAddress);
          };
      });
    });
  }


}
