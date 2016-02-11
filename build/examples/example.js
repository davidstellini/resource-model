"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var IModel_1 = require("../lib/interfaces/IModel");
var RequestApiModelList_1 = require("../examples/RequestApiModelList");
var RequestApiModel_1 = require("../examples/RequestApiModel");
var UserModel = (function (_super) {
    __extends(UserModel, _super);
    function UserModel() {
        _super.apply(this, arguments);
        this.name = "defaultName";
    }
    __decorate([
        IModel_1.indexKey, 
        __metadata('design:type', Number)
    ], UserModel.prototype, "id", void 0);
    return UserModel;
}(IModel_1.IModel));
var APIService = (function () {
    function APIService() {
    }
    Object.defineProperty(APIService.prototype, "UserListApiService", {
        get: function () {
            return APIService._UserListApiService;
        },
        enumerable: true,
        configurable: true
    });
    APIService.init = function () {
        var req = new RequestApiModel_1.RequestApiModel(UserModel);
        APIService._UserListApiService = new RequestApiModelList_1.RequestApiModelList(req, "/api/users");
    };
    APIService._UserListApiService = null;
    return APIService;
}());
APIService.init();
var svc = APIService.UserListApiService;
var user = new UserModel();
user.id = '10';
svc.getItem(user);
//# sourceMappingURL=example.js.map