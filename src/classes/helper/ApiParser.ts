import {Model} from "../../interfaces/model/Model";
import {ModelFactory} from "../../interfaces/model/modelFactory";
import {List} from "./List";

export abstract class ApiItemParser<T extends Model> {
  factory : ModelFactory<T>;

  Parse(response : string ) : T{
    return (this.factory.create()).parse<T>(response);
  }

  ParseList(response : string) : List<T>{
    var items : List<T>  = new List<T>();
    var resp = JSON.parse(response);
    resp.forEach(modelListItem =>
    {
      var model = this.factory.create();
      model.FromJson(modelListItem);

      items.add(model);
    });

    return items;
  }
}
