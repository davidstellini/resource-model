var Resource = (function () {
    function Resource(api, model) {
        this.api = api;
        this.model = model;
    }
    Resource.prototype.getBaseUrl = function () {
        return null;
    };
    Resource.prototype.toInstance = function (obj, json) {
        for (var propName in json) {
            obj[propName] = json[propName];
        }
        return obj;
    };
    Resource.prototype.toJSON = function (obj) {
        var jsonObj = {};
        for (var propName in obj) {
            jsonObj[propName] = obj[propName];
        }
        return jsonObj;
    };
    Resource.prototype.save = function () {
        return this.api.save(this.getBaseUrl(), this.toJSON(this.model));
    };
    Resource.prototype.get = function () {
        var _this = this;
        return this.api.get(this.getBaseUrl()).then(function (data) {
            return _this.toInstance(_this.model, data);
        });
    };
    Resource.prototype.delete = function () {
        var _this = this;
        return this.api.delete(this.getBaseUrl())
            .then(function () { return _this.model; });
    };
    return Resource;
})();
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