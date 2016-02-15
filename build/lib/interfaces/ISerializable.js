"use strict";
var Serializable = (function () {
    function Serializable() {
    }
    Serializable.prototype.FromJson = function (Object) {
        var _this = this;
        Object.forEach(function (property) {
            _this[property] = Object[property];
        });
    };
    Serializable.prototype.Stringify = function () {
        return JSON.stringify(this);
    };
    Serializable.prototype.parse = function (string) {
        var outputObj = JSON.parse(string);
        return outputObj;
    };
    return Serializable;
}());
exports.Serializable = Serializable;
//# sourceMappingURL=ISerializable.js.map