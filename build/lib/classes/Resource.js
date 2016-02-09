"use strict";
var Resource = (function () {
    function Resource(typeScriptObjWithCtor) {
        this.instantiatibleModel = typeScriptObjWithCtor;
    }
    Resource.prototype.getEmpty = function () {
        return new this.instantiatibleModel();
    };
    return Resource;
}());
exports.Resource = Resource;
function BaseUrl(url) {
    return function (Target) {
        Target.prototype.getBaseUrl = function () {
            return this.api.baseURL + url;
        };
        return Target;
    };
}
exports.BaseUrl = BaseUrl;
//# sourceMappingURL=Resource.js.map