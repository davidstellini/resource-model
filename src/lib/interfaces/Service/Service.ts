import {IDataListAsync} from "../Data/IDataListAsync";
import {IModel} from "../Model/IModel";
import {IData} from "../Data/IData";
import {List} from "../../classes/Helper/List";

export interface IServiceAsync {

  // dependencyList : List< IDataListAsync<IModel, IData<IModel>>>;
  //
  //   registerDependency <BaseType extends IModel,
  //     DataLayerType extends IDataListAsync<BaseType, IData<BaseType>>>
  //     (dataLayer : IDataListAsync<BaseType, IData<BaseType>>);
}
