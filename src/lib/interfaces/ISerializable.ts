
//IMPORTANT : All properties of serializable class must be set to null/default.
export interface ISerializable {
  //Given that new T() is not possible due to type erasure, we cannot implement
  // factory method here and must read into an existing instance.
  // IE: FromJSON cannot be static.
  FromJson(Object) : void;
  Stringify() : string;
  parse(string : string);
}


export  abstract class Serializable implements ISerializable{
  FromJson(Object) : void{
      Object.forEach((property) => {
        this[property] = Object[property]; //dangerous. Ideally we register the
        // serializable classes on initialization so that we don't set properties
        // in "Object" that don't exist in "this". This also has the advantage of
        // allowing dynamic initialization of the class without knowing the Type
        // ahead of time.

        //Also, recursion for nested properties??
      });
  }

  Stringify() : string{
    return JSON.stringify(this);
  }

  parse<T extends Serializable>(string : string) : T{
    var outputObj : T = JSON.parse(string);
    return outputObj;
  }
}
