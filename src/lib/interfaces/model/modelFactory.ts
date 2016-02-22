import {Model} from "./Model";
export interface ModelFactory<T extends Model> {
  /// Return an instance of the model. Type erasure limitation, new T() not possible.
  create() : T;
}
