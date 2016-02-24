//IMPORTANT : All properties of serializable class must be set to null/default.
export  abstract class Serializable {
  FromJson(obj : any) : void{
      for (let property in obj) {
        this[property] = obj[property]; //dangerous. Ideally we register the
        // serializable classes on initialization so that we don't set properties
        // in "Object" that don't exist in "this". This also has the advantage of
        // allowing dynamic initialization of the class without knowing the Type
        // ahead of time.

        //Also, recursion for nested properties??
      };
  }

  Stringify() : string{
    return JSON.stringify(this);
  }

  parse<T extends Serializable>(string : string) : T{
    var outputObj : T = JSON.parse(string);
    return outputObj;
  }
}
