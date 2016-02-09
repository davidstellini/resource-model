"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Resource_1 = require("../lib/classes/Resource");
var IModel_1 = require("../lib/interfaces/IModel");
var UserModel = (function (_super) {
    __extends(UserModel, _super);
    function UserModel() {
        _super.apply(this, arguments);
        this.name = "defaultName";
    }
    return UserModel;
}(IModel_1.IModel));
var UserResource = (function (_super) {
    __extends(UserResource, _super);
    function UserResource() {
        _super.call(this, UserModel);
    }
    UserResource.prototype.getUrl = function () {
        return "/user";
    };
    return UserResource;
}(Resource_1.Resource));
exports.UserResource = UserResource;
var userResourceService = new UserResource();
var user = userResourceService.getEmpty();
console.log(user.name);
//# sourceMappingURL=example.js.map