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
    UserResource = __decorate([
        Resource_1.BaseUrl("/user"), 
        __metadata('design:paramtypes', [])
    ], UserResource);
    return UserResource;
})(Resource_1.Resource);
exports.UserResource = UserResource;
var user = new UserResource(new API_1.API(), new UserModel());
user.model.id = 42;
user.get().then(function (model) {
    console.log(model);
});
//# sourceMappingURL=example.js.map