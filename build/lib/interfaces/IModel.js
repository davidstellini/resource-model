"use strict";
var IModel = (function () {
    function IModel() {
    }
    IModel.prototype.getIndex = function () {
        if (this['indexKey'] === undefined) {
            return null;
        }
        return this[this['indexKey']];
    };
    return IModel;
}());
exports.IModel = IModel;
function indexKey(target, name) {
    target.indexKey = name;
}
exports.indexKey = indexKey;
//# sourceMappingURL=IModel.js.map