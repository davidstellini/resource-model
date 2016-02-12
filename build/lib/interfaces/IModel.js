"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ISerializable_1 = require("./ISerializable");
var IModel = (function (_super) {
    __extends(IModel, _super);
    function IModel() {
        _super.apply(this, arguments);
    }
    IModel.prototype.getIndex = function () {
        if (this['indexKey'] === undefined) {
            return null;
        }
        return this[this['indexKey']];
    };
    return IModel;
}(ISerializable_1.Serializable));
exports.IModel = IModel;
function indexKey(target, name) {
    target.indexKey = name;
}
exports.indexKey = indexKey;
//# sourceMappingURL=IModel.js.map