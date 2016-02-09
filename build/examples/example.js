var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var API_1 = require("../lib/classes/API");
var Resource_1 = require("../lib/classes/Resource");
var UserModel = (function () {
    function UserModel() {
    }
    return UserModel;
})();
var UserResource = (function (_super) {
    __extends(UserResource, _super);
    function UserResource() {
        _super.apply(this, arguments);
    }
    UserResource.prototype.getUrl = function () {
        return "/user";
    };
    return UserResource;
})(Resource_1.Resource);
exports.UserResource = UserResource;
var user = new UserResource(new API_1.API(), UserModel);
user.get().then(function (data) {
    data;
    console.log(data);
});
//# sourceMappingURL=example.js.map