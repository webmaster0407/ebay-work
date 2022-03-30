"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://developer.ebay.com/devzone/shopping/docs/callref/index.html
var calls;
(function (calls) {
    calls[calls["FindProducts"] = 0] = "FindProducts";
    calls[calls["GetCategoryInfo"] = 1] = "GetCategoryInfo";
    calls[calls["GeteBayTime"] = 2] = "GeteBayTime";
    calls[calls["GetItemStatus"] = 3] = "GetItemStatus";
    calls[calls["GetMultipleItems"] = 4] = "GetMultipleItems";
    calls[calls["GetShippingCosts"] = 5] = "GetShippingCosts";
    calls[calls["GetSingleItem"] = 6] = "GetSingleItem";
    calls[calls["GetUserProfile"] = 7] = "GetUserProfile";
})(calls || (calls = {}));
exports.default = calls;
//# sourceMappingURL=index.js.map