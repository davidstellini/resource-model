"use strict";
var Resource = (function () {
    function Resource(typeScriptObjWithCtor) {
        this.instantiatibleModel = typeScriptObjWithCtor;
    }
    Resource.prototype.get = function () {
        return new this.instantiatibleModel();
    };
    Resource.prototype.put = function () {
        return this.api.save(this.getBaseUrl(), this.toJSON(this.model));
    };
    Resource.prototype.delete = function () {
    };
    return Resource;
}());
exports.Resource = Resource;
function BaseUrl(url) {
    return function (Target) {
        Target.prototype.getBaseUrl = function () {
            return url;
        };
        return Target;
    };
}
exports.BaseUrl = BaseUrl;
//# sourceMappingURL=Resource.js.map