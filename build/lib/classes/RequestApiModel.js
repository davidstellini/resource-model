"use strict";
var requestPromise = require("request-promise");
var RequestApiModel = (function () {
    function RequestApiModel() {
    }
    RequestApiModel.prototype.makePromiseReq = function (type) {
        var options = {
            method: type,
            uri: this.baseUrl,
            body: this,
            json: true
        };
        return requestPromise(options).promise();
    };
    RequestApiModel.prototype.save = function () {
        return this.makePromiseReq('POST');
    };
    RequestApiModel.prototype.delete = function () {
        return this.makePromiseReq('DELETE');
    };
    ;
    return RequestApiModel;
}());
exports.RequestApiModel = RequestApiModel;
//# sourceMappingURL=RequestApiModel.js.map