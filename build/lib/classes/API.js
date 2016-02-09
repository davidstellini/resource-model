var es6_promise_1 = require("es6-promise");
var API = (function () {
    function API() {
        this.baseURL = "/your-custom-api-url";
    }
    API.prototype.save = function (url, model) {
        console.log("Saving: " + url);
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (true) {
                resolve(model);
            }
        });
    };
    API.prototype.get = function (url) {
        console.log("Getting", url);
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (true) {
                resolve({
                    id: new Date().getTime()
                });
            }
        });
    };
    API.prototype.delete = function (url) {
        console.log("Deleting", url);
        return es6_promise_1.Promise.resolve("Resource <" + url + "> deleted successfuly");
    };
    return API;
})();
exports.API = API;

//# sourceMappingURL=API.js.map
