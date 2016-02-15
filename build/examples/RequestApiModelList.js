"use strict";
var requestPromise = require("request-promise");
var RequestApiModelList = (function () {
    function RequestApiModelList(instantiatibleModel, instantiatibleRequestApiModel, baseUrl) {
        this.instantiatibleModel = instantiatibleModel;
        this.instantiatibleRequestApiModel = instantiatibleRequestApiModel;
        this.baseUrl = baseUrl;
    }
    RequestApiModelList.prototype.makePromiseReq = function (type, body, uri) {
        if (uri === void 0) { uri = null; }
        if (uri === null) {
            uri = this.baseUrl;
        }
        var options = {
            method: type,
            uri: uri,
            body: body,
            json: true
        };
        return requestPromise(options).promise();
    };
    RequestApiModelList.prototype.addItem = function (baseModel) {
        return this.makePromiseReq('POST', baseModel);
    };
    RequestApiModelList.prototype.removeItem = function (modelItem) {
        return this.makePromiseReq('DELETE', modelItem);
    };
    ;
    RequestApiModelList.prototype.getAll = function () {
        var _this = this;
        var respList = new Array();
        var options = {
            method: 'GET', uri: this.baseUrl + "/"
        };
        var getAllPromise = new Promise(function (resolve, reject) {
            requestPromise(options).promise().then(function (response) {
                response.payload.forEach(function (modelListItem) {
                    var newApiModel = new _this.instantiatibleModel();
                    var newReqApiModel = new _this.instantiatibleRequestApiModel();
                    var modelFromPayload = newApiModel.parse(modelListItem);
                    newReqApiModel.model = modelFromPayload;
                    respList.push(newReqApiModel);
                });
                resolve(respList);
            });
        });
        return getAllPromise;
    };
    RequestApiModelList.prototype.getItem = function (arg) {
        var _this = this;
        var getRequestUri = this.baseUrl + "/";
        if (typeof arg === typeof this.instantiatibleModel) {
            getRequestUri += arg.getIndex();
        }
        else {
            getRequestUri += arg;
        }
        var options = {
            method: 'GET', uri: getRequestUri,
        };
        var getReqPromise = requestPromise(options).promise();
        return new Promise(function (resolve, reject) {
            getReqPromise.then(function (response) {
                var newApiModel = new _this.instantiatibleModel();
                var newReqApiModel = new _this.instantiatibleRequestApiModel();
                var modelFromPayload = newApiModel.parse(response.payload[0]);
                newReqApiModel.model = modelFromPayload;
                resolve(newReqApiModel);
            });
        });
    };
    return RequestApiModelList;
}());
exports.RequestApiModelList = RequestApiModelList;
//# sourceMappingURL=RequestApiModelList.js.map