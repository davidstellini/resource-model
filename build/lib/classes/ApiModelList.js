"use strict";
var requestPromise = require("request-promise");
var RequestApiModelList = (function () {
    function RequestApiModelList(instantiatibleModel, baseUrl) {
        this.instantiatibleModel = instantiatibleModel;
        this.baseUrl = baseUrl;
    }
    RequestApiModelList.prototype.makePromiseReq = function (type, modelItem) {
        var options = {
            method: type,
            uri: this.baseUrl,
            body: modelItem,
            json: true
        };
        return requestPromise(options).promise();
    };
    RequestApiModelList.prototype.addItem = function (modelItem) {
        return this.makePromiseReq('POST', modelItem);
    };
    RequestApiModelList.prototype.removeItem = function (modelItem) {
        return this.makePromiseReq('DELETE', modelItem);
    };
    ;
    RequestApiModelList.prototype.getItem = function (modelItem) {
        return this.makePromiseReq('GET', modelItem).then(function (payload) {
            var modelFromPayload = new this.instantiatibleModel();
            for (var propName in payload) {
                modelFromPayload[propName] = payload[propName];
            }
            return modelFromPayload;
        });
    };
    ;
    return RequestApiModelList;
}());
exports.RequestApiModelList = RequestApiModelList;
//# sourceMappingURL=ApiModelList.js.map