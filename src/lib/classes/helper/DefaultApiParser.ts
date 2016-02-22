import {Model} from "../../../lib/interfaces/model/Model";
import {List} from "../../../lib/classes/helper/List";
import {Serializable} from "../../interfaces/model/Serializable";

import * as requestPromise from "request-promise";
//APIModelList using Request Library
import {DataRepository} from "../../../lib/interfaces/data/DataRepository";
import request = require('request');
import {ModelFactory} from "../../interfaces/model/modelFactory";
import {ApiItemParser} from "./ApiParser";

export class DefaultApiParser<T extends Model> extends ApiItemParser<T>{
  constructor(public factory : ModelFactory<T>) {
    super();
  }
}
